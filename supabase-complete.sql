-- =========================================
-- MALLOW & MANOR - COMPLETE SUPABASE SETUP
-- Run this ENTIRE script in Supabase SQL Editor
-- =========================================

-- =========================================
-- 1. CREATE TABLES
-- =========================================

-- Drop existing tables (WARNING: Deletes all data!)
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS categories CASCADE;

-- Create categories table
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  icon VARCHAR(10),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create products table with TEXT for long URLs
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  category VARCHAR(255) NOT NULL,
  main_image TEXT,
  thumbnails TEXT[],
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =========================================
-- 2. DISABLE ROW LEVEL SECURITY (simplest for public site)
-- =========================================

ALTER TABLE categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE products DISABLE ROW LEVEL SECURITY;

-- =========================================
-- 3. CREATE POLICIES (FIXED RLS ISSUES)
-- =========================================

-- Categories: Public read, authenticated full access
DROP POLICY IF EXISTS "Public read categories" ON categories;
CREATE POLICY "Public read categories" 
  ON categories FOR SELECT 
  TO anon 
  USING (true);

DROP POLICY IF EXISTS "Authenticated full categories" ON categories;
CREATE POLICY "Authenticated full categories" 
  ON categories FOR ALL 
  TO authenticated 
  USING (true) 
  WITH CHECK (true);

-- Products: Allow ALL access (public site)
DROP POLICY IF EXISTS "Public read products" ON products;
CREATE POLICY "Public read products" 
  ON products FOR SELECT 
  TO anon 
  USING (true);

DROP POLICY IF EXISTS "Public insert products" ON products;
CREATE POLICY "Public insert products" 
  ON products FOR INSERT 
  TO anon 
  WITH CHECK (true);

DROP POLICY IF EXISTS "Public update products" ON products;
CREATE POLICY "Public update products" 
  ON products FOR UPDATE 
  TO anon 
  USING (true) 
  WITH CHECK (true);

DROP POLICY IF EXISTS "Public delete products" ON products;
CREATE POLICY "Public delete products" 
  ON products FOR DELETE 
  TO anon 
  USING (true);

-- Products: Authenticated can DELETE
DROP POLICY IF EXISTS "Authenticated delete products" ON products;
CREATE POLICY "Authenticated delete products" 
  ON products FOR DELETE 
  TO authenticated 
  USING (true);

-- =========================================
-- 4. INSERT CATEGORIES
-- =========================================

INSERT INTO categories (slug, name, icon) VALUES
  ('bangles', 'Bangles', '💍'),
  ('nails', 'Nails', '💅'),
  ('abayas', 'Abayas', '👗'),
  ('necklaces', 'Necklaces', '✨')
ON CONFLICT (slug) DO NOTHING;

-- =========================================
-- 6. ANALYTICS TABLE
-- =========================================

CREATE TABLE IF NOT EXISTS analytics (
  id SERIAL PRIMARY KEY,
  event_type VARCHAR(50) NOT NULL,
  event_data JSONB,
  user_agent TEXT,
  referrer TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE analytics DISABLE ROW LEVEL SECURITY;

SELECT 'Tables created!' as status;

SELECT 'Categories:' as info;
SELECT * FROM categories;

SELECT 'Products columns:' as info;
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'products' 
ORDER BY ordinal_position;

SELECT 'Policies created:' as info;
SELECT 
  schemaname,
  tablename,
  policyname as polname,
  cmd as polcmd,
  roles::text
FROM pg_policies 
WHERE tablename IN ('products', 'categories')
ORDER BY tablename, policyname;

-- =========================================
-- 6. ANALYTICS TABLE
-- =========================================

CREATE TABLE IF NOT EXISTS analytics (
  id SERIAL PRIMARY KEY,
  event_type VARCHAR(50) NOT NULL,
  event_data JSONB,
  user_agent TEXT,
  referrer TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE analytics DISABLE ROW LEVEL SECURITY;

-- =========================================
-- AFTER RUNNING THIS SQL:
-- =========================================
-- 1. Create storage bucket:
--    Go to Storage > Create bucket
--    Name: mallow (lowercase)
--    Check "Public bucket" 
--    UNCHECK "Enable Row Level Security"
--    Click "Create bucket"
--
-- 2. Create admin user:
--    Go to Authentication > Users > Add user
--    Email: admin@mallowandmanor.com
--    Password: MallowManor2024!@#
--    CHECK "Auto Confirm User"
--    Click "Create user"
--
-- 3. Test:
--    npm run dev > /admin/login > login > add product
--    Visit /admin/analytics to see tracked events

-- =========================================
-- 4. STORAGE BUCKET SETUP
-- =========================================
-- Note: If storage bucket has RLS enabled, add these policies.
-- Otherwise, just keep the bucket public without RLS.

-- (Skip this section if you disabled RLS on storage bucket)
--
-- 3. Test: npm run dev > /admin/login
