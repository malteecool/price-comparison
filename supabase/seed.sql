-- Seed data for Swedish electronics price comparison MVP
-- Run this after schema.sql

-- Suppliers
insert into suppliers (id, name, website_url) values
  ('11111111-1111-1111-1111-111111111111', 'Elgiganten',  'https://www.elgiganten.se'),
  ('22222222-2222-2222-2222-222222222222', 'MediaMarkt',  'https://www.mediamarkt.se'),
  ('33333333-3333-3333-3333-333333333333', 'NetOnNet',    'https://www.netonnet.se'),
  ('44444444-4444-4444-4444-444444444444', 'Komplett',    'https://www.komplett.se');

-- Categories
insert into categories (id, name, slug) values
  ('aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Laptops',      'laptops'),
  ('aaaaaaa2-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Smartphones',  'smartphones'),
  ('aaaaaaa3-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Headphones',   'headphones'),
  ('aaaaaaa4-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Tablets',      'tablets'),
  ('aaaaaaa5-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'TVs',          'tvs');

-- Products
insert into products (id, name, brand, category_id, ean, description, image_url) values
  -- Laptops
  ('bbbbbbb1-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'MacBook Air 13" M3', 'Apple', 'aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '0194253819615', '13.6" Liquid Retina, 8GB RAM, 256GB SSD, M3-chip', 'https://placehold.co/600x600/1d1d1f/f5f5f7?text=MacBook+Air+M3'),
  ('bbbbbbb2-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'MacBook Pro 14" M4', 'Apple', 'aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '0195949310737', '14.2" Liquid Retina XDR, 24GB RAM, 512GB SSD, M4 Pro-chip', 'https://placehold.co/600x600/1d1d1f/f5f5f7?text=MacBook+Pro+M4'),
  ('bbbbbbb3-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Dell XPS 15 9530', 'Dell', 'aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '5397184757818', '15.6" OLED, Intel Core i7, 16GB RAM, 512GB SSD', 'https://placehold.co/600x600/007db8/ffffff?text=Dell+XPS+15'),
  ('bbbbbbb4-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Lenovo ThinkPad X1 Carbon Gen 12', 'Lenovo', 'aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '0197529066918', '14" IPS, Intel Core Ultra 7, 16GB RAM, 512GB SSD', 'https://placehold.co/600x600/e2231a/ffffff?text=ThinkPad+X1'),
  ('bbbbbbb5-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'ASUS ZenBook 14 OLED', 'ASUS', 'aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '4711387476451', '14" OLED, AMD Ryzen 7, 16GB RAM, 512GB SSD', 'https://placehold.co/600x600/00539b/ffffff?text=ZenBook+14'),
  -- Smartphones
  ('bbbbbbb6-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'iPhone 16 128GB', 'Apple', 'aaaaaaa2-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '0195949771872', '6.1" Super Retina XDR, A18-chip, 48MP kamera', 'https://placehold.co/600x600/1d1d1f/f5f5f7?text=iPhone+16'),
  ('bbbbbbb7-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'iPhone 16 Pro 256GB', 'Apple', 'aaaaaaa2-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '0195949771896', '6.3" Super Retina XDR, A18 Pro-chip, 48MP kamera, titanium', 'https://placehold.co/600x600/1d1d1f/f5f5f7?text=iPhone+16+Pro'),
  ('bbbbbbb8-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Samsung Galaxy S25 256GB', 'Samsung', 'aaaaaaa2-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '8806095681382', '6.2" Dynamic AMOLED 2X, Snapdragon 8 Elite, 50MP kamera', 'https://placehold.co/600x600/1428a0/ffffff?text=Galaxy+S25'),
  ('bbbbbbb9-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Samsung Galaxy S25 Ultra 512GB', 'Samsung', 'aaaaaaa2-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '8806095681429', '6.9" Dynamic AMOLED 2X, Snapdragon 8 Elite, S Pen', 'https://placehold.co/600x600/1428a0/ffffff?text=Galaxy+S25+Ultra'),
  ('bbbbbbc1-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Google Pixel 9 128GB', 'Google', 'aaaaaaa2-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '0840244706730', '6.3" OLED, Google Tensor G4, 50MP kamera', 'https://placehold.co/600x600/4285f4/ffffff?text=Pixel+9'),
  -- Headphones
  ('bbbbbbc2-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Sony WH-1000XM5', 'Sony', 'aaaaaaa3-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '4548736132283', 'Over-ear, aktiv brusreducering, 30h batteritid', 'https://placehold.co/600x600/000000/ffffff?text=WH-1000XM5'),
  ('bbbbbbc3-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Apple AirPods Pro 2', 'Apple', 'aaaaaaa3-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '0194253728190', 'In-ear, aktiv brusreducering, MagSafe, H2-chip', 'https://placehold.co/600x600/1d1d1f/f5f5f7?text=AirPods+Pro+2'),
  ('bbbbbbc4-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Bose QuietComfort 45', 'Bose', 'aaaaaaa3-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '017817834742', 'Over-ear, aktiv brusreducering, 24h batteritid', 'https://placehold.co/600x600/2c2c2c/ffffff?text=QC45'),
  ('bbbbbbc5-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Samsung Galaxy Buds3 Pro', 'Samsung', 'aaaaaaa3-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '8806095682181', 'In-ear, aktiv brusreducering, Dolby Atmos, ANC', 'https://placehold.co/600x600/1428a0/ffffff?text=Buds3+Pro'),
  -- Tablets
  ('bbbbbbc6-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'iPad Air 13" M2 WiFi 128GB', 'Apple', 'aaaaaaa4-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '0195949879784', '13" Liquid Retina, M2-chip, Touch ID, USB-C', 'https://placehold.co/600x600/1d1d1f/f5f5f7?text=iPad+Air+13'),
  ('bbbbbbc7-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Samsung Galaxy Tab S10+ 256GB', 'Samsung', 'aaaaaaa4-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '8806095369877', '12.4" Dynamic AMOLED 2X, Snapdragon 8 Gen 3, S Pen', 'https://placehold.co/600x600/1428a0/ffffff?text=Tab+S10+'),
  -- TVs
  ('bbbbbbc8-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Samsung QE65S95D 65" OLED', 'Samsung', 'aaaaaaa5-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '8806095081007', '65" QD-OLED, 4K, 144Hz, HDR, Tizen OS', 'https://placehold.co/600x600/1428a0/ffffff?text=QE65S95D'),
  ('bbbbbbc9-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'LG C4 55" OLED', 'LG', 'aaaaaaa5-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '8806098765430', '55" OLED evo, 4K, 120Hz, webOS, HDMI 2.1', 'https://placehold.co/600x600/a50034/ffffff?text=LG+C4+55'),
  ('bbbbbbca-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Sony Bravia 7 65"', 'Sony', 'aaaaaaa5-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '4548736162891', '65" Mini LED, 4K, 120Hz, Google TV, XR Processor', 'https://placehold.co/600x600/000000/ffffff?text=Bravia+7+65');

-- Prices (SEK, realistic Swedish market prices)
insert into prices (product_id, supplier_id, price, url) values
  -- MacBook Air 13" M3
  ('bbbbbbb1-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111', 12990, 'https://www.elgiganten.se/macbook-air-m3'),
  ('bbbbbbb1-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '22222222-2222-2222-2222-222222222222', 12995, 'https://www.mediamarkt.se/macbook-air-m3'),
  ('bbbbbbb1-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '33333333-3333-3333-3333-333333333333', 12790, 'https://www.netonnet.se/macbook-air-m3'),
  ('bbbbbbb1-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '44444444-4444-4444-4444-444444444444', 12890, 'https://www.komplett.se/macbook-air-m3'),
  -- MacBook Pro 14" M4
  ('bbbbbbb2-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111', 24990, 'https://www.elgiganten.se/macbook-pro-m4'),
  ('bbbbbbb2-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '22222222-2222-2222-2222-222222222222', 24990, 'https://www.mediamarkt.se/macbook-pro-m4'),
  ('bbbbbbb2-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '33333333-3333-3333-3333-333333333333', 24590, 'https://www.netonnet.se/macbook-pro-m4'),
  ('bbbbbbb2-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '44444444-4444-4444-4444-444444444444', 24750, 'https://www.komplett.se/macbook-pro-m4'),
  -- Dell XPS 15
  ('bbbbbbb3-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111', 19990, 'https://www.elgiganten.se/dell-xps-15'),
  ('bbbbbbb3-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '33333333-3333-3333-3333-333333333333', 19490, 'https://www.netonnet.se/dell-xps-15'),
  ('bbbbbbb3-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '44444444-4444-4444-4444-444444444444', 19290, 'https://www.komplett.se/dell-xps-15'),
  -- Lenovo ThinkPad X1 Carbon
  ('bbbbbbb4-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '22222222-2222-2222-2222-222222222222', 22990, 'https://www.mediamarkt.se/thinkpad-x1'),
  ('bbbbbbb4-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '44444444-4444-4444-4444-444444444444', 21990, 'https://www.komplett.se/thinkpad-x1'),
  -- ASUS ZenBook 14
  ('bbbbbbb5-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111', 11990, 'https://www.elgiganten.se/zenbook-14'),
  ('bbbbbbb5-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '33333333-3333-3333-3333-333333333333', 11690, 'https://www.netonnet.se/zenbook-14'),
  ('bbbbbbb5-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '44444444-4444-4444-4444-444444444444', 11790, 'https://www.komplett.se/zenbook-14'),
  -- iPhone 16
  ('bbbbbbb6-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111', 11990, 'https://www.elgiganten.se/iphone-16'),
  ('bbbbbbb6-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '22222222-2222-2222-2222-222222222222', 11990, 'https://www.mediamarkt.se/iphone-16'),
  ('bbbbbbb6-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '33333333-3333-3333-3333-333333333333', 11790, 'https://www.netonnet.se/iphone-16'),
  -- iPhone 16 Pro
  ('bbbbbbb7-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111', 15990, 'https://www.elgiganten.se/iphone-16-pro'),
  ('bbbbbbb7-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '22222222-2222-2222-2222-222222222222', 15990, 'https://www.mediamarkt.se/iphone-16-pro'),
  ('bbbbbbb7-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '33333333-3333-3333-3333-333333333333', 15790, 'https://www.netonnet.se/iphone-16-pro'),
  ('bbbbbbb7-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '44444444-4444-4444-4444-444444444444', 15890, 'https://www.komplett.se/iphone-16-pro'),
  -- Samsung Galaxy S25
  ('bbbbbbb8-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111', 12990, 'https://www.elgiganten.se/galaxy-s25'),
  ('bbbbbbb8-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '22222222-2222-2222-2222-222222222222', 12990, 'https://www.mediamarkt.se/galaxy-s25'),
  ('bbbbbbb8-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '33333333-3333-3333-3333-333333333333', 12690, 'https://www.netonnet.se/galaxy-s25'),
  ('bbbbbbb8-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '44444444-4444-4444-4444-444444444444', 12790, 'https://www.komplett.se/galaxy-s25'),
  -- Samsung Galaxy S25 Ultra
  ('bbbbbbb9-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111', 19990, 'https://www.elgiganten.se/galaxy-s25-ultra'),
  ('bbbbbbb9-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '22222222-2222-2222-2222-222222222222', 19990, 'https://www.mediamarkt.se/galaxy-s25-ultra'),
  ('bbbbbbb9-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '33333333-3333-3333-3333-333333333333', 19590, 'https://www.netonnet.se/galaxy-s25-ultra'),
  -- Google Pixel 9
  ('bbbbbbc1-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111', 9990,  'https://www.elgiganten.se/pixel-9'),
  ('bbbbbbc1-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '22222222-2222-2222-2222-222222222222', 9990,  'https://www.mediamarkt.se/pixel-9'),
  ('bbbbbbc1-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '44444444-4444-4444-4444-444444444444', 9790,  'https://www.komplett.se/pixel-9'),
  -- Sony WH-1000XM5
  ('bbbbbbc2-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111', 3990,  'https://www.elgiganten.se/wh1000xm5'),
  ('bbbbbbc2-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '22222222-2222-2222-2222-222222222222', 3990,  'https://www.mediamarkt.se/wh1000xm5'),
  ('bbbbbbc2-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '33333333-3333-3333-3333-333333333333', 3790,  'https://www.netonnet.se/wh1000xm5'),
  ('bbbbbbc2-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '44444444-4444-4444-4444-444444444444', 3890,  'https://www.komplett.se/wh1000xm5'),
  -- AirPods Pro 2
  ('bbbbbbc3-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111', 2995,  'https://www.elgiganten.se/airpods-pro-2'),
  ('bbbbbbc3-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '22222222-2222-2222-2222-222222222222', 2995,  'https://www.mediamarkt.se/airpods-pro-2'),
  ('bbbbbbc3-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '33333333-3333-3333-3333-333333333333', 2890,  'https://www.netonnet.se/airpods-pro-2'),
  -- Bose QC45
  ('bbbbbbc4-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111', 3295,  'https://www.elgiganten.se/bose-qc45'),
  ('bbbbbbc4-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '22222222-2222-2222-2222-222222222222', 3290,  'https://www.mediamarkt.se/bose-qc45'),
  ('bbbbbbc4-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '33333333-3333-3333-3333-333333333333', 3190,  'https://www.netonnet.se/bose-qc45'),
  -- Samsung Galaxy Buds3 Pro
  ('bbbbbbc5-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111', 2195,  'https://www.elgiganten.se/buds3-pro'),
  ('bbbbbbc5-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '22222222-2222-2222-2222-222222222222', 2195,  'https://www.mediamarkt.se/buds3-pro'),
  ('bbbbbbc5-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '33333333-3333-3333-3333-333333333333', 2090,  'https://www.netonnet.se/buds3-pro'),
  -- iPad Air 13"
  ('bbbbbbc6-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111', 11990, 'https://www.elgiganten.se/ipad-air-13'),
  ('bbbbbbc6-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '22222222-2222-2222-2222-222222222222', 11990, 'https://www.mediamarkt.se/ipad-air-13'),
  ('bbbbbbc6-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '33333333-3333-3333-3333-333333333333', 11790, 'https://www.netonnet.se/ipad-air-13'),
  -- Samsung Galaxy Tab S10+
  ('bbbbbbc7-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111', 11490, 'https://www.elgiganten.se/tab-s10-plus'),
  ('bbbbbbc7-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '22222222-2222-2222-2222-222222222222', 11490, 'https://www.mediamarkt.se/tab-s10-plus'),
  ('bbbbbbc7-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '33333333-3333-3333-3333-333333333333', 11190, 'https://www.netonnet.se/tab-s10-plus'),
  -- Samsung QE65S95D
  ('bbbbbbc8-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111', 24990, 'https://www.elgiganten.se/qe65s95d'),
  ('bbbbbbc8-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '22222222-2222-2222-2222-222222222222', 24990, 'https://www.mediamarkt.se/qe65s95d'),
  ('bbbbbbc8-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '33333333-3333-3333-3333-333333333333', 23990, 'https://www.netonnet.se/qe65s95d'),
  ('bbbbbbc8-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '44444444-4444-4444-4444-444444444444', 24490, 'https://www.komplett.se/qe65s95d'),
  -- LG C4 55"
  ('bbbbbbc9-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111', 15990, 'https://www.elgiganten.se/lg-c4-55'),
  ('bbbbbbc9-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '22222222-2222-2222-2222-222222222222', 15990, 'https://www.mediamarkt.se/lg-c4-55'),
  ('bbbbbbc9-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '33333333-3333-3333-3333-333333333333', 15490, 'https://www.netonnet.se/lg-c4-55'),
  -- Sony Bravia 7 65"
  ('bbbbbbca-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111', 19990, 'https://www.elgiganten.se/bravia-7-65'),
  ('bbbbbbca-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '22222222-2222-2222-2222-222222222222', 19990, 'https://www.mediamarkt.se/bravia-7-65'),
  ('bbbbbbca-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '33333333-3333-3333-3333-333333333333', 19490, 'https://www.netonnet.se/bravia-7-65'),
  ('bbbbbbca-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '44444444-4444-4444-4444-444444444444', 19290, 'https://www.komplett.se/bravia-7-65');
