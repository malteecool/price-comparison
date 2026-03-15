-- Migration: add specs jsonb column + populate all products
-- Run this after schema.sql + seed.sql (or add-images.sql)

alter table products add column if not exists specs jsonb;

-- Laptops
update products set specs = json_build_object(
  'display_size', '13.6"', 'resolution', '2560×1664', 'cpu', 'Apple M3',
  'gpu', '10-core GPU', 'ram', '8 GB', 'storage', '256 GB SSD',
  'battery', '52,6 Wh', 'os', 'macOS Sonoma', 'weight', '1,24 kg'
)::jsonb where id = 'bbbbbbb1-bbbb-bbbb-bbbb-bbbbbbbbbbbb';

update products set specs = json_build_object(
  'display_size', '14.2"', 'resolution', '3024×1964', 'cpu', 'Apple M4 Pro',
  'gpu', '20-core GPU', 'ram', '24 GB', 'storage', '512 GB SSD',
  'battery', '72,4 Wh', 'os', 'macOS Sonoma', 'weight', '1,62 kg'
)::jsonb where id = 'bbbbbbb2-bbbb-bbbb-bbbb-bbbbbbbbbbbb';

update products set specs = json_build_object(
  'display_size', '15.6"', 'resolution', '3456×2160', 'cpu', 'Intel Core i7-13700H',
  'gpu', 'NVIDIA RTX 4060', 'ram', '16 GB', 'storage', '512 GB SSD',
  'battery', '86 Wh', 'os', 'Windows 11', 'weight', '1,86 kg'
)::jsonb where id = 'bbbbbbb3-bbbb-bbbb-bbbb-bbbbbbbbbbbb';

update products set specs = json_build_object(
  'display_size', '14"', 'resolution', '1920×1200', 'cpu', 'Intel Core Ultra 7 165U',
  'gpu', 'Intel Arc Graphics', 'ram', '16 GB', 'storage', '512 GB SSD',
  'battery', '57 Wh', 'os', 'Windows 11 Pro', 'weight', '1,12 kg'
)::jsonb where id = 'bbbbbbb4-bbbb-bbbb-bbbb-bbbbbbbbbbbb';

update products set specs = json_build_object(
  'display_size', '14"', 'resolution', '2880×1800', 'cpu', 'AMD Ryzen 7 7745HX',
  'gpu', 'AMD Radeon 780M', 'ram', '16 GB', 'storage', '512 GB SSD',
  'battery', '75 Wh', 'os', 'Windows 11', 'weight', '1,39 kg'
)::jsonb where id = 'bbbbbbb5-bbbb-bbbb-bbbb-bbbbbbbbbbbb';

-- Smartphones
update products set specs = json_build_object(
  'display_size', '6.1"', 'resolution', '2556×1179', 'cpu', 'Apple A18',
  'ram', '8 GB', 'storage', '128 GB', 'camera', '48 MP + 12 MP',
  'battery', '3 561 mAh', '5g', 'Ja', 'os', 'iOS 18'
)::jsonb where id = 'bbbbbbb6-bbbb-bbbb-bbbb-bbbbbbbbbbbb';

update products set specs = json_build_object(
  'display_size', '6.3"', 'resolution', '2622×1206', 'cpu', 'Apple A18 Pro',
  'ram', '8 GB', 'storage', '256 GB', 'camera', '48 MP + 12 MP + 12 MP',
  'battery', '3 582 mAh', '5g', 'Ja', 'os', 'iOS 18'
)::jsonb where id = 'bbbbbbb7-bbbb-bbbb-bbbb-bbbbbbbbbbbb';

update products set specs = json_build_object(
  'display_size', '6.2"', 'resolution', '2340×1080', 'cpu', 'Snapdragon 8 Elite',
  'ram', '12 GB', 'storage', '256 GB', 'camera', '50 MP + 10 MP + 12 MP',
  'battery', '4 000 mAh', '5g', 'Ja', 'os', 'Android 15'
)::jsonb where id = 'bbbbbbb8-bbbb-bbbb-bbbb-bbbbbbbbbbbb';

update products set specs = json_build_object(
  'display_size', '6.9"', 'resolution', '3088×1440', 'cpu', 'Snapdragon 8 Elite',
  'ram', '12 GB', 'storage', '512 GB', 'camera', '200 MP + 50 MP + 10 MP + 12 MP',
  'battery', '5 000 mAh', '5g', 'Ja', 'os', 'Android 15'
)::jsonb where id = 'bbbbbbb9-bbbb-bbbb-bbbb-bbbbbbbbbbbb';

