-- Fix database schema to match actual structure
BEGIN;

-- Drop all existing RLS policies to start fresh
DROP POLICY IF EXISTS "profiles_select_policy" ON public.profiles;
DROP POLICY IF EXISTS "profiles_insert_policy" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_policy" ON public.profiles;
DROP POLICY IF EXISTS "profiles_public_read" ON public.profiles;
DROP POLICY IF EXISTS "profiles_user_insert" ON public.profiles;
DROP POLICY IF EXISTS "profiles_user_update" ON public.profiles;

-- Temporarily disable RLS
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;

-- Re-enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create simple policies that match the actual schema
CREATE POLICY "profiles_allow_all_read" ON public.profiles
  FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "profiles_allow_insert" ON public.profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "profiles_allow_update" ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Fix other tables policies to match UUID schema
-- Orders policies
DROP POLICY IF EXISTS "orders_insert_policy" ON public.orders;
DROP POLICY IF EXISTS "orders_select_policy" ON public.orders;

CREATE POLICY "orders_allow_insert" ON public.orders
  FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);

CREATE POLICY "orders_allow_select" ON public.orders
  FOR SELECT
  TO authenticated, anon
  USING (true);

-- Order items policies  
DROP POLICY IF EXISTS "order_items_insert_policy" ON public.order_items;
DROP POLICY IF EXISTS "order_items_select_policy" ON public.order_items;

CREATE POLICY "order_items_allow_insert" ON public.order_items
  FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);

CREATE POLICY "order_items_allow_select" ON public.order_items
  FOR SELECT
  TO authenticated, anon
  USING (true);

-- Reviews policies
DROP POLICY IF EXISTS "reviews_select_policy" ON public.reviews;
DROP POLICY IF EXISTS "reviews_insert_policy" ON public.reviews;

CREATE POLICY "reviews_allow_select" ON public.reviews
  FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "reviews_allow_insert" ON public.reviews
  FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);

-- Payments policies
DROP POLICY IF EXISTS "payments_insert_policy" ON public.payments;
DROP POLICY IF EXISTS "payments_select_policy" ON public.payments;

CREATE POLICY "payments_allow_insert" ON public.payments
  FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);

CREATE POLICY "payments_allow_select" ON public.payments
  FOR SELECT
  TO authenticated, anon
  USING (true);

-- Products policies
DROP POLICY IF EXISTS "products_select_policy" ON public.products;

CREATE POLICY "products_allow_select" ON public.products
  FOR SELECT
  TO authenticated, anon
  USING (is_active = true);

COMMIT;
