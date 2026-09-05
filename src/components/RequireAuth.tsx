import { Navigate, useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useAuth } from '../context/AuthContext'

export function RequireAuth({
  children,
  requireProfile = true,
}: {
  children: ReactNode
  requireProfile?: boolean
}) {
  const { loading, user, profile, configured } = useAuth()
  const location = useLocation()

  if (!configured) {
    return <Navigate to="/" replace />
  }

  if (loading) {
    return (
      <div className="shell-status">
        <p>Loading…</p>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/" replace state={{ from: location.pathname }} />
  }

  if (requireProfile && !profile) {
    return <Navigate to="/setup" replace />
  }

  return children
}

export function RequireAdmin({ children }: { children: ReactNode }) {
  const { loading, profile, configured } = useAuth()

  if (!configured) return <Navigate to="/" replace />
  if (loading) {
    return (
      <div className="shell-status">
        <p>Loading…</p>
      </div>
    )
  }
  if (!profile?.is_admin) {
    return <Navigate to="/studio" replace />
  }
  return children
}
