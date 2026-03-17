-- Category hierarchy: Option A (self-referencing parent_id)
-- Run this after schema.sql and seed.sql

-- 1. Add parent_id column
ALTER TABLE categories ADD COLUMN IF NOT EXISTS parent_id uuid REFERENCES categories(id);

-- 2. Insert subcategories (parent_id references the top-level category IDs from seed.sql)

-- TVs subcategories
INSERT INTO categories (id, name, slug, parent_id) VALUES
  ('cccccc01-cccc-cccc-cccc-cccccccccccc', 'OLED TV',    'oled-tvs',     'aaaaaaa5-aaaa-aaaa-aaaa-aaaaaaaaaaaa'),
  ('cccccc02-cccc-cccc-cccc-cccccccccccc', 'Mini LED TV', 'mini-led-tvs', 'aaaaaaa5-aaaa-aaaa-aaaa-aaaaaaaaaaaa');

-- Laptops subcategories
INSERT INTO categories (id, name, slug, parent_id) VALUES
  ('cccccc03-cccc-cccc-cccc-cccccccccccc', 'MacBook',          'macbook',          'aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaaa'),
  ('cccccc04-cccc-cccc-cccc-cccccccccccc', 'Windows-laptops',  'windows-laptops',  'aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaaa');

-- Smartphones subcategories
INSERT INTO categories (id, name, slug, parent_id) VALUES
  ('cccccc05-cccc-cccc-cccc-cccccccccccc', 'iPhone',       'iphone',        'aaaaaaa2-aaaa-aaaa-aaaa-aaaaaaaaaaaa'),
  ('cccccc06-cccc-cccc-cccc-cccccccccccc', 'Android',      'android-phones','aaaaaaa2-aaaa-aaaa-aaaa-aaaaaaaaaaaa');

-- Headphones subcategories
INSERT INTO categories (id, name, slug, parent_id) VALUES
  ('cccccc07-cccc-cccc-cccc-cccccccccccc', 'Over-ear', 'over-ear', 'aaaaaaa3-aaaa-aaaa-aaaa-aaaaaaaaaaaa'),
  ('cccccc08-cccc-cccc-cccc-cccccccccccc', 'In-ear',   'in-ear',   'aaaaaaa3-aaaa-aaaa-aaaa-aaaaaaaaaaaa');

-- Tablets subcategories
INSERT INTO categories (id, name, slug, parent_id) VALUES
  ('cccccc09-cccc-cccc-cccc-cccccccccccc', 'iPad',             'ipad',            'aaaaaaa4-aaaa-aaaa-aaaa-aaaaaaaaaaaa'),
  ('cccccc10-cccc-cccc-cccc-cccccccccccc', 'Android-plattor',  'android-tablets', 'aaaaaaa4-aaaa-aaaa-aaaa-aaaaaaaaaaaa');

-- 3. Re-assign products from top-level categories to subcategories

-- TVs
UPDATE products SET category_id = 'cccccc01-cccc-cccc-cccc-cccccccccccc'  -- OLED TV
  WHERE id IN (
    'bbbbbbc8-bbbb-bbbb-bbbb-bbbbbbbbbbbb',  -- Samsung QE65S95D OLED
    'bbbbbbc9-bbbb-bbbb-bbbb-bbbbbbbbbbbb'   -- LG C4 OLED
  );

UPDATE products SET category_id = 'cccccc02-cccc-cccc-cccc-cccccccccccc'  -- Mini LED TV
  WHERE id = 'bbbbbbca-bbbb-bbbb-bbbb-bbbbbbbbbbbb';  -- Sony Bravia 7 Mini LED

-- Laptops
UPDATE products SET category_id = 'cccccc03-cccc-cccc-cccc-cccccccccccc'  -- MacBook
  WHERE id IN (
    'bbbbbbb1-bbbb-bbbb-bbbb-bbbbbbbbbbbb',  -- MacBook Air M3
    'bbbbbbb2-bbbb-bbbb-bbbb-bbbbbbbbbbbb'   -- MacBook Pro M4
  );

UPDATE products SET category_id = 'cccccc04-cccc-cccc-cccc-cccccccccccc'  -- Windows-laptops
  WHERE id IN (
    'bbbbbbb3-bbbb-bbbb-bbbb-bbbbbbbbbbbb',  -- Dell XPS 15
    'bbbbbbb4-bbbb-bbbb-bbbb-bbbbbbbbbbbb',  -- Lenovo ThinkPad X1
    'bbbbbbb5-bbbb-bbbb-bbbb-bbbbbbbbbbbb'   -- ASUS ZenBook 14
  );

-- Smartphones
UPDATE products SET category_id = 'cccccc05-cccc-cccc-cccc-cccccccccccc'  -- iPhone
  WHERE id IN (
    'bbbbbbb6-bbbb-bbbb-bbbb-bbbbbbbbbbbb',  -- iPhone 16
    'bbbbbbb7-bbbb-bbbb-bbbb-bbbbbbbbbbbb'   -- iPhone 16 Pro
  );

UPDATE products SET category_id = 'cccccc06-cccc-cccc-cccc-cccccccccccc'  -- Android
  WHERE id IN (
    'bbbbbbb8-bbbb-bbbb-bbbb-bbbbbbbbbbbb',  -- Samsung Galaxy S25
    'bbbbbbb9-bbbb-bbbb-bbbb-bbbbbbbbbbbb',  -- Samsung Galaxy S25 Ultra
    'bbbbbbc1-bbbb-bbbb-bbbb-bbbbbbbbbbbb'   -- Google Pixel 9
  );

-- Headphones
UPDATE products SET category_id = 'cccccc07-cccc-cccc-cccc-cccccccccccc'  -- Over-ear
  WHERE id IN (
    'bbbbbbc2-bbbb-bbbb-bbbb-bbbbbbbbbbbb',  -- Sony WH-1000XM5
    'bbbbbbc4-bbbb-bbbb-bbbb-bbbbbbbbbbbb'   -- Bose QC45
  );

UPDATE products SET category_id = 'cccccc08-cccc-cccc-cccc-cccccccccccc'  -- In-ear
  WHERE id IN (
    'bbbbbbc3-bbbb-bbbb-bbbb-bbbbbbbbbbbb',  -- AirPods Pro 2
    'bbbbbbc5-bbbb-bbbb-bbbb-bbbbbbbbbbbb'   -- Samsung Galaxy Buds3 Pro
  );

-- Tablets
UPDATE products SET category_id = 'cccccc09-cccc-cccc-cccc-cccccccccccc'  -- iPad
  WHERE id = 'bbbbbbc6-bbbb-bbbb-bbbb-bbbbbbbbbbbb';  -- iPad Air 13"

UPDATE products SET category_id = 'cccccc10-cccc-cccc-cccc-cccccccccccc'  -- Android-plattor
  WHERE id = 'bbbbbbc7-bbbb-bbbb-bbbb-bbbbbbbbbbbb';  -- Samsung Galaxy Tab S10+
