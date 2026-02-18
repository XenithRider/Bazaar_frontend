import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  Leaf, ShoppingBag, Shield, TrendingDown, ArrowRight,
  Recycle, Star, Users, Package, ChevronRight, Sparkles,
  TreePine, Wind, Droplets, Sun
} from 'lucide-react'

const stats = [
  { label: 'Eco Products',   value: '2,400+', icon: <Package size={20} />,      color: 'text-emerald-500' },
  { label: 'Happy Shoppers', value: '18,000+',icon: <Users size={20} />,         color: 'text-blue-500'    },
  { label: 'CO₂ Saved',      value: '52 tons', icon: <TrendingDown size={20} />, color: 'text-green-500' },
  { label: 'Verified Sellers',value: '340+',   icon: <Shield size={20} />,       color: 'text-amber-500'  },
]

const features = [
  {
    icon: <Leaf size={28} />,
    title: 'Eco-Certified Products',
    desc: 'Every product goes through a rigorous certification process before earning the green badge.',
    theme: 'text-emerald-600 bg-emerald-50 border-emerald-100',
  },
  {
    icon: <TrendingDown size={28} />,
    title: 'Carbon Footprint Tracker',
    desc: 'See exactly how much CO₂ each purchase generates and find greener alternatives.',
    theme: 'text-blue-600 bg-blue-50 border-blue-100',
  },
  {
    icon: <Recycle size={28} />,
    title: 'Eco Swap Suggestions',
    desc: 'Our smart cart analyzes items and recommends lower-impact alternatives instantly.',
    theme: 'text-teal-600 bg-teal-50 border-teal-100',
  },
  {
    icon: <Star size={28} />,
    title: 'Earn Eco Badges',
    desc: 'Shop green and level up. Unlock badges like Sprout, Guardian, and Planet Hero.',
    theme: 'text-amber-600 bg-amber-50 border-amber-100',
  },
]

const categories = [
  { name: 'Organic Food',    emoji: '🥦', count: '320 products' },
  { name: 'Natural Beauty',  emoji: '🌸', count: '215 products' },
  { name: 'Sustainable Home', emoji: '🏠', count: '180 products' },
  { name: 'Eco Fashion',      emoji: '👕', count: '140 products' },
  { name: 'Zero Waste',       emoji: '♻️', count: '95 products'  },
  { name: 'Green Energy',     emoji: '☀️', count: '60 products'  },
]

const testimonials = [
  {
    name: 'Priya Sharma',
    location: 'Mumbai',
    avatar: 'P',
    text: "EcoBazaar changed the way I shop. I can see my carbon impact in real time and the eco-swap feature is genius!",
    badge: '🌳 Guardian',
  },
  {
    name: 'Arjun Mehta',
    location: 'Bangalore',
    avatar: 'A',
    text: "Finally a platform that makes sustainable shopping easy and rewarding. Love the badges system!",
    badge: '🌍 Planet Hero',
  },
  {
    name: 'Sneha Patel',
    location: 'Ahmedabad',
    avatar: 'S',
    text: "The product quality is amazing and knowing I'm making a difference feels wonderful. Highly recommend!",
    badge: '🌱 Sprout',
  },
]

const floatingIcons = [
  { Icon: TreePine, style: 'top-16 left-[8%]', size: 24, delay: '0s' },
  { Icon: Wind,     style: 'top-32 right-[12%]', size: 20, delay: '0.5s' },
  { Icon: Droplets, style: 'bottom-24 left-[15%]', size: 22, delay: '1s' },
  { Icon: Sun,      style: 'bottom-16 right-[8%]', size: 26, delay: '1.5s' },
  { Icon: Leaf,     style: 'top-1/2 left-[4%]', size: 18, delay: '0.3s' },
  { Icon: Sparkles, style: 'top-1/2 right-[4%]', size: 18, delay: '0.8s' },
]

