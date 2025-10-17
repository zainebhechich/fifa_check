import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase/admin'

const COFFRETS = [
  { name: 'Essence Vitale', price: 179.0, category: 'Coffrets', description: "5 flacons d'huiles essentielles de 10ml chacun" },
  { name: 'La Savonnière Artisanale', price: 82.0, category: 'Coffrets', description: 'Assortiment de 4 savons naturels parfumés' },
  { name: 'Jardin Floral', price: 115.0, category: 'Coffrets', description: '4 bougies parfumées' },
  { name: "L’Or des Fleurs", price: 48.0, category: 'Coffrets', description: "4 pots de miels de 30 g chacun" },
  { name: 'Nature Gourmande', price: 70.0, category: 'Coffrets', description: "2 bouteilles d'huile d'olive 100ml, 4 pots de miel variés de 30g, 1 sachet d'herbes aromatiques" },
  { name: 'Évasion Bio', price: 86.0, category: 'Coffrets', description: "1 pot de miel 30g, 1 sachet d'herbes aromatiques, 2 bouteilles d'hydrolat 100ml, 1 flacon d'huile essentielle 10ml" },
  { name: 'Ambiance Nature', price: 137.0, category: 'Coffrets', description: "2 bouteilles d'hydrolat 100ml, 2 savons naturels, 1 bougie parfumée, 1 flacon d'huile essentielle 10ml" },
  { name: 'Découverte des Senteurs', price: 141.0, category: 'Coffrets', description: "3 flacons d'huiles essentielles, 1 sachet d'herbes aromatiques, 1 bougie parfumée" },
  { name: "L’artisan", price: 92.0, category: 'Coffrets', description: "1 savon, 1 bougie parfumée, 1 sachet d'herbes aromatiques, 1 flacon d'huile essentielle 10ml" },
  { name: 'Évasion Méditerranéenne', price: 82.0, category: 'Coffrets', description: "2 bouteilles d'huile d'olive 100 ml, 1 huile essentielle 10 ml, 1 pot de miel 30 g, 1 sachet d'herbes" },
]

export async function POST() {
  try {
    // check existing
    const client = getSupabaseAdmin()
    const { data: existing, error: existingErr } = await client
      .from('products')
      .select('name')
      .in('name', COFFRETS.map(p => p.name))

    if (existingErr) throw existingErr

    const existingNames = new Set((existing || []).map(p => p.name))
    const rows = COFFRETS.filter(p => !existingNames.has(p.name)).map(p => ({
      name: p.name,
      description: p.description,
      price: p.price,
      category: p.category,
      // image_url: '/placeholder.svg',
      stock: 20,
      is_active: true,
    }))

    if (rows.length === 0) {
      return NextResponse.json({ success: true, count: 0, message: 'Already seeded' })
    }

    const { error } = await client.from('products').insert(rows)
    if (error) throw error

    return NextResponse.json({ success: true, count: rows.length })
  } catch (e: any) {
    return NextResponse.json({ success: false, message: e?.message || 'Seed error' }, { status: 500 })
  }
}


