import Navbar from './Navbar'
import { Toaster } from 'react-hot-toast'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-6 max-w-7xl">
        {children}
      </main>
      <footer className="footer footer-center p-4 bg-base-100 text-base-content border-t border-base-200">
        <p className="text-sm text-base-content/40">🌿 EcoBazaar — Shop Green, Live Clean © 2025</p>
      </footer>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
    </div>
  )
}
