import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  Leaf, ShoppingBag, Shield, TrendingDown, ArrowRight,
  Recycle, Star, Users, Package, ChevronRight, Sparkles,
  TreePine, Wind, Droplets, Sun
} from 'lucide-react'

const stats = [
  { label: 'Eco Products',   value: '2,400+', icon: <Package size={22} />,      color: 'text-primary' },
  { label: 'Happy Shoppers', value: '18,000+',icon: <Users size={22} />,         color: 'text-info'    },
  { label: 'CO₂ Saved',      value: '52 tons', icon: <TrendingDown size={22} />, color: 'text-success' },
  { label: 'Verified Sellers',value: '340+',   icon: <Shield size={22} />,       color: 'text-accent'  },
]

const features = [
  {
    icon: <Leaf size={28} className="text-primary" />,
    title: 'Eco-Certified Products',
    desc: 'Every eco product on EcoBazaar goes through a rigorous certification process before earning the green badge.',
    bg: 'bg-primary/10',
  },
  {
    icon: <TrendingDown size={28} className="text-success" />,
    title: 'Carbon Footprint Tracker',
    desc: 'See exactly how much CO₂ each purchase generates, and get suggestions to swap to greener alternatives.',
    bg: 'bg-success/10',
  },
  {
    icon: <Recycle size={28} className="text-teal-600" />,
    title: 'Eco Swap Suggestions',
    desc: 'Our smart cart analyzes your items and instantly recommends lower-impact alternatives to save the planet.',
    bg: 'bg-teal-100',
  },
  {
    icon: <Star size={28} className="text-accent" />,
    title: 'Earn Eco Badges',
    desc: 'Shop green and level up. Unlock badges like 🌱 Sprout, 🌳 Guardian, and 🌍 Planet Hero.',
    bg: 'bg-accent/10',
  },
]

const categories = [
  { name: 'Organic Food',     emoji: '🥦', count: '320 products' },
  { name: 'Natural Beauty',   emoji: '🌸', count: '215 products' },
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
  { Icon: TreePine, style: 'top-16 left-[8%]', size: 20, delay: '0s' },
  { Icon: Wind,     style: 'top-32 right-[12%]', size: 16, delay: '0.5s' },
  { Icon: Droplets, style: 'bottom-24 left-[15%]', size: 18, delay: '1s' },
  { Icon: Sun,      style: 'bottom-16 right-[8%]', size: 22, delay: '1.5s' },
  { Icon: Leaf,     style: 'top-1/2 left-[4%]', size: 14, delay: '0.3s' },
  { Icon: Sparkles, style: 'top-1/2 right-[4%]', size: 14, delay: '0.8s' },
]

