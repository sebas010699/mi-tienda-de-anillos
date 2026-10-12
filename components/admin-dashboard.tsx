'use client'

import Link from 'next/link'
import { useCallback, useEffect, useState, type FormEvent } from 'react'

import { ADMIN_EMAIL } from '@/lib/store-config'
import {
  CATEGORIES,
  METALS,
  formatPrice,
  type Category,
  type Metal,
  type Product,
} from '@/lib/products'
import { getSupabaseClient } from '@/lib/supabase'

type AdminProduct = Product & { stock: number; active: boolean }
type OrderStatus = 'pending' | 'paid' | 'cancelled'

interface AdminOrder {
  id: string
  order_number: number
  status: OrderStatus
  total_in_pesos: number
  created_at: string
  order_items: {
    product_name: string
    unit_price_in_pesos: number
    quantity: number
  }[]
}

const dateFormatter = new Intl.DateTimeFormat('es-CO', {
  dateStyle: 'medium',
  timeStyle: 'short',
})

function ProductEditor({
  product,
  busy,
  onSave,
}: {
  product: AdminProduct
  busy: boolean
  onSave: (product: AdminProduct) => Promise<void>
}) {
  const [draft, setDraft] = useState(product)

  useEffect(() => setDraft(product), [product])

  function update<K extends keyof AdminProduct>(key: K, value: AdminProduct[K]) {
    setDraft((current) => ({ ...current, [key]: value }))
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    await onSave(draft)
  }

  return (
    <details className="border border-line bg-paper">
      <summary className="flex cursor-pointer flex-wrap items-center justify-between gap-3 px-4 py-4 text-sm">
        <span className="font-medium text-ink">{product.name}</span>
        <span className="text-muted">
          {formatPrice(product.priceInPesos)} · {product.stock} unidades ·{' '}
          {product.active ? 'Publicado' : 'Oculto'}
        </span>
      </summary>
      <form onSubmit={submit} className="grid gap-4 border-t border-line p-4 md:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-xs text-muted">
          Nombre
          <input required value={draft.name} onChange={(event) => update('name', event.target.value)} className="border border-line bg-white px-3 py-2 text-sm text-ink" />
        </label>
        <label className="flex flex-col gap-1.5 text-xs text-muted">
          Precio (COP)
          <input required type="number" min="0" max="100000000" step="1" value={draft.priceInPesos} onChange={(event) => update('priceInPesos', Number(event.target.value))} className="border border-line bg-white px-3 py-2 text-sm text-ink" />
        </label>
        <label className="flex flex-col gap-1.5 text-xs text-muted">
          Unidades disponibles
          <input required type="number" min="0" step="1" value={draft.stock} onChange={(event) => update('stock', Number(event.target.value))} className="border border-line bg-white px-3 py-2 text-sm text-ink" />
        </label>
        <label className="flex flex-col gap-1.5 text-xs text-muted">
          Categoría
          <select value={draft.category} onChange={(event) => update('category', event.target.value as Category)} className="border border-line bg-white px-3 py-2 text-sm text-ink">
            {CATEGORIES.map((category) => <option key={category.value} value={category.value}>{category.label}</option>)}
          </select>
        </label>
        <label className="flex flex-col gap-1.5 text-xs text-muted">
          Metal
          <select value={draft.metal} onChange={(event) => update('metal', event.target.value as Metal)} className="border border-line bg-white px-3 py-2 text-sm text-ink">
            {METALS.map((metal) => <option key={metal.value} value={metal.value}>{metal.label}</option>)}
          </select>
        </label>
        <label className="flex flex-col gap-1.5 text-xs text-muted">
          Etiqueta
          <input value={draft.tag ?? ''} onChange={(event) => update('tag', event.target.value)} className="border border-line bg-white px-3 py-2 text-sm text-ink" />
        </label>
        <label className="flex flex-col gap-1.5 text-xs text-muted md:col-span-2">
          Descripción
          <textarea required rows={2} value={draft.description} onChange={(event) => update('description', event.target.value)} className="border border-line bg-white px-3 py-2 text-sm text-ink" />
        </label>
        <label className="flex flex-col gap-1.5 text-xs text-muted md:col-span-2">
          URL de imagen
          <input required type="text" value={draft.image} onChange={(event) => update('image', event.target.value)} className="border border-line bg-white px-3 py-2 text-sm text-ink" />
        </label>
        <label className="flex items-center gap-2 text-sm text-ink">
          <input type="checkbox" checked={draft.active} onChange={(event) => update('active', event.target.checked)} />
          Mostrar en la tienda
        </label>
        <div className="md:col-span-2">
          <button disabled={busy} className="bg-forest px-5 py-3 text-xs tracking-[0.14em] text-paper uppercase disabled:opacity-50">
            {busy ? 'Guardando...' : 'Guardar cambios'}
          </button>
        </div>
      </form>
    </details>
  )
}

