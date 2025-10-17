-- Fix migration conflicts by dropping existing policies first
-- Run this before running the new RLS policies

BEGIN;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Profiles: self read" ON public.profiles;
DROP POLICY IF EXISTS "Profiles: self insert" ON public.profiles;
DROP POLICY IF EXISTS "Profiles: self update" ON public.profiles;
DROP POLICY IF EXISTS "Profiles: admin full" ON public.profiles;

DROP POLICY IF EXISTS "Products: public read" ON public.products;
DROP POLICY IF EXISTS "Products: admin insert" ON public.products;
DROP POLICY IF EXISTS "Products: admin update" ON public.products;
DROP POLICY IF EXISTS "Products: admin delete" ON public.products;

DROP POLICY IF EXISTS "Reviews: public read approved" ON public.reviews;
DROP POLICY IF EXISTS "Reviews: admin read all" ON public.reviews;
DROP POLICY IF EXISTS "Reviews: insert by owner" ON public.reviews;
DROP POLICY IF EXISTS "Reviews: update by admin" ON public.reviews;
DROP POLICY IF EXISTS "Reviews: delete by admin" ON public.reviews;

DROP POLICY IF EXISTS "Orders: insert by user" ON public.orders;
DROP POLICY IF EXISTS "Orders: select by owner" ON public.orders;
DROP POLICY IF EXISTS "Orders: update by admin" ON public.orders;
DROP POLICY IF EXISTS "Orders: admin select" ON public.orders;
DROP POLICY IF EXISTS "Orders: delete by admin" ON public.orders;

DROP POLICY IF EXISTS "Payments: admin full" ON public.payments;

-- Drop any other existing policies that might conflict
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Everyone can view active products" ON public.products;
DROP POLICY IF EXISTS "Admins can manage products" ON public.products;
DROP POLICY IF EXISTS "Users can view own orders" ON public.orders;
DROP POLICY IF EXISTS "Users can create own orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can view all orders" ON public.orders;
DROP POLICY IF EXISTS "Users can view own order items" ON public.order_items;
DROP POLICY IF EXISTS "Users can create own order items" ON public.order_items;
DROP POLICY IF EXISTS "Admins can view all order items" ON public.order_items;
DROP POLICY IF EXISTS "Everyone can view reviews" ON public.reviews;
DROP POLICY IF EXISTS "Authenticated users can create reviews" ON public.reviews;
DROP POLICY IF EXISTS "Users can update own reviews" ON public.reviews;
DROP POLICY IF EXISTS "Users can delete own reviews" ON public.reviews;
DROP POLICY IF EXISTS "Admins can manage all reviews" ON public.reviews;

COMMIT;
