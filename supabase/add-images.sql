-- Migration: add placeholder image URLs to existing products
-- Run this if you already populated the DB with seed.sql
-- These use placehold.co for demonstration; replace with real images later.

update products set image_url = 'https://placehold.co/600x600/1d1d1f/f5f5f7?text=MacBook+Air+M3'       where id = 'bbbbbbb1-bbbb-bbbb-bbbb-bbbbbbbbbbbb';
update products set image_url = 'https://placehold.co/600x600/1d1d1f/f5f5f7?text=MacBook+Pro+M4'       where id = 'bbbbbbb2-bbbb-bbbb-bbbb-bbbbbbbbbbbb';
update products set image_url = 'https://placehold.co/600x600/007db8/ffffff?text=Dell+XPS+15'          where id = 'bbbbbbb3-bbbb-bbbb-bbbb-bbbbbbbbbbbb';
update products set image_url = 'https://placehold.co/600x600/e2231a/ffffff?text=ThinkPad+X1'          where id = 'bbbbbbb4-bbbb-bbbb-bbbb-bbbbbbbbbbbb';
update products set image_url = 'https://placehold.co/600x600/00539b/ffffff?text=ZenBook+14'           where id = 'bbbbbbb5-bbbb-bbbb-bbbb-bbbbbbbbbbbb';
update products set image_url = 'https://placehold.co/600x600/1d1d1f/f5f5f7?text=iPhone+16'           where id = 'bbbbbbb6-bbbb-bbbb-bbbb-bbbbbbbbbbbb';
update products set image_url = 'https://placehold.co/600x600/1d1d1f/f5f5f7?text=iPhone+16+Pro'       where id = 'bbbbbbb7-bbbb-bbbb-bbbb-bbbbbbbbbbbb';
update products set image_url = 'https://placehold.co/600x600/1428a0/ffffff?text=Galaxy+S25'          where id = 'bbbbbbb8-bbbb-bbbb-bbbb-bbbbbbbbbbbb';
update products set image_url = 'https://placehold.co/600x600/1428a0/ffffff?text=Galaxy+S25+Ultra'    where id = 'bbbbbbb9-bbbb-bbbb-bbbb-bbbbbbbbbbbb';
update products set image_url = 'https://placehold.co/600x600/4285f4/ffffff?text=Pixel+9'             where id = 'bbbbbbc1-bbbb-bbbb-bbbb-bbbbbbbbbbbb';
update products set image_url = 'https://placehold.co/600x600/000000/ffffff?text=WH-1000XM5'          where id = 'bbbbbbc2-bbbb-bbbb-bbbb-bbbbbbbbbbbb';
update products set image_url = 'https://placehold.co/600x600/1d1d1f/f5f5f7?text=AirPods+Pro+2'      where id = 'bbbbbbc3-bbbb-bbbb-bbbb-bbbbbbbbbbbb';
update products set image_url = 'https://placehold.co/600x600/2c2c2c/ffffff?text=QC45'                where id = 'bbbbbbc4-bbbb-bbbb-bbbb-bbbbbbbbbbbb';
update products set image_url = 'https://placehold.co/600x600/1428a0/ffffff?text=Buds3+Pro'           where id = 'bbbbbbc5-bbbb-bbbb-bbbb-bbbbbbbbbbbb';
update products set image_url = 'https://placehold.co/600x600/1d1d1f/f5f5f7?text=iPad+Air+13'        where id = 'bbbbbbc6-bbbb-bbbb-bbbb-bbbbbbbbbbbb';
update products set image_url = 'https://placehold.co/600x600/1428a0/ffffff?text=Tab+S10+'           where id = 'bbbbbbc7-bbbb-bbbb-bbbb-bbbbbbbbbbbb';
update products set image_url = 'https://placehold.co/600x600/1428a0/ffffff?text=QE65S95D'           where id = 'bbbbbbc8-bbbb-bbbb-bbbb-bbbbbbbbbbbb';
update products set image_url = 'https://placehold.co/600x600/a50034/ffffff?text=LG+C4+55'           where id = 'bbbbbbc9-bbbb-bbbb-bbbb-bbbbbbbbbbbb';
update products set image_url = 'https://placehold.co/600x600/000000/ffffff?text=Bravia+7+65'        where id = 'bbbbbbca-bbbb-bbbb-bbbb-bbbbbbbbbbbb';
