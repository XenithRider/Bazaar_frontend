import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Layout from './components/layout/Layout'
import Loader from './components/common/Loader'

// Pages
import LoginPage       from './pages/auth/LoginPage'
import RegisterPage    from './pages/auth/RegisterPage'
import HomePage        from './pages/HomePage'
import MarketplacePage from './pages/MarketplacePage'
import CartPage        from './pages/CartPage'
import OrdersPage      from './pages/OrdersPage'
import UserDashboard   from './pages/user/UserDashboard'
import SellerDashboard from './pages/seller/SellerDashboard'
import ManageProducts  from './pages/seller/ManageProducts'
import AdminDashboard  from './pages/admin/AdminDashboard'

// ── Guards ────────────────────────────────────────────────────────────────────

function PrivateRoute({ roles }) {
  const { user, loading, role } = useAuth()

  if (loading) return <Loader />

  if (!user) return <Navigate to="/login" replace />

  if (roles && roles.length > 0 && !roles.includes(role)) {
    if (role === 'ROLE_ADMIN')  return <Navigate to="/admin/dashboard"  replace />
    if (role === 'ROLE_SELLER') return <Navigate to="/seller/dashboard" replace />
    return <Navigate to="/marketplace" replace />
  }

  return <Outlet />
}

function PublicOnly() {
  const { user, loading, role } = useAuth()
  if (loading) return <Loader />
  if (user) {
    if (role === 'ROLE_ADMIN')  return <Navigate to="/admin/dashboard"  replace />
    if (role === 'ROLE_SELLER') return <Navigate to="/seller/dashboard" replace />
    return <Navigate to="/marketplace" replace />
  }
  return <Outlet />
}

function WithLayout() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <Routes>

      {/* Auth pages - redirect if already logged in */}
      <Route element={<PublicOnly />}>
        <Route path="/login"    element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Public pages with layout */}
      <Route element={<WithLayout />}>
        <Route path="/"            element={<HomePage />} />
        <Route path="/marketplace" element={<MarketplacePage />} />
      </Route>

      {/* USER-only routes */}
      <Route element={<PrivateRoute roles={['ROLE_USER']} />}>
        <Route element={<WithLayout />}>
          <Route path="/cart"      element={<CartPage />} />
          <Route path="/orders"    element={<OrdersPage />} />
          <Route path="/dashboard" element={<UserDashboard />} />
        </Route>
      </Route>

      {/* SELLER-only routes */}
      <Route element={<PrivateRoute roles={['ROLE_SELLER']} />}>
        <Route element={<WithLayout />}>
          <Route path="/seller/dashboard" element={<SellerDashboard />} />
        </Route>
      </Route>

      {/* SELLER + ADMIN routes */}
      <Route element={<PrivateRoute roles={['ROLE_SELLER', 'ROLE_ADMIN']} />}>
        <Route element={<WithLayout />}>
          <Route path="/seller/products" element={<ManageProducts />} />
        </Route>
      </Route>

      {/* ADMIN-only routes */}
      <Route element={<PrivateRoute roles={['ROLE_ADMIN']} />}>
        <Route element={<WithLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  )
}