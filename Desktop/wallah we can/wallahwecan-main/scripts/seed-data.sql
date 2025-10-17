-- Seed data for WALLAH WE CAN E-commerce
-- Run this AFTER setup-database.sql

-- Insert admin profile (replace with your actual user ID)
INSERT INTO public.profiles (user_id, full_name, role) 
VALUES ('6040a9b8-029b-4579-9cab-0e27ab9f3561', 'Admin User', 'admin')
ON CONFLICT (user_id) DO UPDATE SET 
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role;

-- Insert sample products
INSERT INTO public.products (name, slug, description, price, stock_quantity, is_active) VALUES
('Bouquet de Mariage Élégant', 'bouquet-mariage', 'Un magnifique bouquet de mariage avec des roses blanches et des pivoines', 89.99, 10, true),
('Arrangement Floral Moderne', 'arrangement-moderne', 'Arrangement contemporain avec des fleurs de saison', 65.50, 15, true),
('Bouquet de Roses Rouges', 'bouquet-roses-rouges', 'Bouquet classique de 12 roses rouges', 45.00, 20, true),
('Composition Tropicale', 'composition-tropicale', 'Arrangement exotique avec des fleurs tropicales', 75.00, 8, true),
('Bouquet Champêtre', 'bouquet-champetre', 'Bouquet rustique avec des fleurs des champs', 35.00, 25, true)
ON CONFLICT (slug) DO NOTHING;
