# Juli y Sebas

Tienda en línea de accesorios con una selección de anillos favoritos. Explora los diseños y haz tu pedido por WhatsApp.

## Desarrollo local

```sh
pnpm install
pnpm dev
```

## Publicación

Cada cambio en `main` se compila y publica automáticamente en GitHub Pages desde GitHub Actions. La exportación estática incluye la ruta del repositorio para que funcionen los recursos y enlaces en:

<https://sebas010699.github.io/mi-tienda-de-anillos./>

GitHub Pages sirve contenido estático, por lo que el checkout confirma pedidos por WhatsApp. El pago con Stripe requiere un servidor y no está disponible en esta publicación estática.
