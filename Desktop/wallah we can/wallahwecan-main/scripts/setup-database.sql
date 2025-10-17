-- Complete Database Setup for WALLAH WE CAN E-commerce
-- Run this in Supabase SQL Editor

BEGIN;

-- === Table: public.profiles ===
CREATE TABLE IF NOT EXISTS public.profiles (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  role text DEFAULT 'user',
  avatar_url text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON public.profiles(user_id);

-- === Table: public.products ===
CREATE TABLE IF NOT EXISTS public.products (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  price numeric(12,2) NOT NULL DEFAULT 0,
  stock_quantity integer DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(slug);
CREATE INDEX IF NOT EXISTS idx_products_active ON public.products(is_active);

-- === Table: public.orders ===
CREATE TABLE IF NOT EXISTS public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  total_amount numeric(12,2) NOT NULL DEFAULT 0,
  currency text DEFAULT 'EUR',
  status text NOT NULL DEFAULT 'pending',
  customer_email text,
  customer_name text,
  customer_phone text,
  payment_method text,
  payment_reference text,
  payment_id text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);

-- === Table: public.order_items ===
CREATE TABLE IF NOT EXISTS public.order_items (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  order_id uuid NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id bigint REFERENCES public.products(id) ON DELETE SET NULL,
  product_name text NOT NULL,
  quantity integer NOT NULL DEFAULT 1,
  price numeric(12,2) NOT NULL DEFAULT 0,
  created_at timestamp with time zone DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON public.order_items(product_id);

-- === Table: public.payments ===
CREATE TABLE IF NOT EXISTS public.payments (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  order_id uuid REFERENCES public.orders(id) ON DELETE SET NULL,
  amount numeric(12,2) NOT NULL DEFAULT 0,
  provider text DEFAULT 'konnect',
  provider_payment_id text,
  status text NOT NULL DEFAULT 'pending',
  metadata jsonb DEFAULT '{}',
  created_at timestamp with time zone DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_payments_order_id ON public.payments(order_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON public.payments(status);
CREATE INDEX IF NOT EXISTS idx_payments_provider_payment_id ON public.payments(provider_payment_id);

-- === Helper Functions ===
CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS text
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT role FROM public.profiles WHERE user_id = auth.uid();
$$;

-- === RLS Policies ===

-- Profiles: users can read/update own profile, admins can do everything
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Profiles: own profile" ON public.profiles;
DROP POLICY IF EXISTS "Profiles: admin full" ON public.profiles;

CREATE POLICY "Profiles: own profile" ON public.profiles 
  FOR ALL TO authenticated 
  USING (user_id = auth.uid()) 
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Profiles: admin full" ON public.profiles 
  FOR ALL TO authenticated 
  USING (get_user_role() = 'admin') 
  WITH CHECK (get_user_role() = 'admin');

-- Products: public read, admin manage
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Products: public read active" ON public.products;
DROP POLICY IF EXISTS "Products: admin full" ON public.products;

CREATE POLICY "Products: public read active" ON public.products 
  FOR SELECT 
  USING (is_active = true);

CREATE POLICY "Products: admin full" ON public.products 
  FOR ALL TO authenticated 
  USING (get_user_role() = 'admin') 
  WITH CHECK (get_user_role() = 'admin');

-- Orders: guest insert, owner select, admin full
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Orders: guest insert" ON public.orders;
DROP POLICY IF EXISTS "Orders: select by owner" ON public.orders;
DROP POLICY IF EXISTS "Orders: admin full" ON public.orders;

CREATE POLICY "Orders: guest insert" ON public.orders 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Orders: select by owner" ON public.orders 
  FOR SELECT TO authenticated 
  USING (user_id = auth.uid());

CREATE POLICY "Orders: admin full" ON public.orders 
  FOR ALL TO authenticated 
  USING (get_user_role() = 'admin') 
  WITH CHECK (get_user_role() = 'admin');

-- Order items: guest insert, owner select, admin full
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "OrderItems: guest insert" ON public.order_items;
DROP POLICY IF EXISTS "OrderItems: owner select" ON public.order_items;
DROP POLICY IF EXISTS "OrderItems: admin full" ON public.order_items;

CREATE POLICY "OrderItems: guest insert" ON public.order_items 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "OrderItems: owner select" ON public.order_items 
  FOR SELECT TO authenticated 
  USING (order_id IN (SELECT id FROM public.orders WHERE user_id = auth.uid()));

CREATE POLICY "OrderItems: admin full" ON public.order_items 
  FOR ALL TO authenticated 
  USING (get_user_role() = 'admin') 
  WITH CHECK (get_user_role() = 'admin');

-- Payments: guest insert, owner select, admin full
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Payments: guest insert" ON public.payments;
DROP POLICY IF EXISTS "Payments: owner select" ON public.payments;
DROP POLICY IF EXISTS "Payments: admin full" ON public.payments;

CREATE POLICY "Payments: guest insert" ON public.payments 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Payments: owner select" ON public.payments 
  FOR SELECT TO authenticated 
  USING (order_id IN (SELECT id FROM public.orders WHERE user_id = auth.uid()));

CREATE POLICY "Payments: admin full" ON public.payments 
  FOR ALL TO authenticated 
  USING (get_user_role() = 'admin') 
  WITH CHECK (get_user_role() = 'admin');

COMMIT;
