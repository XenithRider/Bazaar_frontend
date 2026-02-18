import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { ShoppingCart, Leaf, LogOut, User } from 'lucide-react'

export default function Navbar() {
  const { user, logout, isAdmin, isSeller, isUser } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => { logout(); navigate('/login') }

  return (
    <div className="navbar bg-base-100 shadow-sm border-b border-base-200 sticky top-0 z-50">
      {/* Brand */}
      <div className="navbar-start">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary">
          <Leaf size={24} className="text-primary" />
          <span>EcoBazaar</span>
        </Link>
      </div>

      {/* Center links (desktop) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-1">
          <li><Link to="/marketplace" className="rounded-lg font-medium">Marketplace</Link></li>
          {isUser  && <li><Link to="/dashboard">My Dashboard</Link></li>}
          {isSeller && <li><Link to="/seller/dashboard">Seller Hub</Link></li>}
          {isAdmin  && <li><Link to="/admin/dashboard">Admin Panel</Link></li>}
        </ul>
      </div>

      {/* Right actions */}
      <div className="navbar-end gap-2">
        {user ? (
          <>
            {isUser && (
              <Link to="/cart" className="btn btn-ghost btn-circle">
                <ShoppingCart size={20} />
              </Link>
            )}
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar placeholder">
                <div className="bg-primary text-primary-content rounded-full w-10">
                  <span className="text-sm font-bold">{user.name?.[0]?.toUpperCase()}</span>
                </div>
              </label>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-2xl w-52 border border-base-200">
                <li className="menu-title px-4 py-2">
                  <div>
                    <p className="font-semibold text-base-content">{user.name}</p>
                    <p className="text-xs text-base-content/50">{user.role?.replace('ROLE_','')}</p>
                  </div>
                </li>
                <div className="divider my-0" />
                <li><Link to="/orders"><User size={14}/>My Orders</Link></li>
                <li>
                  <button onClick={handleLogout} className="text-error">
                    <LogOut size={14}/> Logout
                  </button>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <div className="flex gap-2">
            <Link to="/login"    className="btn btn-ghost btn-sm">Login</Link>
            <Link to="/register" className="btn btn-primary btn-sm text-white">Sign Up</Link>
          </div>
        )}
      </div>
    </div>
  )
}