-- Migration: price_history table + 30 days of seed data
-- Run this in the Supabase SQL editor

create table price_history (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  supplier_id uuid references suppliers(id) on delete cascade,
  price numeric(10,2) not null,
  currency text not null default 'SEK',
  recorded_at timestamptz not null
);

create index price_history_product_id_idx on price_history(product_id);
create index price_history_recorded_at_idx on price_history(recorded_at);

-- Seed 30 days of price history for every product/supplier combination.
-- Prices fluctuate ±8% around the current price with a slight downward trend
-- to make the chart interesting.
insert into price_history (product_id, supplier_id, price, recorded_at)
select
  p.product_id,
  p.supplier_id,
  round(
    (p.price * (
      -- gentle downward drift over 30 days + daily noise
      (1.04 - 0.0013 * day.n) + (sin(day.n * 2.3 + p.price) * 0.03)
    ))::numeric,
    -1   -- round to nearest 10 SEK for realism
  ),
  now() - interval '1 day' * (29 - day.n)
from prices p
cross join generate_series(0, 29) as day(n);
