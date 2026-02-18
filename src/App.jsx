import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Layout from './components/layout/Layout'
import Loader from './components/common/Loader'

// Pages
import LoginPage      from './pages/auth/LoginPage'
import RegisterPage   from './pages/auth/RegisterPage'
import HomePage       from './pages/HomePage'
import MarketplacePage from './pages/MarketplacePage'
import CartPage       from './pages/CartPage'
import OrdersPage     from './pages/OrdersPage'
import UserDashboard  from './pages/user/UserDashboard'
import SellerDashboard from './pages/seller/SellerDashboard'
import ManageProducts  from './pages/seller/ManageProducts'
import AdminDashboard  from './pages/admin/AdminDashboard'

// Route guards
function PrivateRoute({ children, roles }) {
  const { user, loading, role } = useAuth()
  if (loading) return <Loader/>
  if (!user)   return <Navigate to="/login" replace/>
  if (roles && !roles.includes(role)) return <Navigate to="/" replace/>
  return children
}

function PublicOnly({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <Loader/>
  if (user)    return <Navigate to="/marketplace" replace/>
  return children
}

export default function App() {
  return (
    <Routes>
      {/* Public auth */}
      <Route path="/login"    element={<PublicOnly><LoginPage/></PublicOnly>}/>
      <Route path="/register" element={<PublicOnly><RegisterPage/></PublicOnly>}/>

      {/* Home page (public) */}
      <Route path="/" element={<Layout><HomePage/></Layout>}/>

      {/* Marketplace (public) */}
      <Route path="/marketplace" element={<Layout><MarketplacePage/></Layout>}/>

      {/* User routes */}
      <Route path="/cart" element={
        <PrivateRoute roles={['ROLE_USER']}>
          <Layout><CartPage/></Layout>
        </PrivateRoute>}/>

      <Route path="/orders" element={
        <PrivateRoute roles={['ROLE_USER']}>
          <Layout><OrdersPage/></Layout>
        </PrivateRoute>}/>

      <Route path="/dashboard" element={
        <PrivateRoute roles={['ROLE_USER']}>
          <Layout><UserDashboard/></Layout>
        </PrivateRoute>}/>

      {/* Seller routes */}
      <Route path="/seller/dashboard" element={
        <PrivateRoute roles={['ROLE_SELLER']}>
          <Layout><SellerDashboard/></Layout>
        </PrivateRoute>}/>

      <Route path="/seller/products" element={
        <PrivateRoute roles={['ROLE_SELLER','ROLE_ADMIN']}>
          <Layout><ManageProducts/></Layout>
        </PrivateRoute>}/>

      {/* Admin routes */}
      <Route path="/admin/dashboard" element={
        <PrivateRoute roles={['ROLE_ADMIN']}>
          <Layout><AdminDashboard/></Layout>
        </PrivateRoute>}/>

      <Route path="*" element={<Navigate to="/" replace/>}/>
    </Routes>
  )
}