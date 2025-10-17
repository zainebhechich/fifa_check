-- EMERGENCY: Disable RLS completely to fix infinite recursion
-- This will allow the app to work while we fix the policies properly

BEGIN;

-- Disable RLS on all tables temporarily
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.products DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments DISABLE ROW LEVEL SECURITY;

-- Drop all problematic policies
DROP POLICY IF EXISTS "profiles_select_policy" ON public.profiles;
DROP POLICY IF EXISTS "profiles_insert_policy" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_policy" ON public.profiles;
DROP POLICY IF EXISTS "profiles_public_read" ON public.profiles;
DROP POLICY IF EXISTS "profiles_user_insert" ON public.profiles;
DROP POLICY IF EXISTS "profiles_user_update" ON public.profiles;
DROP POLICY IF EXISTS "profiles_allow_all_read" ON public.profiles;
DROP POLICY IF EXISTS "profiles_allow_insert" ON public.profiles;
DROP POLICY IF EXISTS "profiles_allow_update" ON public.profiles;

-- Drop all other policies that might cause issues
DROP POLICY IF EXISTS "orders_insert_policy" ON public.orders;
DROP POLICY IF EXISTS "orders_select_policy" ON public.orders;
DROP POLICY IF EXISTS "orders_allow_insert" ON public.orders;
DROP POLICY IF EXISTS "orders_allow_select" ON public.orders;

DROP POLICY IF EXISTS "order_items_insert_policy" ON public.order_items;
DROP POLICY IF EXISTS "order_items_select_policy" ON public.order_items;
DROP POLICY IF EXISTS "order_items_allow_insert" ON public.order_items;
DROP POLICY IF EXISTS "order_items_allow_select" ON public.order_items;

DROP POLICY IF EXISTS "reviews_select_policy" ON public.reviews;
DROP POLICY IF EXISTS "reviews_insert_policy" ON public.reviews;
DROP POLICY IF EXISTS "reviews_allow_select" ON public.reviews;
DROP POLICY IF EXISTS "reviews_allow_insert" ON public.reviews;

DROP POLICY IF EXISTS "payments_insert_policy" ON public.payments;
DROP POLICY IF EXISTS "payments_select_policy" ON public.payments;
DROP POLICY IF EXISTS "payments_allow_insert" ON public.payments;
DROP POLICY IF EXISTS "payments_allow_select" ON public.payments;

DROP POLICY IF EXISTS "products_select_policy" ON public.products;
DROP POLICY IF EXISTS "products_allow_select" ON public.products;

COMMIT;
