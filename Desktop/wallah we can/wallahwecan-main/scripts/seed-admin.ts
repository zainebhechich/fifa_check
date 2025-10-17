/**
 * Idempotent script to ensure an admin user exists in Supabase Auth and profiles.
 * Uses service role key on server. Do NOT run in the browser.
 *
 * Env required:
 * - NEXT_PUBLIC_SUPABASE_URL
 * - SUPABASE_SERVICE_ROLE_KEY
 *
 * Admin account:
 *   email: admin@wallahwecan.org
 *   password: WALLAHWECAN
 */
import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!url || !serviceKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(url, serviceKey)

async function ensureAdmin() {
  // 1) Find user by email
  const email = 'admin@wallahwecan.org'
  const password = 'WALLAHWECAN'

  // Try to look up existing user
  const { data: list, error: listErr } = await supabase.auth.admin.listUsers({ page: 1, perPage: 1000 })
  if (listErr) throw listErr
  const existing = list?.users?.find((u: any) => u.email?.toLowerCase() === email)

  let userId: string
  if (!existing) {
    // Create user when not exists
    const { data, error } = await supabase.auth.admin.createUser({ email, password, email_confirm: true })
    if (error) throw error
    userId = data.user?.id as string
    console.log('Created admin auth user:', userId)
  } else {
    userId = existing.id
    console.log('Admin auth user exists:', userId)
  }

  // 2) Upsert profile with role: 'admin'
  // Some environments may lack a unique index on user_id. Try insert-then-update fallback.
  let upsertErr: any = null
  {
    const { error } = await supabase.from('profiles').insert({
      user_id: userId,
      role: 'admin',
      nom: 'WE CAN',
      prenom: 'WALLAH',
    })
    if (error && error.code !== '23505') { // 23505 = unique_violation
      upsertErr = error
    }
  }
  if (upsertErr) {
    const { error } = await supabase
      .from('profiles')
      .update({ role: 'admin', nom: 'WE CAN', prenom: 'WALLAH' })
      .eq('user_id', userId)
    if (error) throw error
  }
  console.log('Ensured admin profile with role=admin')
}

ensureAdmin()
  .then(() => { console.log('Admin seed complete'); process.exit(0) })
  .catch((e) => { console.error('Admin seed failed:', e); process.exit(1) })