export default function HomePage() {
  const { user } = useAuth()

  return (
    <div className="space-y-24 pb-20 -mt-6">

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden rounded-[2.5rem] mx-2 lg:mx-4 mt-4 shadow-2xl"
        style={{ background: 'linear-gradient(135deg, #064e3b 0%, #059669 50%, #0d9488 100%)' }}>

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-[500px] h-[500px] rounded-full opacity-20 bg-emerald-300 blur-[100px] -top-48 -left-24" />
          <div className="absolute w-[400px] h-[400px] rounded-full opacity-20 bg-yellow-200 blur-[80px] -bottom-24 -right-12" />
        </div>

        {floatingIcons.map(({ Icon, style, size, delay }, i) => (
          <div key={i} className={`absolute ${style} text-white/10 hidden md:block`}
            style={{ animation: `float 6s ease-in-out infinite`, animationDelay: delay }}>
            <Icon size={size} />
          </div>
        ))}

        <div className="relative z-10 flex flex-col items-center text-center px-6 py-24 lg:py-32">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-semibold tracking-wide text-emerald-100 uppercase rounded-full bg-white/10 backdrop-blur-md border border-white/20">
            <Sparkles size={16} className="text-yellow-300" />
            India's Premier Eco Marketplace
          </div>

          <h1 className="text-white font-black tracking-tight mb-6 leading-[1.1]"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)' }}>
            Shop <span className="text-emerald-200">Green.</span><br />
            Live <span className="bg-gradient-to-r from-emerald-200 to-teal-200 bg-clip-text text-transparent">Clean.</span>
          </h1>

          <p className="text-emerald-50/80 max-w-2xl text-lg md:text-xl leading-relaxed mb-12">
            Discover thousands of eco-certified products. Track your impact 
            with every purchase and join a community making a real difference.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center w-full px-4">
            <Link to="/marketplace"
              className="group btn btn-lg h-16 px-8 bg-white hover:bg-emerald-50 text-emerald-900 border-none shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <ShoppingBag size={22} className="group-hover:rotate-12 transition-transform" /> 
              <span className="font-bold">Browse Marketplace</span> 
              <ArrowRight size={18} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
            {!user && (
              <Link to="/register"
                className="btn btn-lg h-16 px-8 btn-outline text-white border-white/40 hover:bg-white/10 backdrop-blur-sm border-2">
                <Leaf size={20} /> Join the Movement
              </Link>
            )}
          </div>

          {/* Floating stats bar */}
          <div className="mt-20 w-full max-w-4xl grid grid-cols-2 lg:grid-cols-4 gap-4 px-2">
            {stats.map(({ label, value, icon, color }) => (
              <div key={label}
                className="group bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-5 hover:bg-white/10 transition-colors">
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 mb-3 ${color} group-hover:scale-110 transition-transform`}>
                  {icon}
                </div>
                <div className="text-white font-black text-2xl tracking-tight leading-none">{value}</div>
                <div className="text-emerald-100/60 text-xs font-bold uppercase tracking-widest mt-2">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CATEGORIES ─── */}
      <section className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-black text-slate-800 tracking-tight">Shop by Category</h2>
            <div className="h-1.5 w-20 bg-emerald-500 rounded-full mt-2" />
          </div>
          <Link to="/marketplace" className="group flex items-center gap-2 font-bold text-emerald-600 hover:text-emerald-700 transition-colors">
            Explore All Collections <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map(({ name, emoji, count }) => (
            <Link to="/marketplace" key={name}
              className="group flex flex-col items-center p-8 bg-white border border-slate-100 rounded-[2rem] hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300">
              <span className="text-5xl mb-4 group-hover:scale-125 group-hover:-rotate-12 transition-transform duration-500">{emoji}</span>
              <p className="font-bold text-slate-800 text-center leading-tight mb-1">{name}</p>
              <p className="text-xs font-medium text-slate-400">{count}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-bold uppercase tracking-wider">
            Our Ecosystem
          </span>
          <h2 className="text-4xl font-black text-slate-800 mt-4 tracking-tight">Shopping with a Purpose</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map(({ icon, title, desc, theme }) => (
            <div key={title}
              className="group relative p-8 bg-white border border-slate-100 rounded-[2.5rem] hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 group-hover:rotate-3 ${theme}`}>
                {icon}
              </div>
              <h3 className="font-extrabold text-xl text-slate-800 mb-3">{title}</h3>
              <p className="text-slate-500 leading-relaxed font-medium">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="container mx-auto px-4">
        <div className="bg-slate-900 rounded-[3rem] p-12 lg:p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px]" />
            
            <div className="relative z-10 text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-white">How It Works</h2>
              <p className="text-slate-400 mt-4 text-lg">Start your sustainability journey in 3 steps</p>
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24">
              {[
                { step: '01', icon: '👤', title: 'Create Account',  desc: 'Sign up for free and set up your eco profile in minutes.' },
                { step: '02', icon: '🛒', title: 'Shop Green',       desc: 'Browse certified eco products and add them to your cart.' },
                { step: '03', icon: '🌍', title: 'Track Impact',    desc: 'Watch your carbon dashboard and earn badges as you save.' },
              ].map(({ step, icon, title, desc }, idx) => (
                <div key={step} className="relative flex flex-col items-center text-center group">
                  <div className="w-20 h-20 rounded-3xl bg-emerald-500 text-white flex items-center justify-center text-3xl shadow-2xl shadow-emerald-500/20 mb-8 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300">
                    {icon}
                  </div>
                  <span className="absolute top-0 right-1/4 text-6xl font-black text-white/5 pointer-events-none">{step}</span>
                  <h3 className="font-bold text-xl text-white mb-3">{title}</h3>
                  <p className="text-slate-400 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Community Voices</h2>
          <p className="text-slate-400 mt-2 font-medium">Join 18,000+ conscious shoppers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map(({ name, location, avatar, text, badge }) => (
            <div key={name} className="flex flex-col p-8 bg-slate-50 border border-slate-100 rounded-[2.5rem] relative">
              <div className="flex gap-1 text-amber-400 mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-slate-600 leading-relaxed italic mb-8 flex-grow font-medium">"{text}"</p>
              <div className="flex items-center gap-4 border-t border-slate-200 pt-6">
                <div className="avatar">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg">
                    {avatar}
                  </div>
                </div>
                <div>
                  <p className="font-bold text-slate-800 leading-none">{name}</p>
                  <p className="text-xs text-slate-400 font-bold mt-1 uppercase tracking-wide">{location}</p>
                </div>
                <div className="ml-auto px-3 py-1 bg-white rounded-full border border-slate-200 text-[10px] font-black uppercase text-emerald-600 shadow-sm">
                   {badge}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      {!user && (
        <section className="container mx-auto px-4">
          <div className="relative rounded-[3rem] overflow-hidden bg-emerald-600 p-12 lg:p-20 shadow-2xl shadow-emerald-900/20">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="text-center lg:text-left max-w-xl">
                <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">Ready to make an impact?</h2>
                <p className="text-emerald-50 text-lg opacity-90 font-medium">
                  Join our community of eco-warriors. Sign up today and get 
                  personalized swap suggestions for a cleaner tomorrow.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                <Link to="/register"
                  className="btn btn-lg h-16 px-10 bg-white hover:bg-emerald-50 text-emerald-700 border-none font-black text-lg shadow-xl hover:scale-105 transition-all duration-300">
                  Join for Free
                </Link>
                <Link to="/marketplace"
                  className="btn btn-lg h-16 px-10 btn-outline text-white border-white/40 border-2 font-bold">
                  Browse Store
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50%       { transform: translateY(-20px) rotate(8deg); }
        }
      `}</style>
    </div>
  )
}