export function AdminDashboard() {
  const [sessionState, setSessionState] = useState<'loading' | 'signed-out' | 'authorized'>('loading')
  const [email, setEmail] = useState(ADMIN_EMAIL)
  const [password, setPassword] = useState('')
  const [products, setProducts] = useState<AdminProduct[]>([])
  const [orders, setOrders] = useState<AdminOrder[]>([])
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const [busyId, setBusyId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const loadDashboard = useCallback(async () => {
    const client = getSupabaseClient()
    if (!client) throw new Error('Falta configurar la conexión con Supabase.')
    const [productResult, orderResult] = await Promise.all([
      client
        .from('products')
        .select('id, name, description, price_in_pesos, image, category, metal, tag, stock, active')
        .order('name'),
      client
        .from('orders')
        .select('id, order_number, status, total_in_pesos, created_at, order_items(product_name, unit_price_in_pesos, quantity)')
        .order('created_at', { ascending: false })
        .limit(100),
    ])
    if (productResult.error) throw new Error(productResult.error.message)
    if (orderResult.error) throw new Error(orderResult.error.message)

    setProducts(productResult.data.map((row) => ({
      id: row.id,
      name: row.name,
      description: row.description,
      priceInPesos: row.price_in_pesos,
      image: row.image,
      category: row.category,
      metal: row.metal,
      tag: row.tag ?? undefined,
      stock: row.stock,
      active: row.active,
    })))
    setOrders(orderResult.data.map((row) => ({
      ...row,
      status: row.status as OrderStatus,
      order_items: row.order_items ?? [],
    })))
  }, [])

  useEffect(() => {
    const client = getSupabaseClient()
    if (!client) {
      setErrorMessage('Configura NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY para habilitar el panel.')
      setSessionState('signed-out')
      return
    }

    let isMounted = true
    void client.auth.getUser().then(async ({ data, error }) => {
      if (!isMounted) return
      if (error) {
        setErrorMessage(error.message)
        setSessionState('signed-out')
        return
      }
      if (!data.user) {
        setSessionState('signed-out')
        return
      }
      if (data.user.email?.toLowerCase() !== ADMIN_EMAIL) {
        await client.auth.signOut()
        if (isMounted) {
          setErrorMessage('Esta cuenta no tiene permiso para entrar al panel.')
          setSessionState('signed-out')
        }
        return
      }

      setSessionState('authorized')
      setIsLoading(true)
      try {
        await loadDashboard()
      } catch (error) {
        if (isMounted) setErrorMessage(error instanceof Error ? error.message : 'No se pudo cargar el panel.')
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }).catch((error: unknown) => {
      if (isMounted) {
        setErrorMessage(error instanceof Error ? error.message : 'No se pudo verificar la sesión.')
        setSessionState('signed-out')
      }
    })

    return () => {
      isMounted = false
    }
  }, [loadDashboard])

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrorMessage(null)
    setNotice(null)
    const client = getSupabaseClient()
    if (!client) {
      setErrorMessage('Falta configurar la conexión con Supabase.')
      return
    }

    setIsLoading(true)
    try {
      const { data, error } = await client.auth.signInWithPassword({ email: email.trim(), password })
      if (error) throw new Error(error.message)
      if (data.user.email?.toLowerCase() !== ADMIN_EMAIL) {
        await client.auth.signOut()
        throw new Error('Esta cuenta no tiene permiso para entrar al panel.')
      }

      setSessionState('authorized')
      setPassword('')
      await loadDashboard()
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'No se pudo cargar el panel.')
      setSessionState('signed-out')
    } finally {
      setIsLoading(false)
    }
  }

  async function saveProduct(product: AdminProduct) {
    const client = getSupabaseClient()
    if (!client) return
    setBusyId(product.id)
    setErrorMessage(null)
    setNotice(null)
    try {
      const { error } = await client
        .from('products')
        .update({
          name: product.name.trim(),
          description: product.description.trim(),
          price_in_pesos: product.priceInPesos,
          image: product.image.trim(),
          category: product.category,
          metal: product.metal,
          tag: product.tag?.trim() || null,
          stock: product.stock,
          active: product.active,
        })
        .eq('id', product.id)
      if (error) throw new Error(error.message)

      setNotice(`Se guardaron los cambios de ${product.name}.`)
      try {
        await loadDashboard()
      } catch (loadError) {
        setErrorMessage(loadError instanceof Error ? loadError.message : 'No se pudo actualizar el panel.')
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'No se pudieron guardar los cambios.')
    } finally {
      setBusyId(null)
    }
  }

  async function changeOrderStatus(orderId: string, status: Exclude<OrderStatus, 'pending'>) {
    const client = getSupabaseClient()
    if (!client) return
    setBusyId(orderId)
    setErrorMessage(null)
    setNotice(null)
    try {
      const { error } = await client.rpc('set_order_status', {
        p_order_id: orderId,
        p_status: status,
      })
      if (error) throw new Error(error.message)

      setNotice(status === 'paid' ? 'Pedido marcado como pagado.' : 'Pedido cancelado; las unidades regresaron al inventario.')
      try {
        await loadDashboard()
      } catch (loadError) {
        setErrorMessage(loadError instanceof Error ? loadError.message : 'No se pudo actualizar el panel.')
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'No se pudo actualizar el pedido.')
    } finally {
      setBusyId(null)
    }
  }

  async function signOut() {
    const client = getSupabaseClient()
    if (!client) return
    try {
      const { error } = await client.auth.signOut()
      if (error) throw new Error(error.message)
      setSessionState('signed-out')
      setProducts([])
      setOrders([])
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'No se pudo cerrar la sesión.')
    }
  }

  return (
    <main className="min-h-screen bg-ivory px-5 py-8 text-ink md:px-8 md:py-12">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="text-xs tracking-[0.16em] text-muted uppercase hover:text-gold">
          ← Volver a la tienda
        </Link>
        <header className="mt-8 flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
          <div>
            <p className="text-[11px] tracking-[0.24em] text-gold uppercase">Juli y Sebas</p>
            <h1 className="mt-2 font-serif text-4xl md:text-5xl">Administración</h1>
          </div>
          {sessionState === 'authorized' && (
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsLoading(true)
                  void loadDashboard().catch((error: unknown) => setErrorMessage(error instanceof Error ? error.message : 'No se pudo actualizar el panel.')).finally(() => setIsLoading(false))
                }}
                disabled={isLoading}
                className="border border-line px-4 py-3 text-xs uppercase disabled:opacity-50"
              >
                Actualizar
              </button>
              <button type="button" onClick={signOut} className="border border-line px-4 py-3 text-xs uppercase">
                Cerrar sesión
              </button>
            </div>
          )}
        </header>

        {errorMessage && <p role="alert" className="mt-5 border border-red-200 bg-white p-4 text-sm text-red-800">{errorMessage}</p>}
        {notice && <p role="status" className="mt-5 border border-line bg-white p-4 text-sm text-forest">{notice}</p>}

        {sessionState === 'loading' ? (
          <p className="py-12 text-sm text-muted">Verificando la sesión...</p>
        ) : sessionState === 'signed-out' ? (
          <form onSubmit={signIn} className="mx-auto mt-12 max-w-md border border-line bg-paper p-6 md:p-8">
            <h2 className="font-serif text-2xl">Iniciar sesión</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Acceso exclusivo para la cuenta administradora autorizada.
            </p>
            <label className="mt-6 flex flex-col gap-2 text-xs text-muted">
              Correo
              <input type="email" required autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} className="border border-line bg-white px-3 py-3 text-sm text-ink" />
            </label>
            <label className="mt-4 flex flex-col gap-2 text-xs text-muted">
              Contraseña
              <input type="password" required autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} className="border border-line bg-white px-3 py-3 text-sm text-ink" />
            </label>
            <button disabled={isLoading} className="mt-6 w-full bg-forest px-5 py-4 text-xs tracking-[0.16em] text-paper uppercase disabled:opacity-50">
              {isLoading ? 'Verificando...' : 'Entrar'}
            </button>
          </form>
        ) : (
          <div className="mt-10 space-y-14">
            <section>
              <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h2 className="font-serif text-3xl">Inventario</h2>
                  <p className="mt-1 text-sm text-muted">Unidades disponibles, precios y productos publicados.</p>
                </div>
                <p className="text-sm text-muted">{products.length} diseños</p>
              </div>
              {isLoading && products.length === 0 ? (
                <p className="py-8 text-sm text-muted">Cargando inventario...</p>
              ) : (
                <div className="space-y-3">
                  {products.map((product) => (
                    <ProductEditor
                      key={product.id}
                      product={product}
                      busy={busyId === product.id}
                      onSave={saveProduct}
                    />
                  ))}
                </div>
              )}
            </section>

            <section>
              <div className="mb-5">
                <h2 className="font-serif text-3xl">Registro de pedidos</h2>
                <p className="mt-1 text-sm text-muted">Los pedidos pendientes reservan stock hasta confirmarlos o cancelarlos.</p>
              </div>
              {orders.length === 0 ? (
                <p className="border border-line bg-paper p-5 text-sm text-muted">Todavía no hay pedidos registrados.</p>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <article key={order.id} className="border border-line bg-paper p-5">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <h3 className="font-serif text-xl">Pedido #{order.order_number}</h3>
                          <p className="mt-1 text-xs text-muted">{dateFormatter.format(new Date(order.created_at))}</p>
                          <p className="mt-2 text-sm font-medium">{formatPrice(order.total_in_pesos)}</p>
                        </div>
                        <span className={`px-3 py-1.5 text-xs uppercase ${order.status === 'paid' ? 'bg-green-100 text-green-900' : order.status === 'cancelled' ? 'bg-gray-100 text-gray-700' : 'bg-amber-100 text-amber-900'}`}>
                          {order.status === 'paid' ? 'Pagado' : order.status === 'cancelled' ? 'Cancelado' : 'Pendiente'}
                        </span>
                      </div>
                      <ul className="mt-4 space-y-1 border-t border-line pt-3 text-sm text-muted">
                        {order.order_items.map((item, index) => (
                          <li key={`${order.id}-${index}`}>{item.quantity} × {item.product_name} — {formatPrice(item.unit_price_in_pesos)}</li>
                        ))}
                      </ul>
                      {order.status === 'pending' && (
                        <div className="mt-4 flex flex-wrap gap-3">
                          <button
                            type="button"
                            onClick={() => void changeOrderStatus(order.id, 'paid')}
                            disabled={busyId === order.id}
                            className="bg-forest px-4 py-3 text-xs text-paper uppercase disabled:opacity-50"
                          >
                            Marcar pagado
                          </button>
                          <button
                            type="button"
                            onClick={() => void changeOrderStatus(order.id, 'cancelled')}
                            disabled={busyId === order.id}
                            className="border border-line px-4 py-3 text-xs uppercase disabled:opacity-50"
                          >
                            Cancelar y devolver stock
                          </button>
                        </div>
                      )}
                    </article>
                  ))}
                </div>
              )}
            </section>
          </div>
        )}
      </div>
    </main>
  )
}
