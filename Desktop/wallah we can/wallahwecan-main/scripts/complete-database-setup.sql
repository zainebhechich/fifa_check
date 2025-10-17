BEGIN;

-- Drop any possibly conflicting policies (including the one that caused the error)
DROP POLICY IF EXISTS "Profiles: own profile" ON public.profiles;
DROP POLICY IF EXISTS "Profiles: admin full" ON public.profiles;
DROP POLICY IF EXISTS "profiles_select_policy" ON public.profiles;
DROP POLICY IF EXISTS "profiles_insert_policy" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_policy" ON public.profiles;

-- Enable RLS on profiles first
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create simple, non-recursive policies for profiles
CREATE POLICY "profiles_select_policy" ON public.profiles
  FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "profiles_insert_policy" ON public.profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (SELECT auth.uid())::uuid);

CREATE POLICY "profiles_update_policy" ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (user_id = (SELECT auth.uid())::uuid)
  WITH CHECK (user_id = (SELECT auth.uid())::uuid);

-- Enable RLS on other tables (idempotent if already enabled)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Products policies (public read, admin manage)
DROP POLICY IF EXISTS "products_select_policy" ON public.products;
DROP POLICY IF EXISTS "products_admin_select_policy" ON public.products;
DROP POLICY IF EXISTS "products_admin_insert_policy" ON public.products;
DROP POLICY IF EXISTS "products_admin_update_policy" ON public.products;
DROP POLICY IF EXISTS "products_admin_delete_policy" ON public.products;

CREATE POLICY "products_select_policy" ON public.products
  FOR SELECT
  TO authenticated, anon
  USING (is_active = true);

-- Admin policies (separate per operation to follow best practices)
CREATE POLICY "products_admin_select_policy" ON public.products
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.profiles WHERE user_id = (SELECT auth.uid())::uuid AND role = 'admin'
  ));
CREATE POLICY "products_admin_insert_policy" ON public.products
  FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.profiles WHERE user_id = (SELECT auth.uid())::uuid AND role = 'admin'
  ));
CREATE POLICY "products_admin_update_policy" ON public.products
  FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.profiles WHERE user_id = (SELECT auth.uid())::uuid AND role = 'admin'
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.profiles WHERE user_id = (SELECT auth.uid())::uuid AND role = 'admin'
  ));
CREATE POLICY "products_admin_delete_policy" ON public.products
  FOR DELETE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.profiles WHERE user_id = (SELECT auth.uid())::uuid AND role = 'admin'
  ));

-- Orders policies (guest insert, owner select, admin manage)
DROP POLICY IF EXISTS "orders_insert_policy" ON public.orders;
DROP POLICY IF EXISTS "orders_select_policy" ON public.orders;
DROP POLICY IF EXISTS "orders_admin_select_policy" ON public.orders;
DROP POLICY IF EXISTS "orders_admin_insert_policy" ON public.orders;
DROP POLICY IF EXISTS "orders_admin_update_policy" ON public.orders;
DROP POLICY IF EXISTS "orders_admin_delete_policy" ON public.orders;

CREATE POLICY "orders_insert_policy" ON public.orders
  FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);

CREATE POLICY "orders_select_policy" ON public.orders
  FOR SELECT
  TO authenticated
  USING (user_id = (SELECT auth.uid())::uuid OR user_id IS NULL);

-- Admin policies for orders
CREATE POLICY "orders_admin_select_policy" ON public.orders
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.profiles WHERE user_id = (SELECT auth.uid())::uuid AND role = 'admin'
  ));
CREATE POLICY "orders_admin_insert_policy" ON public.orders
  FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.profiles WHERE user_id = (SELECT auth.uid())::uuid AND role = 'admin'
  ));
CREATE POLICY "orders_admin_update_policy" ON public.orders
  FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.profiles WHERE user_id = (SELECT auth.uid())::uuid AND role = 'admin'
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.profiles WHERE user_id = (SELECT auth.uid())::uuid AND role = 'admin'
  ));
CREATE POLICY "orders_admin_delete_policy" ON public.orders
  FOR DELETE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.profiles WHERE user_id = (SELECT auth.uid())::uuid AND role = 'admin'
  ));

-- Order items policies
DROP POLICY IF EXISTS "order_items_insert_policy" ON public.order_items;
DROP POLICY IF EXISTS "order_items_select_policy" ON public.order_items;
DROP POLICY IF EXISTS "order_items_admin_select_policy" ON public.order_items;
DROP POLICY IF EXISTS "order_items_admin_insert_policy" ON public.order_items;
DROP POLICY IF EXISTS "order_items_admin_update_policy" ON public.order_items;
DROP POLICY IF EXISTS "order_items_admin_delete_policy" ON public.order_items;

