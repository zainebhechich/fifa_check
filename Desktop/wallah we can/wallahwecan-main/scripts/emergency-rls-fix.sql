-- Emergency RLS fix - disable RLS temporarily to fix infinite recursion
BEGIN;

-- Temporarily disable RLS on profiles to break the recursion
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;

-- Drop all existing policies that might cause recursion
DROP POLICY IF EXISTS "profiles_select_policy" ON public.profiles;
DROP POLICY IF EXISTS "profiles_insert_policy" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_policy" ON public.profiles;
DROP POLICY IF EXISTS "Profiles: own profile" ON public.profiles;
DROP POLICY IF EXISTS "Profiles: admin full" ON public.profiles;

-- Re-enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create very simple policies without recursion
CREATE POLICY "profiles_public_read" ON public.profiles
  FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "profiles_user_insert" ON public.profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "profiles_user_update" ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

COMMIT;
