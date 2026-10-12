# Juli y Sebas

Tienda en línea de accesorios con una selección de anillos favoritos. Explora los diseños y haz tu pedido por WhatsApp.

## Desarrollo local

```sh
pnpm install
pnpm dev
```

## Publicación

En la primera publicación, selecciona **Settings → Pages → Build and deployment → Source → GitHub Actions** en el repositorio. Después, cada cambio en `main` se compila y publica automáticamente desde GitHub Actions. La exportación estática incluye la ruta del repositorio para que funcionen los recursos y enlaces en:

<https://sebas010699.github.io/mi-tienda-de-anillos./>

GitHub Pages sirve contenido estático, por lo que el checkout confirma pedidos por WhatsApp. El pago con Stripe requiere un servidor y no está disponible en esta publicación estática.

## Inventario y administración

La tienda usa Supabase para mostrar el inventario y registrar cada pedido antes de abrir WhatsApp. Los pedidos pendientes reservan stock; desde el panel puedes marcarlos pagados o cancelarlos. Al cancelar un pedido pendiente, sus unidades vuelven al inventario.

1. En el proyecto de Supabase, abre **SQL Editor**, pega y ejecuta `supabase/migrations/20260717000000_inventory_orders.sql`.
2. En **Authentication → Users**, crea una cuenta para `sebas010699@hotmail.com` y define su contraseña.
3. En el repositorio de GitHub, abre **Settings → Secrets and variables → Actions → Variables** y crea estas variables con los valores de **Supabase → Project Settings → API**:
   - `NEXT_PUBLIC_SUPABASE_URL`: URL del proyecto.
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`: clave publicable (`sb_publishable_...`).
4. Para desarrollo local, copia esos dos valores a `.env.local` con los mismos nombres (puedes partir de `.env.example`). Reinicia `pnpm dev` después de cambiarlos.
5. Abre `/admin/` en el sitio e inicia sesión. Desde allí puedes modificar productos, precios, inventario y ver pedidos; cancelar uno pendiente devuelve sus unidades.

La clave publishable está diseñada para usarse en el navegador. **No** configures una clave `secret` ni `service_role` en el sitio, en GitHub Pages o en variables `NEXT_PUBLIC_*`. Los permisos de inventario y pedidos se aplican mediante RLS y funciones SQL; solamente la cuenta administradora indicada puede operar el panel.