CREATE POLICY "order_items_insert_policy" ON public.order_items
  FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);

CREATE POLICY "order_items_select_policy" ON public.order_items
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.orders WHERE id = public.order_items.order_id
      AND (user_id = (SELECT auth.uid())::uuid OR user_id IS NULL)
  ));

-- Admin policies for order_items
CREATE POLICY "order_items_admin_select_policy" ON public.order_items
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.profiles WHERE user_id = (SELECT auth.uid())::uuid AND role = 'admin'
  ));
CREATE POLICY "order_items_admin_insert_policy" ON public.order_items
  FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.profiles WHERE user_id = (SELECT auth.uid())::uuid AND role = 'admin'
  ));
CREATE POLICY "order_items_admin_update_policy" ON public.order_items
  FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.profiles WHERE user_id = (SELECT auth.uid())::uuid AND role = 'admin'
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.profiles WHERE user_id = (SELECT auth.uid())::uuid AND role = 'admin'
  ));
CREATE POLICY "order_items_admin_delete_policy" ON public.order_items
  FOR DELETE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.profiles WHERE user_id = (SELECT auth.uid())::uuid AND role = 'admin'
  ));

-- Reviews policies (public read approved, user insert, admin manage)
DROP POLICY IF EXISTS "reviews_select_policy" ON public.reviews;
DROP POLICY IF EXISTS "reviews_insert_policy" ON public.reviews;
DROP POLICY IF EXISTS "reviews_admin_select_policy" ON public.reviews;
DROP POLICY IF EXISTS "reviews_admin_insert_policy" ON public.reviews;
DROP POLICY IF EXISTS "reviews_admin_update_policy" ON public.reviews;
DROP POLICY IF EXISTS "reviews_admin_delete_policy" ON public.reviews;

CREATE POLICY "reviews_select_policy" ON public.reviews
  FOR SELECT
  TO authenticated, anon
  USING (is_approved = true OR user_id = (SELECT auth.uid())::uuid);

CREATE POLICY "reviews_insert_policy" ON public.reviews
  FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);

-- Admin policies for reviews
CREATE POLICY "reviews_admin_select_policy" ON public.reviews
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.profiles WHERE user_id = (SELECT auth.uid())::uuid AND role = 'admin'
  ));
CREATE POLICY "reviews_admin_insert_policy" ON public.reviews
  FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.profiles WHERE user_id = (SELECT auth.uid())::uuid AND role = 'admin'
  ));
CREATE POLICY "reviews_admin_update_policy" ON public.reviews
  FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.profiles WHERE user_id = (SELECT auth.uid())::uuid AND role = 'admin'
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.profiles WHERE user_id = (SELECT auth.uid())::uuid AND role = 'admin'
  ));
CREATE POLICY "reviews_admin_delete_policy" ON public.reviews
  FOR DELETE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.profiles WHERE user_id = (SELECT auth.uid())::uuid AND role = 'admin'
  ));

-- Payments policies
DROP POLICY IF EXISTS "payments_insert_policy" ON public.payments;
DROP POLICY IF EXISTS "payments_select_policy" ON public.payments;
DROP POLICY IF EXISTS "payments_admin_select_policy" ON public.payments;
DROP POLICY IF EXISTS "payments_admin_insert_policy" ON public.payments;
DROP POLICY IF EXISTS "payments_admin_update_policy" ON public.payments;
DROP POLICY IF EXISTS "payments_admin_delete_policy" ON public.payments;

CREATE POLICY "payments_insert_policy" ON public.payments
  FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);

CREATE POLICY "payments_select_policy" ON public.payments
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.orders WHERE id = public.payments.order_id
      AND (user_id = (SELECT auth.uid())::uuid OR user_id IS NULL)
  ));

-- Admin policies for payments
CREATE POLICY "payments_admin_select_policy" ON public.payments
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.profiles WHERE user_id = (SELECT auth.uid())::uuid AND role = 'admin'
  ));
CREATE POLICY "payments_admin_insert_policy" ON public.payments
  FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.profiles WHERE user_id = (SELECT auth.uid())::uuid AND role = 'admin'
  ));
CREATE POLICY "payments_admin_update_policy" ON public.payments
  FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.profiles WHERE user_id = (SELECT auth.uid())::uuid AND role = 'admin'
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.profiles WHERE user_id = (SELECT auth.uid())::uuid AND role = 'admin'
  ));
CREATE POLICY "payments_admin_delete_policy" ON public.payments
  FOR DELETE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.profiles WHERE user_id = (SELECT auth.uid())::uuid AND role = 'admin'
  ));

COMMIT;