export default function HomePage() {
  const { user } = useAuth()

  return (
    <div className="space-y-0 -mt-6">

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden rounded-3xl mx-0 mb-16 mt-0"
        style={{ background: 'linear-gradient(135deg, #14532d 0%, #16a34a 45%, #0d9488 100%)' }}>

        {/* Decorative blobs */}
        <div className="absolute inset-0 pointer-events-none select-none">
          <div className="absolute w-96 h-96 rounded-full opacity-10 bg-white"
            style={{ top: '-80px', left: '-60px', filter: 'blur(60px)' }} />
          <div className="absolute w-72 h-72 rounded-full opacity-10 bg-yellow-300"
            style={{ bottom: '-40px', right: '-40px', filter: 'blur(50px)' }} />
        </div>

        {/* Floating eco icons */}
        {floatingIcons.map(({ Icon, style, size, delay }, i) => (
          <div key={i} className={`absolute ${style} text-white/20`}
            style={{ animation: `float 4s ease-in-out infinite`, animationDelay: delay }}>
            <Icon size={size} />
          </div>
        ))}

        <div className="relative z-10 flex flex-col items-center text-center px-6 py-20 lg:py-28">
          {/* Pill badge */}
          <div className="badge badge-lg bg-white/15 text-white border-white/30 gap-2 mb-6 px-4 py-3 text-sm font-medium backdrop-blur-sm">
            <Sparkles size={14} />
            India's #1 Eco-Friendly Marketplace
          </div>

          <h1 className="text-white font-extrabold leading-tight mb-4"
            style={{ fontSize: 'clamp(2.2rem, 6vw, 4rem)', textShadow: '0 2px 20px rgba(0,0,0,0.2)' }}>
            Shop Green.<br />
            <span style={{ color: '#bbf7d0' }}>Live Clean.</span>
          </h1>

          <p className="text-white/80 max-w-xl text-lg leading-relaxed mb-10">
            Discover thousands of eco-certified products. Track your carbon footprint with every purchase,
            and make a real difference — one order at a time.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/marketplace"
              className="btn btn-lg gap-2 text-primary font-bold shadow-xl hover:shadow-2xl transition-all"
              style={{ background: '#fff', border: 'none' }}>
              <ShoppingBag size={20} /> Browse Products <ArrowRight size={16} />
            </Link>
            {!user && (
              <Link to="/register"
                className="btn btn-lg btn-outline text-white border-white/60 hover:bg-white/15 hover:border-white gap-2">
                <Leaf size={18} /> Join for Free
              </Link>
            )}
          </div>

          {/* Floating stats bar */}
          <div className="mt-14 w-full max-w-3xl grid grid-cols-2 md:grid-cols-4 gap-3">
            {stats.map(({ label, value, icon, color }) => (
              <div key={label}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3 flex flex-col items-center gap-1">
                <div className={`${color} bg-white/20 rounded-full p-1.5`}>{icon}</div>
                <p className="text-white font-bold text-lg leading-none">{value}</p>
                <p className="text-white/60 text-xs">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CATEGORIES ─── */}
      <section className="mb-16 px-1">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-base-content">Shop by Category</h2>
            <p className="text-base-content/50 text-sm mt-1">Explore our curated eco collections</p>
          </div>
          <Link to="/marketplace" className="btn btn-ghost btn-sm gap-1 text-primary">
            View all <ChevronRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map(({ name, emoji, count }) => (
            <Link to="/marketplace" key={name}
              className="card bg-base-100 border border-base-200 hover:border-primary hover:shadow-md transition-all duration-200 cursor-pointer group">
              <div className="card-body p-4 items-center text-center gap-2">
                <span className="text-3xl group-hover:scale-110 transition-transform duration-200">{emoji}</span>
                <p className="font-semibold text-sm leading-snug">{name}</p>
                <p className="text-xs text-base-content/40">{count}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section className="mb-16 px-1">
        <div className="text-center mb-10">
          <div className="badge badge-primary badge-outline mb-3 px-3 py-2 gap-1">
            <Leaf size={13} /> Why EcoBazaar?
          </div>
          <h2 className="text-3xl font-bold text-base-content">Shopping with a Purpose</h2>
          <p className="text-base-content/50 mt-2 max-w-md mx-auto">
            We built EcoBazaar to make sustainable living effortless and rewarding for everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map(({ icon, title, desc, bg }) => (
            <div key={title}
              className="card bg-base-100 border border-base-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200">
              <div className="card-body p-6 gap-4">
                <div className={`w-14 h-14 rounded-2xl ${bg} flex items-center justify-center`}>
                  {icon}
                </div>
                <h3 className="font-bold text-base">{title}</h3>
                <p className="text-sm text-base-content/60 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="mb-16 bg-base-100 rounded-3xl border border-base-200 shadow-sm px-8 py-12">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold">How It Works</h2>
          <p className="text-base-content/50 text-sm mt-2">Get started in three simple steps</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-8 left-1/3 right-1/3 h-0.5 bg-base-200 z-0" />

          {[
            { step: '01', icon: '👤', title: 'Create Account',  desc: 'Sign up for free and set up your eco profile in minutes.' },
            { step: '02', icon: '🛒', title: 'Shop Green',       desc: 'Browse certified eco products and add them to your cart.' },
            { step: '03', icon: '🌍', title: 'Track Your Impact',desc: 'Watch your carbon dashboard and earn badges as you save.' },
          ].map(({ step, icon, title, desc }) => (
            <div key={step} className="flex flex-col items-center text-center gap-3 relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-primary text-white flex items-center justify-center text-2xl shadow-lg shadow-primary/30">
                {icon}
              </div>
              <span className="text-xs font-bold text-primary tracking-widest">{step}</span>
              <h3 className="font-bold text-lg">{title}</h3>
              <p className="text-sm text-base-content/60 max-w-xs">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="mb-16 px-1">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold">What Our Community Says</h2>
          <p className="text-base-content/50 text-sm mt-1">Real stories from real eco-warriors</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map(({ name, location, avatar, text, badge }) => (
            <div key={name}
              className="card bg-base-100 border border-base-200 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="card-body p-6 gap-4">
                <div className="flex gap-1 text-yellow-400">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <p className="text-sm text-base-content/70 leading-relaxed italic">"{text}"</p>
                <div className="flex items-center gap-3 mt-2">
                  <div className="avatar placeholder">
                    <div className="bg-primary text-primary-content rounded-full w-10">
                      <span className="font-bold">{avatar}</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{name}</p>
                    <p className="text-xs text-base-content/50">{location}</p>
                  </div>
                  <div className="ml-auto badge badge-ghost badge-sm">{badge}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      {!user && (
        <section className="mb-6 rounded-3xl overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #0d9488 0%, #16a34a 60%, #15803d 100%)' }}>
          <div className="flex flex-col md:flex-row items-center justify-between px-10 py-12 gap-6">
            <div className="text-white">
              <h2 className="text-2xl md:text-3xl font-extrabold mb-2">Ready to shop sustainably?</h2>
              <p className="text-white/75 max-w-md text-sm leading-relaxed">
                Join 18,000+ conscious shoppers. Sign up free and start tracking your carbon impact today.
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <Link to="/register"
                className="btn btn-lg font-bold shadow-xl gap-2"
                style={{ background: '#fff', color: '#15803d', border: 'none' }}>
                <Leaf size={18} /> Get Started Free
              </Link>
              <Link to="/marketplace"
                className="btn btn-lg btn-outline text-white border-white/50 hover:bg-white/15">
                Browse First
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Float animation keyframe injected via a style tag */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50%       { transform: translateY(-12px) rotate(5deg); }
        }
      `}</style>
    </div>
  )
}