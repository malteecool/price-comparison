-- Run this in the Supabase SQL editor to set up the schema

create table suppliers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo_url text,
  website_url text
);

create table categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique
);

create table products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  brand text,
  category_id uuid references categories(id),
  ean text,
  description text,
  image_url text,
  specs jsonb
);

create table prices (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  supplier_id uuid references suppliers(id) on delete cascade,
  price numeric(10,2) not null,
  currency text not null default 'SEK',
  url text,
  updated_at timestamptz not null default now()
);

-- Useful index for the most common query: all prices for a product
create index prices_product_id_idx on prices(product_id);

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
