-- Run in the Supabase SQL Editor. Each user's records are isolated by RLS.
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  business_name text not null default 'My business',
  currency text not null default 'USD',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table if not exists public.suppliers (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
  name text not null, email text not null, phone text not null default '', company text not null,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
  supplier_id uuid references public.suppliers(id) on delete set null,
  name text not null, sku text not null, category text not null, description text not null default '',
  price numeric(12,2) not null default 0 check (price >= 0), quantity integer not null default 0 check (quantity >= 0),
  threshold integer not null default 10 check (threshold >= 0), image text not null default '',
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
  unique(user_id,sku)
);
create table if not exists public.inventory_movements (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  type text not null check(type in ('Stock in','Stock out','Adjustment')),
  quantity integer not null check(quantity <> 0), notes text not null default '', created_at timestamptz not null default now()
);
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
  order_number text not null, customer text not null, email text not null default '', order_date date not null default current_date,
  total numeric(12,2) not null default 0 check(total >= 0),
  status text not null default 'Pending' check(status in ('Pending','Processing','Shipped','Delivered','Cancelled')),
  items integer not null default 0 check(items >= 0), created_at timestamptz not null default now(),
  unique(user_id,order_number)
);
create index if not exists products_user_name_idx on public.products(user_id,name);
create index if not exists products_user_category_idx on public.products(user_id,category);
create index if not exists products_user_stock_idx on public.products(user_id,quantity,threshold);
create index if not exists suppliers_user_company_idx on public.suppliers(user_id,company);
create index if not exists movements_user_created_idx on public.inventory_movements(user_id,created_at desc);
create index if not exists movements_product_created_idx on public.inventory_movements(product_id,created_at desc);
create index if not exists orders_user_date_idx on public.orders(user_id,order_date desc);

create or replace function public.stockflow_create_profile() returns trigger language plpgsql security definer set search_path=public as $$
begin insert into public.profiles(id,full_name) values(new.id,coalesce(new.raw_user_meta_data->>'full_name','')); return new; end; $$;
drop trigger if exists stockflow_auth_user_created on auth.users;
create trigger stockflow_auth_user_created after insert on auth.users for each row execute procedure public.stockflow_create_profile();

alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.suppliers enable row level security;
alter table public.inventory_movements enable row level security;
alter table public.orders enable row level security;
drop policy if exists "profiles own rows" on public.profiles;
create policy "profiles own rows" on public.profiles for all using(id=auth.uid()) with check(id=auth.uid());
drop policy if exists "products own rows" on public.products;
create policy "products own rows" on public.products for all using(user_id=auth.uid()) with check(user_id=auth.uid());
drop policy if exists "suppliers own rows" on public.suppliers;
create policy "suppliers own rows" on public.suppliers for all using(user_id=auth.uid()) with check(user_id=auth.uid());
drop policy if exists "movements own rows" on public.inventory_movements;
create policy "movements own rows" on public.inventory_movements for all using(user_id=auth.uid()) with check(user_id=auth.uid());
drop policy if exists "orders own rows" on public.orders;
create policy "orders own rows" on public.orders for all using(user_id=auth.uid()) with check(user_id=auth.uid());
grant usage on schema public to authenticated;
grant select,insert,update,delete on public.profiles,public.products,public.suppliers,public.inventory_movements,public.orders to authenticated;
