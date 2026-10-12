import type { Metadata } from 'next'

import { AdminDashboard } from '@/components/admin-dashboard'

export const metadata: Metadata = {
  title: 'Administración | Juli y Sebas',
}

export default function AdminPage() {
  return <AdminDashboard />
}