update products set specs = json_build_object(
  'display_size', '6.3"', 'resolution', '2424×1080', 'cpu', 'Google Tensor G4',
  'ram', '12 GB', 'storage', '128 GB', 'camera', '50 MP + 48 MP',
  'battery', '4 700 mAh', '5g', 'Ja', 'os', 'Android 15'
)::jsonb where id = 'bbbbbbc1-bbbb-bbbb-bbbb-bbbbbbbbbbbb';

-- Headphones
update products set specs = json_build_object(
  'type', 'Over-ear', 'connectivity', 'Bluetooth 5.2', 'anc', 'Ja',
  'battery', '30 h', 'charging', 'USB-C', 'driver_size', '30 mm',
  'frequency', '4 Hz–40 kHz', 'weight', '250 g'
)::jsonb where id = 'bbbbbbc2-bbbb-bbbb-bbbb-bbbbbbbbbbbb';

update products set specs = json_build_object(
  'type', 'In-ear', 'connectivity', 'Bluetooth 5.3', 'anc', 'Ja',
  'battery', '6 h (30 h med case)', 'charging', 'MagSafe / USB-C',
  'chip', 'Apple H2', 'water_resistance', 'IPX4', 'weight', '5,3 g'
)::jsonb where id = 'bbbbbbc3-bbbb-bbbb-bbbb-bbbbbbbbbbbb';

update products set specs = json_build_object(
  'type', 'Over-ear', 'connectivity', 'Bluetooth 5.1', 'anc', 'Ja',
  'battery', '24 h', 'charging', 'USB-C', 'driver_size', '40 mm',
  'frequency', '20 Hz–20 kHz', 'weight', '238 g'
)::jsonb where id = 'bbbbbbc4-bbbb-bbbb-bbbb-bbbbbbbbbbbb';

update products set specs = json_build_object(
  'type', 'In-ear', 'connectivity', 'Bluetooth 5.4', 'anc', 'Ja',
  'battery', '6 h (30 h med case)', 'charging', 'USB-C / Qi',
  'driver_size', '10,5 mm', 'water_resistance', 'IPX7', 'weight', '5,5 g'
)::jsonb where id = 'bbbbbbc5-bbbb-bbbb-bbbb-bbbbbbbbbbbb';

-- Tablets
update products set specs = json_build_object(
  'display_size', '13"', 'resolution', '2732×2048', 'cpu', 'Apple M2',
  'ram', '8 GB', 'storage', '128 GB', 'battery', '36,59 Wh',
  'connectivity', 'Wi-Fi 6E', 'os', 'iPadOS 17', 'weight', '617 g'
)::jsonb where id = 'bbbbbbc6-bbbb-bbbb-bbbb-bbbbbbbbbbbb';

update products set specs = json_build_object(
  'display_size', '12.4"', 'resolution', '2800×1752', 'cpu', 'Snapdragon 8 Gen 3',
  'ram', '12 GB', 'storage', '256 GB', 'battery', '10 090 mAh',
  'connectivity', 'Wi-Fi 7', 'os', 'Android 14', 'weight', '581 g'
)::jsonb where id = 'bbbbbbc7-bbbb-bbbb-bbbb-bbbbbbbbbbbb';

-- TVs
update products set specs = json_build_object(
  'screen_size', '65"', 'panel_type', 'QD-OLED', 'resolution', '4K (3840×2160)',
  'refresh_rate', '144 Hz', 'hdr', 'HDR10+, HLG', 'hdmi_ports', '4× HDMI 2.1',
  'os', 'Tizen', 'smart_tv', 'Ja'
)::jsonb where id = 'bbbbbbc8-bbbb-bbbb-bbbb-bbbbbbbbbbbb';

update products set specs = json_build_object(
  'screen_size', '55"', 'panel_type', 'OLED evo', 'resolution', '4K (3840×2160)',
  'refresh_rate', '120 Hz', 'hdr', 'Dolby Vision, HDR10', 'hdmi_ports', '4× HDMI 2.1',
  'os', 'webOS 24', 'smart_tv', 'Ja'
)::jsonb where id = 'bbbbbbc9-bbbb-bbbb-bbbb-bbbbbbbbbbbb';

update products set specs = json_build_object(
  'screen_size', '65"', 'panel_type', 'Mini LED', 'resolution', '4K (3840×2160)',
  'refresh_rate', '120 Hz', 'hdr', 'Dolby Vision, HDR10+', 'hdmi_ports', '4× HDMI 2.1',
  'os', 'Google TV', 'smart_tv', 'Ja'
)::jsonb where id = 'bbbbbbca-bbbb-bbbb-bbbb-bbbbbbbbbbbb';
