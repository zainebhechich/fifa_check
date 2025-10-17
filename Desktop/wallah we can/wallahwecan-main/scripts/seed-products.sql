-- Seed products for the new schema
INSERT INTO public.products (name, slug, description, price, is_active)
VALUES
('Bouquet Jardin Floral', 'bouquet-jardin-floral', 'Un magnifique bouquet de fleurs fraîches du jardin', 45.99, true),
('Roses Rouges Premium', 'roses-rouges-premium', 'Bouquet de 12 roses rouges de qualité premium', 65.99, true),
('Composition Moderne', 'composition-moderne', 'Arrangement floral moderne et élégant', 89.99, true),
('Plante Verte Décorative', 'plante-verte-decorative', 'Belle plante verte pour décoration intérieure', 29.99, true),
('Bouquet Champêtre', 'bouquet-champetre', 'Bouquet aux couleurs champêtres et naturelles', 39.99, true),
('Orchidée Blanche', 'orchidee-blanche', 'Orchidée blanche en pot décoratif', 75.99, true),
('Couronne Funéraire', 'couronne-funeraire', 'Couronne de fleurs pour cérémonie', 120.99, true),
('Bouquet Mariage', 'bouquet-mariage', 'Bouquet de mariée élégant et raffiné', 199.99, true),
('La Savonnière Artisanale', 'savonniere-artisanale', 'Assortiment de 4 savons naturels parfumés', 82.0, true),
('Essence Vitale', 'essence-vitale', '6 flacons d\'huiles essentielles de 10ml chacun', 179.0, true),
('Nouveau Coffret', 'nouveau-coffret', 'Description du nouveau coffret', 120, true),
('Nouveau Coffret2', 'nouveau-coffret2', 'Description du nouveau coffret', 120, true)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  is_active = EXCLUDED.is_active,
  updated_at = now();

-- Create admin profile
INSERT INTO public.profiles (user_id, full_name, role)
VALUES ('00000000-0000-0000-0000-000000000000', 'Admin User', 'admin')
ON CONFLICT (user_id) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  updated_at = now();
