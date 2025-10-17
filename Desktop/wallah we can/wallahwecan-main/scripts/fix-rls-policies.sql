-- Fix RLS policies to prevent infinite recursion
-- Run this in Supabase SQL Editor

BEGIN;

-- Drop existing problematic policies
DROP POLICY IF EXISTS "Profiles: own profile" ON public.profiles;
DROP POLICY IF EXISTS "Profiles: admin full" ON public.profiles;

-- Create simple, non-recursive policies for profiles
CREATE POLICY "profiles_select_policy" ON public.profiles
  FOR SELECT 
  USING (true); -- Allow all reads for now

CREATE POLICY "profiles_insert_policy" ON public.profiles
  FOR INSERT 
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "profiles_update_policy" ON public.profiles
  FOR UPDATE 
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Products policies (public read, admin manage)
DROP POLICY IF EXISTS "products_select_policy" ON public.products;
DROP POLICY IF EXISTS "products_admin_policy" ON public.products;

CREATE POLICY "products_select_policy" ON public.products
  FOR SELECT 
  USING (is_active = true);

CREATE POLICY "products_admin_policy" ON public.products
  FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role = 'admin'
  ));

-- Orders policies (guest insert, owner select, admin full)
DROP POLICY IF EXISTS "orders_insert_policy" ON public.orders;
DROP POLICY IF EXISTS "orders_select_policy" ON public.orders;
DROP POLICY IF EXISTS "orders_admin_policy" ON public.orders;

CREATE POLICY "orders_insert_policy" ON public.orders
  FOR INSERT 
  WITH CHECK (true); -- Allow guest orders

CREATE POLICY "orders_select_policy" ON public.orders
  FOR SELECT 
  USING (user_id = auth.uid() OR user_id IS NULL);

CREATE POLICY "orders_admin_policy" ON public.orders
  FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role = 'admin'
  ));

-- Order items policies
DROP POLICY IF EXISTS "order_items_insert_policy" ON public.order_items;
DROP POLICY IF EXISTS "order_items_select_policy" ON public.order_items;
DROP POLICY IF EXISTS "order_items_admin_policy" ON public.order_items;

CREATE POLICY "order_items_insert_policy" ON public.order_items
  FOR INSERT 
  WITH CHECK (true); -- Allow guest order items

CREATE POLICY "order_items_select_policy" ON public.order_items
  FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM public.orders 
    WHERE id = order_items.order_id 
    AND (user_id = auth.uid() OR user_id IS NULL)
  ));

CREATE POLICY "order_items_admin_policy" ON public.order_items
  FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role = 'admin'
  ));

-- Reviews policies (public read approved, user insert, admin manage)
DROP POLICY IF EXISTS "reviews_select_policy" ON public.reviews;
DROP POLICY IF EXISTS "reviews_insert_policy" ON public.reviews;
DROP POLICY IF EXISTS "reviews_admin_policy" ON public.reviews;

CREATE POLICY "reviews_select_policy" ON public.reviews
  FOR SELECT 
  USING (is_approved = true OR user_id = auth.uid());

CREATE POLICY "reviews_insert_policy" ON public.reviews
  FOR INSERT 
  WITH CHECK (true); -- Allow guest reviews

CREATE POLICY "reviews_admin_policy" ON public.reviews
  FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role = 'admin'
  ));

-- Payments policies
DROP POLICY IF EXISTS "payments_insert_policy" ON public.payments;
DROP POLICY IF EXISTS "payments_select_policy" ON public.payments;
DROP POLICY IF EXISTS "payments_admin_policy" ON public.payments;

CREATE POLICY "payments_insert_policy" ON public.payments
  FOR INSERT 
  WITH CHECK (true); -- Allow payment creation

CREATE POLICY "payments_select_policy" ON public.payments
  FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM public.orders 
    WHERE id = payments.order_id 
    AND (user_id = auth.uid() OR user_id IS NULL)
  ));

CREATE POLICY "payments_admin_policy" ON public.payments
  FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role = 'admin'
  ));

COMMIT;
