import { useState, useEffect, useRef, createContext, useContext } from 'react'
import {
  Sun, Moon, Menu, X, ArrowRight, Globe, Smartphone, Code2,
  ShoppingCart, ShieldCheck, BarChart3, Phone, Mail, MessageCircle,
  FileText, Lock, CheckCircle, Zap, Users, Clock, ArrowUpRight,
  ChevronDown, MapPin, Star, Layers, Headphones, TrendingUp, Award,
} from 'lucide-react'
import { Turnstile } from '@marsidev/react-turnstile'
import InteractiveDemos from './InteractiveDemos'
import './index.css'

// ─── Logo SVG ─────────────────────────────────────────────────────────────────
// Recreated from the Work Labs brand mark: circle + two pill shapes, purple→pink gradient
function WorkLabsLogo({ height = 28 }: { height?: number }) {
  const w = height * 3.4
  return (
    <svg width={w} height={height} viewBox="0 0 120 35" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Work Labs logo mark">
      <defs>
        <linearGradient id="wl-circle" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#c084fc" />
        </linearGradient>
        <linearGradient id="wl-pill1" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
        <linearGradient id="wl-pill2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#e879f9" />
        </linearGradient>
      </defs>
      {/* Circle */}
      <circle cx="17.5" cy="17.5" r="17.5" fill="url(#wl-circle)" />
      {/* Long pill */}
      <rect x="42" y="10" width="32" height="15" rx="7.5" fill="url(#wl-pill1)" />
      {/* Short pill */}
      <rect x="82" y="10" width="28" height="15" rx="7.5" fill="url(#wl-pill2)" />
    </svg>
  )
}

// ─── Theme Context ────────────────────────────────────────────────────────────
const ThemeCtx = createContext<{ dark: boolean; toggle: () => void }>({ dark: true, toggle: () => {} })
const useTheme = () => useContext(ThemeCtx)

// ─── Scroll fade hook ─────────────────────────────────────────────────────────
function useFadeUp(delay = 0) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTimeout(() => el.classList.add('visible'), delay); obs.disconnect() } },
      { threshold: 0.07 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])
  return ref
}

