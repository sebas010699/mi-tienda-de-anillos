create table if not exists public.products (
  id text primary key,
  name text not null,
  description text not null default '',
  price_in_pesos integer not null check (price_in_pesos between 0 and 100000000),
  image text not null,
  category text not null check (category in ('animales', 'flores', 'minimalista', 'statement')),
  metal text not null check (metal in ('dorado', 'plateado')),
  tag text,
  stock integer not null default 0 check (stock >= 0),
  active boolean not null default true
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number bigint generated always as identity unique,
  status text not null default 'pending' check (status in ('pending', 'paid', 'cancelled')),
  total_in_pesos integer not null check (total_in_pesos >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id bigint generated always as identity primary key,
  order_id uuid not null references public.orders(id) on delete restrict,
  product_id text not null references public.products(id) on delete restrict,
  product_name text not null,
  unit_price_in_pesos integer not null check (unit_price_in_pesos >= 0),
  quantity integer not null check (quantity between 1 and 5)
);

alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

drop policy if exists "Public can view active products" on public.products;
create policy "Public can view active products"
  on public.products for select to anon, authenticated
  using (active or (auth.jwt() ->> 'email') = 'sebas010699@hotmail.com');

drop policy if exists "Administrator can insert products" on public.products;
create policy "Administrator can insert products"
  on public.products for insert to authenticated
  with check ((auth.jwt() ->> 'email') = 'sebas010699@hotmail.com');

drop policy if exists "Administrator can update products" on public.products;
create policy "Administrator can update products"
  on public.products for update to authenticated
  using ((auth.jwt() ->> 'email') = 'sebas010699@hotmail.com')
  with check ((auth.jwt() ->> 'email') = 'sebas010699@hotmail.com');

drop policy if exists "Administrator can view orders" on public.orders;
create policy "Administrator can view orders"
  on public.orders for select to authenticated
  using ((auth.jwt() ->> 'email') = 'sebas010699@hotmail.com');

drop policy if exists "Administrator can view order items" on public.order_items;
create policy "Administrator can view order items"
  on public.order_items for select to authenticated
  using ((auth.jwt() ->> 'email') = 'sebas010699@hotmail.com');

revoke all on public.products, public.orders, public.order_items from anon, authenticated;
grant select on public.products to anon, authenticated;
grant insert, update on public.products to authenticated;
grant select on public.orders, public.order_items to authenticated;

insert into public.products (id, name, description, price_in_pesos, image, category, metal, tag)
values
  ('anillo-oso', 'Anillo Oso', 'Un diseño dorado delicado para todos los días.', 89000, 'https://i.imgur.com/NfxWV06.png', 'animales', 'dorado', 'Más vendido'),
  ('anillo-lagarto', 'Anillo Lagarto', 'Líneas sutiles con un brillo que destaca.', 76000, 'https://img.kwcdn.com/product/fancy/50343a3e-9699-42a0-98a2-c8de4034d83a.jpg?imageView2/2/w/800/q/70/format/avif', 'animales', 'dorado', null),
  ('anillo-leopardo', 'Anillo Leopardo', 'Un diseño audaz, lleno de personalidad y estilo único.', 119000, 'https://img.kwcdn.com/product/open/9cb0d5208b424695af864db466370242-goods.jpeg?imageView2/2/w/800/q/70/format/avif', 'animales', 'dorado', 'Edición limitada'),
  ('anillo-retro-flores', 'Anillo Retro de Flores', 'Un acabado moderno y fácil de combinar.', 82000, 'https://img.kwcdn.com/product/open/252d780037b3465fb6fcbdf881a5cfa0-goods.jpeg?imageView2/2/w/800/q/70/format/avif', 'flores', 'dorado', null),
  ('anillo-margarita', 'Anillo de Margarita', 'Un diseño inspirado en la naturaleza.', 95000, 'https://img.kwcdn.com/product/fancy/185e214d-2bc9-417b-a426-71dd70dcab02.jpg?imageView2/2/w/800/q/70/format/avif', 'flores', 'plateado', 'Nuevo'),
  ('anillo-serpiente', 'Anillo Serpiente', 'Una serpiente envolvente que simboliza transformación.', 112000, '/images/products/serpiente.png', 'animales', 'dorado', 'Nuevo'),
  ('anillo-mariposa', 'Anillo Mariposa', 'Ligero y delicado, como un vuelo de primavera.', 69000, '/images/products/mariposa.png', 'animales', 'plateado', null),
  ('anillo-colibri', 'Anillo Colibrí', 'Detalles de esmalte verde inspirados en nuestras aves.', 129000, '/images/products/colibri.png', 'animales', 'dorado', 'Edición limitada'),
  ('anillo-buho', 'Anillo Búho', 'Plata envejecida con plumaje tallado a mano.', 98000, '/images/products/buho.png', 'animales', 'plateado', null),
  ('anillo-rosa-vintage', 'Anillo Rosa Vintage', 'Una rosa esculpida con alma de joya antigua.', 105000, '/images/products/rosa.png', 'flores', 'dorado', null),
  ('anillo-lirio', 'Anillo Lirio', 'Pétalos elegantes que abrazan tu dedo.', 79000, '/images/products/lirio.png', 'flores', 'plateado', null),
  ('anillo-girasol', 'Anillo Girasol', 'Un rayo de sol con centro texturizado.', 88000, '/images/products/girasol.png', 'flores', 'dorado', 'Más vendido'),
  ('anillo-tulipan', 'Anillo Tulipán', 'Plata minimalista con una piedra rosa sutil.', 72000, '/images/products/tulipan.png', 'flores', 'plateado', null),
  ('anillo-luna', 'Anillo Luna Creciente', 'Una media luna fina para usar sola o en capas.', 59000, '/images/products/luna.png', 'minimalista', 'plateado', null),
  ('anillo-infinito', 'Anillo Infinito', 'El símbolo del amor eterno en oro pulido.', 65000, '/images/products/infinito.png', 'minimalista', 'dorado', null),
  ('anillo-perla', 'Anillo Perla Solitaria', 'Una perla de agua dulce sobre un aro dorado.', 92000, '/images/products/perla.png', 'minimalista', 'dorado', 'Nuevo'),
  ('anillo-trenzado', 'Anillo Trenzado', 'Hilos de plata entrelazados con precisión.', 62000, '/images/products/trenzado.png', 'minimalista', 'plateado', null),
  ('anillo-sello-sol', 'Anillo Sello Sol', 'Un sello robusto grabado con un sol radiante.', 149000, '/images/products/sello.png', 'statement', 'dorado', null),
  ('anillo-esmeralda', 'Anillo Esmeralda Antiguo', 'Una piedra verde intensa en montura de inspiración antigua.', 179000, '/images/products/esmeralda.png', 'statement', 'dorado', 'Edición limitada'),
  ('anillo-ola', 'Anillo Ola Cósmica', 'Plata escultórica con un zafiro azul profundo.', 139000, '/images/products/ola.png', 'statement', 'plateado', null)
on conflict (id) do nothing;

create or replace function public.create_order(p_items jsonb)
returns table (order_id uuid, order_number bigint, total_in_pesos integer)
language plpgsql
security definer
set search_path = public
as $$
declare
  item record;
  new_order_id uuid;
  new_order_number bigint;
  calculated_total integer := 0;
  item_count integer;
begin
  if p_items is null or jsonb_typeof(p_items) <> 'array' then
    raise exception 'El pedido no tiene un formato válido.';
  end if;

  item_count := jsonb_array_length(p_items);
  if item_count < 1 or item_count > 15 then
    raise exception 'El pedido debe incluir entre 1 y 15 piezas.';
  end if;

  if exists (
    select 1
    from jsonb_array_elements(p_items) as entry(value)
    where jsonb_typeof(value -> 'id') <> 'string'
       or coalesce(value ->> 'id', '') = ''
       or jsonb_typeof(value -> 'quantity') <> 'number'
       or coalesce(value ->> 'quantity', '') !~ '^[1-5]$'
  ) then
    raise exception 'El pedido contiene productos o cantidades inválidas.';
  end if;

  if (
    select count(distinct value ->> 'id')
    from jsonb_array_elements(p_items) as entry(value)
  ) <> item_count then
    raise exception 'El pedido contiene productos duplicados.';
  end if;

  if (
    select sum((value ->> 'quantity')::integer)
    from jsonb_array_elements(p_items) as entry(value)
  ) > 15 then
    raise exception 'El pedido no puede superar 15 piezas.';
  end if;

  if (
    select count(*)
    from jsonb_to_recordset(p_items) as requested(id text, quantity integer)
    join public.products as product on product.id = requested.id and product.active
  ) <> item_count then
    raise exception 'Uno o más productos ya no están disponibles.';
  end if;

  for item in
    select product.id, product.name, product.price_in_pesos, product.stock,
           requested.quantity
    from jsonb_to_recordset(p_items) as requested(id text, quantity integer)
    join public.products as product on product.id = requested.id and product.active
    order by product.id
    for update of product
  loop
    if item.stock < item.quantity then
      raise exception 'No hay inventario suficiente de %.', item.name;
    end if;
    calculated_total := calculated_total + item.price_in_pesos * item.quantity;
  end loop;

  insert into public.orders (total_in_pesos)
  values (calculated_total)
  returning id, orders.order_number into new_order_id, new_order_number;

  for item in
    select product.id, product.name, product.price_in_pesos, requested.quantity
    from jsonb_to_recordset(p_items) as requested(id text, quantity integer)
    join public.products as product on product.id = requested.id and product.active
    order by product.id
  loop
    update public.products
    set stock = stock - item.quantity
    where id = item.id;

    insert into public.order_items (
      order_id, product_id, product_name, unit_price_in_pesos, quantity
    )
    values (
      new_order_id, item.id, item.name, item.price_in_pesos, item.quantity
    );
  end loop;

  return query select new_order_id, new_order_number, calculated_total;
end;
$$;

create or replace function public.set_order_status(p_order_id uuid, p_status text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  order_line record;
begin
  if (auth.jwt() ->> 'email') is distinct from 'sebas010699@hotmail.com' then
    raise exception 'No tienes permiso para modificar pedidos.';
  end if;

  if p_status not in ('paid', 'cancelled') then
    raise exception 'El estado solicitado no es válido.';
  end if;

  update public.orders
  set status = p_status, updated_at = now()
  where id = p_order_id and status = 'pending';

  if not found then
    raise exception 'El pedido ya no está pendiente o no existe.';
  end if;

  if p_status = 'cancelled' then
    for order_line in
      select product_id, quantity
      from public.order_items
      where order_id = p_order_id
    loop
      update public.products
      set stock = stock + order_line.quantity
      where id = order_line.product_id;
    end loop;
  end if;
end;
$$;

revoke all on function public.create_order(jsonb) from public;
revoke all on function public.set_order_status(uuid, text) from public;
grant execute on function public.create_order(jsonb) to anon, authenticated;
grant execute on function public.set_order_status(uuid, text) to authenticated;