// ─── Theme Toggle ─────────────────────────────────────────────────────────────
function ThemeToggle() {
  const { dark, toggle } = useTheme()
  const [spin, setSpin] = useState(false)
  const handle = () => { setSpin(true); toggle(); setTimeout(() => setSpin(false), 400) }
  return (
    <button
      id="theme-toggle"
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={handle}
      style={{ background: 'var(--c-bg-elevated)', border: '1px solid var(--c-border)', color: 'var(--c-text-2)' }}
      className="w-9 h-9 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-105 flex-shrink-0"
    >
      <span className={spin ? 'theme-spin' : ''} style={{ display: 'inline-flex' }}>
        {dark ? <Sun size={15} /> : <Moon size={15} />}
      </span>
    </button>
  )
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  const to = (id: string) => { setOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }) }

  const links = [['Services', 'services'], ['How We Work', 'process'], ['Live Demos', 'demos'], ['About', 'why-us'], ['Clients', 'testimonials'], ['FAQ', 'faq']]

  return (
    <>
      <nav
        style={{
          background: scrolled ? 'var(--c-nav-bg)' : 'transparent',
          borderBottom: `1px solid ${scrolled ? 'var(--c-border)' : 'transparent'}`,
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          transition: 'all 0.3s ease',
        }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 sm:px-8 md:px-10 h-16"
      >
        <button onClick={() => to('hero')} className="flex items-center gap-3 cursor-pointer bg-transparent border-none">
          <WorkLabsLogo height={26} />
          <span className="font-black text-[17px] tracking-[-0.5px]" style={{ color: 'var(--c-text)' }}>Work Labs</span>
        </button>

        <div className="hidden lg:flex items-center gap-0.5">
          {links.map(([label, id]) => (
            <button key={id} onClick={() => to(id)}
              style={{ color: 'var(--c-text-2)', background: 'none', border: 'none' }}
              className="text-[13.5px] font-medium px-3.5 py-1.5 rounded-lg cursor-pointer transition-all duration-200 hover:opacity-100"
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--c-text)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--c-text-2)')}
            >{label}</button>
          ))}
        </div>

        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <button id="nav-cta" onClick={() => to('contact')}
            className="hidden md:flex items-center gap-1.5 text-[13.5px] font-semibold text-white px-4 py-2 rounded-lg cursor-pointer border-none transition-all duration-200 hover:-translate-y-0.5"
            style={{ background: 'var(--c-accent)' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--c-accent-h)'; e.currentTarget.style.boxShadow = '0 6px 20px var(--c-accent-ring)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--c-accent)'; e.currentTarget.style.boxShadow = 'none' }}
          >
            Get a Free Quote <ArrowRight size={14} />
          </button>
          <button aria-label="Toggle menu" onClick={() => setOpen(o => !o)}
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg cursor-pointer transition-all duration-200"
            style={{ background: 'var(--c-bg-elevated)', border: '1px solid var(--c-border)', color: 'var(--c-text)' }}>
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        style={{ background: 'var(--c-bg)', borderBottom: '1px solid var(--c-border)', transition: 'all 0.25s ease' }}
        className={`lg:hidden fixed top-16 left-0 right-0 z-40 px-6 pb-6 ${open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}`}
      >
        <ul className="list-none flex flex-col pt-2">
          {links.map(([label, id]) => (
            <li key={id} style={{ borderBottom: '1px solid var(--c-border)' }}>
              <button onClick={() => to(id)}
                style={{ color: 'var(--c-text-2)', width: '100%', textAlign: 'left' }}
                className="text-[15px] font-medium py-3.5 bg-transparent border-none cursor-pointer">
                {label}
              </button>
            </li>
          ))}
          <li className="pt-4">
            <button onClick={() => to('contact')}
              className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-white py-3 rounded-xl cursor-pointer border-none"
              style={{ background: 'var(--c-accent)' }}>
              Get a Free Quote <ArrowRight size={14} />
            </button>
          </li>
        </ul>
      </div>
    </>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const to = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  const ref = useFadeUp()
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[800px] h-[800px] rounded-full -top-40 -right-40"
          style={{ background: 'radial-gradient(circle, var(--c-hero-grad) 0%, transparent 68%)' }} />
        <div className="absolute inset-0 grid-bg" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-10 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div>
            {/* Status badge */}
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 text-[12px] font-medium"
              style={{ border: '1px solid var(--c-border)', background: 'var(--c-bg-card)', color: 'var(--c-text-2)' }}>
              <span className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ background: 'var(--c-green)', boxShadow: '0 0 7px var(--c-green-glow)' }} />
              Now accepting new clients for Q3 2025
            </div>

            <h1 className="font-black leading-[1.03] tracking-[-3px] mb-6"
              style={{ color: 'var(--c-text)', fontSize: 'clamp(42px, 7vw, 86px)' }}>
              Your local business<br />
              deserves <span style={{ color: 'var(--c-accent)' }}>better tech.</span>
            </h1>

            <p className="text-[17px] leading-relaxed max-w-[540px] mb-10 font-normal" style={{ color: 'var(--c-text-2)' }}>
              Work Labs builds custom websites, mobile apps, and software that help local businesses
              generate more leads, serve customers better, and grow faster without the enterprise price tag.
            </p>

            <div className="flex flex-wrap gap-3.5 mb-10 lg:mb-0">
              <button id="hero-cta-quote" onClick={() => to('contact')}
                className="inline-flex items-center gap-2 text-white text-sm font-semibold px-6 py-3.5 rounded-xl cursor-pointer border-none transition-all duration-200 hover:-translate-y-0.5"
                style={{ background: 'var(--c-accent)' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--c-accent-h)'; e.currentTarget.style.boxShadow = '0 10px 28px var(--c-accent-ring)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--c-accent)'; e.currentTarget.style.boxShadow = 'none' }}>
                Get a Free Quote <ArrowRight size={15} />
              </button>
              <button id="hero-cta-services" onClick={() => to('services')}
                className="inline-flex items-center gap-2 text-sm font-medium px-6 py-3.5 rounded-xl cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
                style={{ border: '1px solid var(--c-border)', color: 'var(--c-text-2)', background: 'transparent' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--c-border-hover)'; e.currentTarget.style.color = 'var(--c-text)'; e.currentTarget.style.background = 'var(--c-bg-card)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--c-border)'; e.currentTarget.style.color = 'var(--c-text-2)'; e.currentTarget.style.background = 'transparent' }}>
                View Our Services
              </button>
            </div>
          </div>
          
          <div className="relative fade-up" ref={ref}>
            <div className="absolute -inset-1 rounded-3xl blur-xl opacity-30" style={{ background: 'var(--c-accent)' }}></div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[var(--c-border)]" style={{ background: 'var(--c-bg-card)' }}>
              <div className="h-8 flex items-center px-4 gap-1.5" style={{ background: 'var(--c-bg-elevated)', borderBottom: '1px solid var(--c-border)' }}>
                <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
              </div>
              <video 
                src="https://github.com/junaidmirr/worklabs/raw/e08edaaed8e82bd67f76f21cedf680739b9ead88/www.worklabs.studio.mp4"
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-8 sm:gap-14 pt-12 mt-16" style={{ borderTop: '1px solid var(--c-border)' }}>
          {[
            { num: '60+', label: 'Projects Delivered' },
            { num: '45+', label: 'Businesses Transformed' },
            { num: '14 Days', label: 'Avg. Website Launch' },
            { num: '98%', label: 'Client Retention Rate' },
          ].map(s => (
            <div key={s.label}>
              <div className="font-black tracking-tight" style={{ color: 'var(--c-accent)', fontSize: '30px' }}>{s.num}</div>
              <div className="text-[11px] font-semibold uppercase tracking-widest mt-1" style={{ color: 'var(--c-text-3)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Industries Marquee ───────────────────────────────────────────────────────
const INDUSTRIES = [
  { icon: <MapPin size={14} />, label: 'Restaurants & Cafes' },
  { icon: <Headphones size={14} />, label: 'Beauty & Wellness' },
  { icon: <ShoppingCart size={14} />, label: 'Retail & E-commerce' },
  { icon: <Layers size={14} />, label: 'Construction & Trade' },
  { icon: <Users size={14} />, label: 'Healthcare Clinics' },
  { icon: <Award size={14} />, label: 'Law & Consulting Firms' },
  { icon: <TrendingUp size={14} />, label: 'Real Estate Agencies' },
  { icon: <Zap size={14} />, label: 'Tech Startups' },
  { icon: <Globe size={14} />, label: 'Education & Coaching' },
  { icon: <Star size={14} />, label: 'Event & Photography' },
]

function IndustriesTicker() {
  const doubled = [...INDUSTRIES, ...INDUSTRIES]
  return (
    <div style={{ borderTop: '1px solid var(--c-border)', borderBottom: '1px solid var(--c-border)', background: 'var(--c-bg-card)' }}
      className="py-4 overflow-hidden">
      <div className="flex items-center gap-2 mb-2 px-6 md:px-10">
        <span className="text-[10.5px] font-bold uppercase tracking-[2px]" style={{ color: 'var(--c-text-3)' }}>
          Industries we serve
        </span>
      </div>
      <div className="relative overflow-hidden">
        <div className="marquee-track flex items-center gap-6 whitespace-nowrap" style={{ width: 'max-content' }}>
          {doubled.map((item, i) => (
            <div key={i} className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12.5px] font-medium flex-shrink-0"
              style={{ border: '1px solid var(--c-border)', color: 'var(--c-text-2)', background: 'var(--c-bg-elevated)' }}>
              <span style={{ color: 'var(--c-accent)' }}>{item.icon}</span>
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Services ─────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    Icon: Globe,
    title: 'Website Development',
    tagline: 'Your 24/7 salesperson that never sleeps',
    desc: '68% of consumers judge a business by its website before making contact. We build fast, modern, mobile first websites that load in under 2 seconds, rank on Google, and turn visitors into paying customers not templates, fully custom.',
    bullets: ['Custom design no templates', 'Mobile first & SEO ready', 'Under 2 second load time', 'Google Analytics & tracking'],
  },
  {
    Icon: Smartphone,
    title: 'Mobile App Development',
    tagline: 'Put your business in every pocket',
    desc: '67% of consumers prefer to interact with a business through a dedicated app. We build iOS & Android apps that increase customer retention, enable push notifications, and open revenue channels you never had before.',
    bullets: ['iOS & Android (cross-platform)', 'Booking & ordering systems', 'Push notifications & loyalty', 'Offline-first architecture'],
  },
  {
    Icon: Code2,
    title: 'Custom Software & Automation',
    tagline: 'Eliminate the work that wastes your time',
    desc: "Still running your business on spreadsheets and WhatsApp groups? We build custom internal tools, CRMs, inventory systems, and automations that eliminate manual tasks and give you back 10+ hours every single week.",
    bullets: ['Custom CRM & dashboards', 'Inventory & order management', 'Workflow automation', 'API & third-party integrations'],
  },
  {
    Icon: ShoppingCart,
    title: 'E-commerce Solutions',
    tagline: 'Start selling online in as little as 2 weeks',
    desc: 'We build complete, professional online stores product management, payment gateways (Stripe, PayPal, local), order tracking, customer accounts, and everything your business needs to sell 24/7 without lifting a finger.',
    bullets: ['Full product catalog & variants', 'Multi payment gateway support', 'Order & shipping management', 'Abandoned cart & email automation'],
  },
  {
    Icon: ShieldCheck,
    title: 'IT Support & Security',
    tagline: 'One cyberattack costs SMBs an average of $25,000',
    desc: "Don't let that be you. We provide proactive server monitoring, automated daily backups, SSL management, firewall setup, and rapid response support so your systems are always protected and you're never down during peak hours.",
    bullets: ['24/7 uptime monitoring', 'Daily automated backups', 'SSL & security audits', 'Priority support SLA'],
  },
  {
    Icon: BarChart3,
    title: 'Digital Strategy Consulting',
    tagline: 'Clarity before a single line of code is written',
    desc: "Not sure what you need? Start here free. We analyze your current setup, understand your business goals, and deliver a clear, honest tech roadmap. No upselling. No jargon. Just a practical plan with real ROI projections.",
    bullets: ['Business & tech audit', 'Competitor benchmarking', 'ROI-focused roadmap', 'Budget planning & phased approach'],
  },
]

function Services() {
  const ref = useFadeUp()
  return (
    <section id="services" className="py-24 my-20 md:py-32" style={{ borderTop: '1px solid var(--c-border)' }}>
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="fade-up mb-14" ref={ref}>
          <div className="text-[10.5px] font-bold tracking-[2.5px] uppercase mb-4" style={{ color: 'var(--c-accent)' }}>Our Services</div>
          <h2 className="font-black leading-[1.07] tracking-[-1.5px] mb-4" style={{ color: 'var(--c-text)', fontSize: 'clamp(28px, 4vw, 46px)' }}>
            Everything your business needs<br className="hidden md:block" /> to win online
          </h2>
          <p className="text-[15.5px] leading-relaxed max-w-[500px]" style={{ color: 'var(--c-text-2)' }}>
            From your first website to a full software suite we deliver the tech your competitors wish they had.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s, i) => <ServiceCard key={s.title} service={s} delay={i * 70} />)}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ service, delay }: { service: typeof SERVICES[0]; delay: number }) {
  const ref = useFadeUp(delay)
  const { Icon } = service
  return (
    <div ref={ref}
      className="fade-up group rounded-2xl p-7 transition-all duration-300 cursor-default flex flex-col"
      style={{ background: 'var(--c-bg-card)', border: '1px solid var(--c-border)' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--c-accent-ring)'; e.currentTarget.style.transform = 'translateY(-3px)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--c-border)'; e.currentTarget.style.transform = 'translateY(0)' }}>
      <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:-translate-y-0.5"
        style={{ background: 'var(--c-accent-glow)', border: '1px solid var(--c-accent-ring)', color: 'var(--c-accent)' }}>
        <Icon size={20} />
      </div>
      <h3 className="font-bold text-[16px] mb-1 tracking-[-0.3px]" style={{ color: 'var(--c-text)' }}>{service.title}</h3>
      <p className="text-[12px] font-semibold mb-3" style={{ color: 'var(--c-accent)' }}>{service.tagline}</p>
      <p className="text-[13.5px] leading-relaxed mb-5 flex-1" style={{ color: 'var(--c-text-2)' }}>{service.desc}</p>
      <ul className="flex flex-col gap-2">
        {service.bullets.map(b => (
          <li key={b} className="flex items-center gap-2 text-[12.5px] font-medium" style={{ color: 'var(--c-text-2)' }}>
            <CheckCircle size={13} style={{ color: 'var(--c-accent)', flexShrink: 0 }} /> {b}
          </li>
        ))}
      </ul>
    </div>
  )
}

// ─── Numbers / Social Proof ───────────────────────────────────────────────────
function NumbersSection() {
  const ref = useFadeUp()
  const stats = [
    { num: '60+', label: 'Projects shipped', sub: 'Across 12+ industries' },
    { num: '3×', label: 'Avg. revenue increase', sub: 'For our e-commerce clients' },
    { num: '14 days', label: 'Avg. website launch', sub: 'From kickoff to live' },
    { num: '$0', label: 'Hidden fees — ever', sub: 'Fixed-price contracts only' },
    { num: '98%', label: 'Client retention', sub: 'Clients who come back for more' },
    { num: '90 days', label: 'Free post-launch support', sub: 'On every project we deliver' },
  ]
  return (
    <section className="py-20 md:py-28" style={{ borderTop: '1px solid var(--c-border)', background: 'var(--c-bg-card)' }}>
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="fade-up text-center max-w-xl mx-auto mb-14" ref={ref}>
          <div className="text-[10.5px] font-bold tracking-[2.5px] uppercase mb-4" style={{ color: 'var(--c-accent)' }}>By the numbers</div>
          <h2 className="font-black tracking-[-1.5px] mb-3" style={{ color: 'var(--c-text)', fontSize: 'clamp(26px, 4vw, 40px)' }}>
            Results that speak for themselves
          </h2>
          <p className="text-[15px] leading-relaxed" style={{ color: 'var(--c-text-2)' }}>
            We measure our success by the growth our clients achieve not just deliverables.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {stats.map((s, i) => {
            const ref2 = useFadeUp(i * 80)
            return (
              <div key={s.label} ref={ref2}
                className="fade-up rounded-2xl p-6 md:p-8 text-center transition-all duration-300 cursor-default"
                style={{ background: 'var(--c-bg-elevated)', border: '1px solid var(--c-border)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--c-accent-ring)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--c-border)'; e.currentTarget.style.transform = 'translateY(0)' }}>
                <div className="font-black tracking-tight mb-1" style={{ color: 'var(--c-accent)', fontSize: 'clamp(28px, 4vw, 42px)' }}>{s.num}</div>
                <div className="font-bold text-[14px] mb-1" style={{ color: 'var(--c-text)' }}>{s.label}</div>
                <div className="text-[12px]" style={{ color: 'var(--c-text-3)' }}>{s.sub}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── Why Us ───────────────────────────────────────────────────────────────────
const WHY_POINTS = [
  { Icon: Users, title: 'Local business specialists', desc: "We've worked with 45+ businesses across restaurants, clinics, salons, law firms, retail shops, and more. We don't guess we know what works for your industry." },
  { Icon: Lock, title: 'Fixed price contracts no surprises', desc: 'You get a clear quote upfront. The price you approve is the price you pay. No scope creep charges, no hidden fees. Guaranteed in writing.' },
  { Icon: MessageCircle, title: 'You talk directly to your developer', desc: 'No account managers, no ticket queues. When you have a question, you reach the person actually building your product. Direct line, fast answers.' },
  { Icon: Clock, title: 'Weekly progress updates always', desc: 'Every Friday you receive a written update: what was completed, what is next, and any decisions needed. You are never left wondering where things stand.' },
  { Icon: Zap, title: 'Fast delivery most projects in 2–6 weeks', desc: 'We work in tight, focused sprints. Most websites launch in under 2 weeks. Apps and software in 4–8 weeks. Your competitors are not waiting neither should you.' },
  { Icon: Award, title: '90 days free support after launch', desc: 'Every project includes 90 days of post launch support at no extra cost. Bug fixes, minor updates, and guidance included as standard.' },
]

function WhyUs() {
  const ref = useFadeUp()
  return (
    <section id="why-us" className="py-24 md:py-32" style={{ borderTop: '1px solid var(--c-border)' }}>
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">
          <div>
            <div className="fade-up" ref={ref}>
              <div className="text-[10.5px] font-bold tracking-[2.5px] uppercase mb-4" style={{ color: 'var(--c-accent)' }}>Why Work Labs</div>
              <h2 className="font-black tracking-[-1.5px] mb-4 leading-[1.07]" style={{ color: 'var(--c-text)', fontSize: 'clamp(28px, 4vw, 44px)' }}>
                A team that treats your<br className="hidden sm:block" /> business like their own
              </h2>
              <p className="text-[15.5px] leading-relaxed mb-10" style={{ color: 'var(--c-text-2)' }}>
                We are not a large agency with layers of management. We are a focused team of builders who
                care deeply about the success of every client we take on.
                When your business grows, we grow. That alignment is everything.
              </p>
            </div>
            <div className="flex flex-col gap-7">
              {WHY_POINTS.map((p, i) => <WhyPoint key={p.title} point={p} delay={i * 90} />)}
            </div>
          </div>

          {/* Animated metrics */}
          <div className="lg:sticky lg:top-24">
            <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--c-border)', background: 'var(--c-bg-card)' }}>
              <div className="px-6 py-5" style={{ borderBottom: '1px solid var(--c-border)' }}>
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#ff5f57' }} />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#ffbd2e' }} />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#28c840' }} />
                  <span className="text-[12px] font-medium ml-2" style={{ color: 'var(--c-text-3)' }}>worklabs client dashboard</span>
                </div>
              </div>
              <div className="p-6 flex flex-col gap-3.5">
                {[
                  { cls: 'float-1', dot: '#22c55e', label: 'Website traffic (this month)', val: '+217%', positive: true },
                  { cls: 'float-2', dot: '#5b6cf9', label: 'Online enquiries received', val: '143', positive: true, indent: true },
                  { cls: 'float-3', dot: '#f59e0b', label: 'App downloads (30 days)', val: '1,840', positive: true },
                  { cls: 'float-4', dot: '#22c55e', label: 'Monthly revenue growth', val: '+38%', positive: true, indent: true },
                  { cls: 'float-1', dot: '#a855f7', label: 'Support tickets resolved', val: '100%', positive: true },
                ].map((card, i) => (
                  <div key={i}
                    className={`${card.cls} ${card.indent ? 'ml-4' : ''} flex items-center gap-3 rounded-xl px-4 py-3`}
                    style={{ background: 'var(--c-bg-elevated)', border: '1px solid var(--c-border)' }}>
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: card.dot, boxShadow: `0 0 7px ${card.dot}` }} />
                    <span className="text-[13px] flex-1 font-medium" style={{ color: 'var(--c-text-2)' }}>{card.label}</span>
                    <span className="text-[13px] font-black" style={{ color: card.positive ? '#22c55e' : '#ef4444' }}>{card.val}</span>
                  </div>
                ))}
                <div className="mt-2 flex items-center gap-2 text-[12px]" style={{ color: 'var(--c-text-3)' }}>
                  <TrendingUp size={12} style={{ color: 'var(--c-green)' }} />
                  Real client metrics averaged across active projects
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function WhyPoint({ point, delay }: { point: typeof WHY_POINTS[0]; delay: number }) {
  const ref = useFadeUp(delay)
  const { Icon } = point
  return (
    <div ref={ref} className="fade-up flex items-start gap-4">
      <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
        style={{ background: 'var(--c-accent-glow)', border: '1px solid var(--c-accent-ring)', color: 'var(--c-accent)' }}>
        <Icon size={16} />
      </div>
      <div>
        <div className="text-[14.5px] font-semibold mb-1.5 tracking-[-0.1px]" style={{ color: 'var(--c-text)' }}>{point.title}</div>
        <div className="text-[13.5px] leading-relaxed" style={{ color: 'var(--c-text-2)' }}>{point.desc}</div>
      </div>
    </div>
  )
}

// ─── Process ──────────────────────────────────────────────────────────────────
const STEPS = [
  {
    Icon: Phone,
    num: '01',
    title: 'Free Discovery Call',
    time: '30 minutes',
    desc: "Tell us about your business, your goals, and the problems you are trying to solve. No pitch, no commitment. We ask smart questions to understand what you actually need not what we want to sell.",
  },
  {
    Icon: FileText,
    num: '02',
    title: 'Proposal & Fixed Quote',
    time: 'Within 48 hours',
    desc: "Within 48 hours of your call, you receive a detailed written proposal: full scope of work, project timeline, and a fixed price. No hourly billing, no estimates you know exactly what you are getting and for how much.",
  },
  {
    Icon: Code2,
    num: '03',
    title: 'Design, Build & Review',
    time: '2–8 weeks',
    desc: "We build in focused weekly sprints. Every Friday you get an update with what was completed and what is next. You review, give feedback, and we iterate. You are part of the process not waiting on the sidelines.",
  },
  {
    Icon: Zap,
    num: '04',
    title: 'Launch & Handover',
    time: 'Day you go live',
    desc: "We handle the full deployment domain, hosting, testing, and launch. We then train you or your team on everything you need to manage it confidently. Plus 90 days of free support, included with every project.",
  },
]

function Process() {
  const ref = useFadeUp()
  return (
    <section id="process" className="py-24 md:py-32" style={{ borderTop: '1px solid var(--c-border)', background: 'var(--c-bg-card)' }}>
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="fade-up mb-14" ref={ref}>
          <div className="text-[10.5px] font-bold tracking-[2.5px] uppercase mb-4" style={{ color: 'var(--c-accent)' }}>How We Work</div>
          <h2 className="font-black tracking-[-1.5px] mb-4 leading-[1.07]" style={{ color: 'var(--c-text)', fontSize: 'clamp(28px, 4vw, 46px)' }}>
            Simple, transparent, and built around you
          </h2>
          <p className="text-[15.5px] leading-relaxed max-w-[500px]" style={{ color: 'var(--c-text-2)' }}>
            No jargon, no runarounds. Here is exactly how we go from your first message to a live, working product.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, i) => {
            const ref2 = useFadeUp(i * 100)
            const { Icon } = step
            return (
              <div key={step.num} ref={ref2}
                className="fade-up rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300"
                style={{ background: 'var(--c-bg-elevated)', border: '1px solid var(--c-border)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--c-accent-ring)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--c-border)'; e.currentTarget.style.transform = 'translateY(0)' }}>
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: 'var(--c-accent-glow)', border: '1px solid var(--c-accent-ring)', color: 'var(--c-accent)' }}>
                    <Icon size={18} />
                  </div>
                  <span className="text-[11px] font-bold tracking-[2px] uppercase" style={{ color: 'var(--c-text-3)' }}>{step.num}</span>
                </div>
                <div>
                  <h3 className="font-bold text-[15px] mb-1 tracking-[-0.2px]" style={{ color: 'var(--c-text)' }}>{step.title}</h3>
                  <span className="inline-flex items-center gap-1 text-[11.5px] font-semibold px-2.5 py-0.5 rounded-full mb-3"
                    style={{ background: 'var(--c-accent-glow)', color: 'var(--c-accent)' }}>
                    <Clock size={10} /> {step.time}
                  </span>
                  <p className="text-[13px] leading-relaxed" style={{ color: 'var(--c-text-2)' }}>{step.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    stars: 5,
    quote: "We had a rough-looking website built years ago that was losing us customers — we just did not know it. Worklabs redesigned the whole thing in 12 days, and our online enquiries tripled within the first month. The difference was immediate.",
    name: 'Ahmed Al-Farsi',
    role: 'Owner',
    business: 'Al-Noor Restaurant & Catering',
    result: 'Enquiries tripled in 30 days',
    color: '#5b6cf9',
    initials: 'AA',
  },
  {
    stars: 5,
    quote: "I had been putting off getting a booking app because I thought it would be expensive and take months. Worklabs delivered a fully working iOS and Android app in 5 weeks for a price I could actually afford. Our no-shows dropped by 40%.",
    name: 'Sara Malik',
    role: 'Founder & Owner',
    business: 'Glow Beauty & Wellness Studio',
    result: '40% reduction in no-shows',
    color: '#a855f7',
    initials: 'SM',
  },
  {
    stars: 5,
    quote: "We were tracking stock on paper and it was costing us thousands in errors every month. Worklabs built us a custom inventory dashboard in 6 weeks. It pays for itself every single month. Best investment we have made in years.",
    name: 'James Okonkwo',
    role: 'Operations Director',
    business: 'Oakfield Hardware & Supplies',
    result: 'Eliminated £3,000/mo in errors',
    color: '#22c55e',
    initials: 'JO',
  },
]

function Testimonials() {
  const ref = useFadeUp()
  return (
    <section id="testimonials" className="py-24 md:py-32" style={{ borderTop: '1px solid var(--c-border)' }}>
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="fade-up mb-14" ref={ref}>
          <div className="text-[10.5px] font-bold tracking-[2.5px] uppercase mb-4" style={{ color: 'var(--c-accent)' }}>Client Results</div>
          <h2 className="font-black tracking-[-1.5px] mb-4 leading-[1.07]" style={{ color: 'var(--c-text)', fontSize: 'clamp(28px, 4vw, 46px)' }}>
            Real businesses. Real results.
          </h2>
          <p className="text-[15.5px] leading-relaxed max-w-[480px]" style={{ color: 'var(--c-text-2)' }}>
            Every client you see below started where you are now. Here is what happened next.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => {
            const ref2 = useFadeUp(i * 110)
            return (
              <div key={t.name} ref={ref2}
                className="fade-up flex flex-col rounded-2xl p-7 transition-all duration-300 cursor-default"
                style={{ background: 'var(--c-bg-card)', border: '1px solid var(--c-border)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--c-border-hover)'; e.currentTarget.style.transform = 'translateY(-3px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--c-border)'; e.currentTarget.style.transform = 'translateY(0)' }}>
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.stars }).map((_, i) => <Star key={i} size={13} fill="#f59e0b" color="#f59e0b" />)}
                </div>
                {/* Quote */}
                <p className="text-[13.5px] leading-relaxed italic mb-5 flex-1" style={{ color: 'var(--c-text-2)' }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                {/* Result badge */}
                <div className="flex items-center gap-1.5 text-[11.5px] font-bold px-3 py-1.5 rounded-full mb-5 self-start"
                  style={{ background: 'rgba(34,197,94,0.1)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.2)' }}>
                  <TrendingUp size={11} /> {t.result}
                </div>
                {/* Author */}
                <div className="flex items-center gap-3" style={{ borderTop: '1px solid var(--c-border)', paddingTop: '16px' }}>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                    style={{ background: t.color }}>
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold" style={{ color: 'var(--c-text)' }}>{t.name}</div>
                    <div className="text-[11.5px]" style={{ color: 'var(--c-text-3)' }}>{t.role} · {t.business}</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: 'How much does a project cost?',
    a: "Project pricing depends on scope and complexity. A professional website typically starts from $800. Mobile apps start from $3,500. Custom software from $2,500. We provide a fixed-price quote before any work begins — you will never receive a surprise invoice.",
  },
  {
    q: 'How long does it take to build my website or app?',
    a: "Most websites are delivered in 10–14 business days. Mobile apps typically take 4–8 weeks. Custom software ranges from 3–12 weeks depending on complexity. We will give you an exact timeline in your proposal.",
  },
  {
    q: 'Do I own the code and design after delivery?',
    a: "Absolutely. Once the project is paid in full, you own 100% of the code, design files, content, and all related assets. No licensing fees, no lock-in. It is yours to keep, host anywhere, and develop further with anyone.",
  },
  {
    q: 'Can you work with my existing website or systems?',
    a: "Yes. We regularly integrate with existing platforms, migrate content from old systems, and build on top of existing infrastructure. Send us what you have and we will tell you exactly what is possible.",
  },
  {
    q: 'What happens after my project launches?',
    a: "Every project includes 90 days of free post-launch support — bug fixes, minor content updates, and technical guidance. After that, you can choose one of our affordable monthly maintenance plans or manage things yourself. We never hold your project hostage.",
  },
  {
    q: 'Do you only work with local businesses?',
    a: "Our specialty and passion is helping local and small businesses grow through technology. That said, we work with any business that values a close working relationship, honest communication, and quality craftsmanship over volume.",
  },
]

function FAQ() {
  const ref = useFadeUp()
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section id="faq" className="py-24 md:py-28" style={{ borderTop: '1px solid var(--c-border)', background: 'var(--c-bg-card)' }}>
      <div className="max-w-3xl mx-auto px-6 md:px-10">
        <div className="fade-up text-center mb-12" ref={ref}>
          <div className="text-[10.5px] font-bold tracking-[2.5px] uppercase mb-4" style={{ color: 'var(--c-accent)' }}>FAQ</div>
          <h2 className="font-black tracking-[-1.5px] mb-3" style={{ color: 'var(--c-text)', fontSize: 'clamp(26px, 4vw, 40px)' }}>
            Common questions, answered honestly
          </h2>
          <p className="text-[15px] leading-relaxed" style={{ color: 'var(--c-text-2)' }}>
            No corporate non-answers here. Just straight, useful information.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {FAQS.map((faq, i) => {
            const ref2 = useFadeUp(i * 60)
            const isOpen = open === i
            return (
              <div key={i} ref={ref2}
                className="fade-up rounded-xl overflow-hidden transition-all duration-200"
                style={{ border: `1px solid ${isOpen ? 'var(--c-accent-ring)' : 'var(--c-border)'}`, background: 'var(--c-bg-elevated)' }}>
                <button onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer bg-transparent border-none"
                  style={{ color: 'var(--c-text)' }}>
                  <span className="text-[14.5px] font-semibold pr-4">{faq.q}</span>
                  <ChevronDown size={16} style={{ color: 'var(--c-text-3)', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease', flexShrink: 0 }} />
                </button>
                <div className={`faq-body ${isOpen ? 'open' : ''}`}>
                  <p className="px-5 pb-5 text-[13.5px] leading-relaxed" style={{ color: 'var(--c-text-2)' }}>{faq.a}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── Contact Form ─────────────────────────────────────────────────────────────
function Contact() {
  const ref = useFadeUp()
  const { dark } = useTheme()
  const [submitted, setSubmitted] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const [form, setForm] = useState({ name: '', email: '', phone: '', business: '', service: '', budget: '', message: '' })
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const iStyle: React.CSSProperties = {
    background: 'var(--c-bg)',
    border: '1px solid var(--c-border)',
    color: 'var(--c-text)',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '14px',
    outline: 'none',
    width: '100%',
    borderRadius: '8px',
    padding: '10px 14px',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  }
  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = 'var(--c-accent)'
    e.target.style.boxShadow = '0 0 0 3px var(--c-accent-glow)'
  }
  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = 'var(--c-border)'
    e.target.style.boxShadow = 'none'
  }

  return (
    <section id="contact" className="py-24 md:py-32" style={{ borderTop: '1px solid var(--c-border)' }}>
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left */}
          <div className="fade-up lg:sticky lg:top-24" ref={ref}>
            <div className="text-[10.5px] font-bold tracking-[2.5px] uppercase mb-4" style={{ color: 'var(--c-accent)' }}>Get in Touch</div>
            <h2 className="font-black tracking-[-1.5px] mb-4 leading-[1.07]" style={{ color: 'var(--c-text)', fontSize: 'clamp(28px, 4vw, 44px)' }}>
              Tell us about your project.<br className="hidden sm:block" /> We'll take it from there.
            </h2>
            <p className="text-[15.5px] leading-relaxed mb-10" style={{ color: 'var(--c-text-2)' }}>
              Fill out the form and you will hear back within one business day with a personal response
              not an automated email. We review every inquiry carefully before responding.
            </p>

            <div className="flex flex-col gap-4 mb-10">
              {[
                { Icon: Clock, text: 'Response within 1 business day guaranteed' },
                { Icon: Phone, text: 'Free 30 minute discovery call with your quote' },
                { Icon: FileText, text: 'Detailed written proposal & fixed price included' },
                { Icon: Lock, text: 'Your information is never shared with third parties' },
              ].map(item => (
                <div key={item.text} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'var(--c-accent-glow)', border: '1px solid var(--c-accent-ring)', color: 'var(--c-accent)' }}>
                    <item.Icon size={15} />
                  </div>
                  <span className="text-[13.5px] font-medium" style={{ color: 'var(--c-text-2)' }}>{item.text}</span>
                </div>
              ))}
            </div>

            {/* Contact links */}
            <div className="rounded-2xl p-5 flex flex-col gap-4" style={{ background: 'var(--c-bg-card)', border: '1px solid var(--c-border)' }}>
              <p className="text-[12px] font-semibold uppercase tracking-widest" style={{ color: 'var(--c-text-3)' }}>Prefer to reach us directly?</p>
              <a href="mailto:support@worklabs.studio"
                className="flex items-center gap-3 transition-opacity duration-200 hover:opacity-70 group"
                style={{ textDecoration: 'none' }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'var(--c-accent-glow)', border: '1px solid var(--c-accent-ring)', color: 'var(--c-accent)' }}>
                  <Mail size={15} />
                </div>
                <div>
                  <div className="text-[11.5px]" style={{ color: 'var(--c-text-3)' }}>Email us</div>
                  <div className="text-[14px] font-semibold" style={{ color: 'var(--c-text)' }}>support@worklabs.studio</div>
                </div>
                <ArrowUpRight size={14} style={{ color: 'var(--c-text-3)', marginLeft: 'auto' }} />
              </a>
              <a href="https://wa.me/917090238251" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 transition-opacity duration-200 hover:opacity-70"
                style={{ textDecoration: 'none' }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.2)', color: '#25d366' }}>
                  <MessageCircle size={15} />
                </div>
                <div>
                  <div className="text-[11.5px]" style={{ color: 'var(--c-text-3)' }}>WhatsApp (fastest response)</div>
                  <div className="text-[14px] font-semibold" style={{ color: 'var(--c-text)' }}>Chat with us now</div>
                </div>
                <ArrowUpRight size={14} style={{ color: 'var(--c-text-3)', marginLeft: 'auto' }} />
              </a>
            </div>
          </div>

          {/* Right — Form */}
          <div className="rounded-2xl p-7 sm:p-9" style={{ background: 'var(--c-bg-card)', border: '1px solid var(--c-border)' }}>
            {submitted ? (
              <div className="text-center py-14">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                  style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)' }}>
                  <CheckCircle size={28} color="#22c55e" />
                </div>
                <h3 className="font-black text-[22px] tracking-tight mb-3" style={{ color: 'var(--c-text)' }}>
                  Request received — thank you!
                </h3>
                <p className="text-[14px] leading-relaxed" style={{ color: 'var(--c-text-2)' }}>
                  We have received your inquiry. A real member of our team will read it carefully
                  and respond within one business day with next steps.
                </p>
                <p className="text-[13px] mt-4 font-medium" style={{ color: 'var(--c-text-3)' }}>
                  Need something urgent? Email us at{' '}
                  <a href="mailto:support@worklabs.studio" style={{ color: 'var(--c-accent)' }}>support@worklabs.studio</a>
                </p>
              </div>
            ) : (
              <form id="consulting-form" onSubmit={async (e) => {
                e.preventDefault()
                if (!turnstileToken) {
                  alert('Please complete the CAPTCHA verification.')
                  return
                }
                const btn = document.getElementById('submit-text')
                if (btn) btn.innerText = 'Sending...'
                try {
                  const res = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...form, turnstileToken })
                  })
                  if (res.ok) setSubmitted(true)
                  else alert('Something went wrong. Please try again.')
                } catch (err) {
                  alert('Could not connect to server. Please try again later.')
                } finally {
                  if (btn && !submitted) btn.innerText = 'Send My Request'
                }
              }} noValidate>
                <h3 className="font-black text-[18px] tracking-tight mb-1" style={{ color: 'var(--c-text)' }}>Request a free quote</h3>
                <p className="text-[13px] mb-6" style={{ color: 'var(--c-text-3)' }}>We respond to every inquiry within 1 business day.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {[
                    { id: 'name', label: 'Full Name *', type: 'text', ph: 'John Smith' },
                    { id: 'email', label: 'Email Address *', type: 'email', ph: 'john@yourbusiness.com' },
                  ].map(f => (
                    <div key={f.id}>
                      <label htmlFor={f.id} className="block text-[11.5px] font-semibold mb-2" style={{ color: 'var(--c-text-2)' }}>{f.label}</label>
                      <input id={f.id} name={f.id} type={f.type} placeholder={f.ph} required style={iStyle}
                        value={(form as Record<string, string>)[f.id]} onChange={onChange} onFocus={onFocus} onBlur={onBlur} />
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {[
                    { id: 'phone', label: 'Phone / WhatsApp', type: 'tel', ph: '+91 70902 38251' },
                    { id: 'business', label: 'Business Name', type: 'text', ph: 'Your Business Ltd.' },
                  ].map(f => (
                    <div key={f.id}>
                      <label htmlFor={f.id} className="block text-[11.5px] font-semibold mb-2" style={{ color: 'var(--c-text-2)' }}>{f.label}</label>
                      <input id={f.id} name={f.id} type={f.type} placeholder={f.ph} style={iStyle}
                        value={(form as Record<string, string>)[f.id]} onChange={onChange} onFocus={onFocus} onBlur={onBlur} />
                    </div>
                  ))}
                </div>

                <div className="mb-4">
                  <label htmlFor="service" className="block text-[11.5px] font-semibold mb-2" style={{ color: 'var(--c-text-2)' }}>What do you need? *</label>
                  <select id="service" name="service" required style={{ ...iStyle, cursor: 'pointer' }}
                    value={form.service} onChange={onChange} onFocus={onFocus} onBlur={onBlur}>
                    <option value="" disabled>Select a service...</option>
                    <option value="website">Website Design & Development</option>
                    <option value="app">Mobile App (iOS & Android)</option>
                    <option value="software">Custom Software / Internal Tool</option>
                    <option value="ecommerce">E-commerce Online Store</option>
                    <option value="support">IT Support & Maintenance</option>
                    <option value="strategy">Digital Strategy Consultation (Free)</option>
                    <option value="other">Not sure yet — I need advice</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="budget" className="block text-[11.5px] font-semibold mb-2" style={{ color: 'var(--c-text-2)' }}>Your budget range</label>
                  <select id="budget" name="budget" style={{ ...iStyle, cursor: 'pointer' }}
                    value={form.budget} onChange={onChange} onFocus={onFocus} onBlur={onBlur}>
                    <option value="" disabled>Select a budget range...</option>
                    <option value="under-1k">Under $1,000</option>
                    <option value="1k-3k">$1,000 – $3,000</option>
                    <option value="3k-7k">$3,000 – $7,000</option>
                    <option value="7k-plus">$7,000+</option>
                    <option value="unsure">Not sure — need guidance</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-[11.5px] font-semibold mb-2" style={{ color: 'var(--c-text-2)' }}>Tell us about your project *</label>
                  <textarea id="message" name="message" required rows={4}
                    placeholder="What does your business do? What problem are you trying to solve? Any specific features, deadlines, or existing systems we should know about?"
                    style={{ ...iStyle, resize: 'none' }} value={form.message} onChange={onChange} onFocus={onFocus} onBlur={onBlur} />
                </div>
                
                <div className="mb-6 flex justify-center">
                  <Turnstile 
                    siteKey="0x4AAAAAAD0FO8obajLmm3xs" 
                    onSuccess={(token) => setTurnstileToken(token)} 
                    options={{ theme: dark ? 'dark' : 'light' }}
                  />
                </div>

                <button id="form-submit-btn" type="submit"
                  className="w-full flex items-center justify-center gap-2 text-white text-sm font-semibold py-3.5 rounded-xl cursor-pointer border-none transition-all duration-200 hover:-translate-y-0.5"
                  style={{ background: 'var(--c-accent)' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--c-accent-h)'; e.currentTarget.style.boxShadow = '0 8px 24px var(--c-accent-ring)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'var(--c-accent)'; e.currentTarget.style.boxShadow = 'none' }}>
                  <span id="submit-text">Send My Request</span> <ArrowRight size={15} />
                </button>
                <p className="text-center text-[12px] mt-3" style={{ color: 'var(--c-text-3)' }}>
                  100% free, no commitment. We respond within 1 business day.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const to = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  return (
    <footer style={{ borderTop: '1px solid var(--c-border)', background: 'var(--c-bg-card)' }} className="pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="sm:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <WorkLabsLogo height={24} />
              <span className="font-black text-[17px] tracking-[-0.5px]" style={{ color: 'var(--c-text)' }}>Work Labs</span>
            </div>
            <p className="text-[13.5px] leading-relaxed mb-5 max-w-xs" style={{ color: 'var(--c-text-3)' }}>
              IT consulting and digital solutions for local businesses. We help you compete and grow through technology that actually works websites, apps, and software built to last.
            </p>
            <a href="mailto:support@worklabs.studio"
              className="inline-flex items-center gap-2 text-[13px] font-medium transition-opacity hover:opacity-70"
              style={{ color: 'var(--c-accent)', textDecoration: 'none' }}>
              <Mail size={14} /> support@worklabs.studio
            </a>
            <div className="flex flex-col gap-2 mt-4">
              <a href="tel:+917090238251"
                className="inline-flex items-center gap-2 text-[13px] font-medium transition-opacity hover:opacity-70"
                style={{ color: 'var(--c-text-2)', textDecoration: 'none' }}>
                <Phone size={14} /> +91-7090238251
              </a>
              <div className="inline-flex items-center gap-2 text-[13px] font-medium" style={{ color: 'var(--c-text-2)' }}>
                <MapPin size={14} /> Bengaluru, Karnataka, India
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <div className="text-[10.5px] font-bold tracking-widest uppercase mb-5" style={{ color: 'var(--c-text-3)' }}>Services</div>
            <ul className="flex flex-col gap-3 list-none">
              {['Website Development', 'Mobile App Development', 'Custom Software', 'E-commerce', 'IT Support', 'Digital Strategy'].map(s => (
                <li key={s}>
                  <button onClick={() => to('services')}
                    className="text-[13px] cursor-pointer bg-transparent border-none text-left transition-all duration-200"
                    style={{ color: 'var(--c-text-2)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--c-text)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--c-text-2)')}>
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <div className="text-[10.5px] font-bold tracking-widest uppercase mb-5" style={{ color: 'var(--c-text-3)' }}>Company</div>
            <ul className="flex flex-col gap-3 list-none">
              {[['About Work Labs', 'why-us'], ['How We Work', 'process'], ['Live Demos', 'demos'], ['Client Results', 'testimonials'], ['FAQ', 'faq'], ['Get a Quote', 'contact']].map(([label, id]) => (
                <li key={id}>
                  <button onClick={() => to(id)}
                    className="text-[13px] cursor-pointer bg-transparent border-none text-left transition-all duration-200"
                    style={{ color: 'var(--c-text-2)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--c-text)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--c-text-2)')}>
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderTop: '1px solid var(--c-border)' }}>
          <span className="text-[12px]" style={{ color: 'var(--c-text-3)' }}>
            © {new Date().getFullYear()} WorkLabs. All rights reserved.
          </span>
          <span className="text-[12px]" style={{ color: 'var(--c-text-3)' }}>
            Built by the Work Labs team · <a href="mailto:support@worklabs.studio" style={{ color: 'var(--c-text-2)' }}>support@worklabs.studio</a>
          </span>
        </div>
      </div>
    </footer>
  )
}

// ─── WhatsApp Button ──────────────────────────────────────────────────────────
function WhatsAppButton() {
  const number = '917090238251'
  const msg = encodeURIComponent("Hi Worklabs! I found your website and I'd like to discuss a project. Can we talk?")
  return (
    <a id="whatsapp-floating-btn"
      href={`https://wa.me/${number}?text=${msg}`}
      target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 text-white text-[13.5px] font-semibold px-4 sm:px-5 py-3.5 rounded-full transition-all duration-250 hover:-translate-y-1"
      style={{ background: '#25d366', boxShadow: '0 4px 20px rgba(37,211,102,0.4)' }}
      onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 30px rgba(37,211,102,0.55)')}
      onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 20px rgba(37,211,102,0.4)')}>
      <span className="absolute inset-0 rounded-full wa-ping" style={{ border: '2px solid rgba(37,211,102,0.45)' }} />
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 flex-shrink-0">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
      <span className="hidden sm:inline">Chat on WhatsApp</span>
    </a>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('wl-theme')
    if (saved === 'light') setDark(false)
  }, [])

  const toggle = () => setDark(d => {
    const next = !d
    localStorage.setItem('wl-theme', next ? 'dark' : 'light')
    return next
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    document.documentElement.classList.toggle('light', !dark)
  }, [dark])

  return (
    <ThemeCtx.Provider value={{ dark, toggle }}>
      <div style={{ minHeight: '100vh', background: 'var(--c-bg)', color: 'var(--c-text)', transition: 'background 0.35s, color 0.35s' }}>
        <Navbar />
        <main>
          <Hero />
          <IndustriesTicker />
          <InteractiveDemos />
          <Services />
          <NumbersSection />
          <WhyUs />
          <Process />
          <Testimonials />
          <FAQ />
          <Contact />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </ThemeCtx.Provider>
  )
}
