'use client';
import { useState, useEffect, useRef } from 'react';
import {
  Zap, Award, Users, Clock, MapPin, Phone, Mail, Star,
  ChevronRight, Play, Shield, Target, Heart, CheckCircle,
  Calendar, IndianRupee, Camera, Trophy, Send, Menu, X
} from 'lucide-react';
import Link from 'next/link';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Facilities', href: '#facilities' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Plans', href: '#pricing' },
  { label: 'Student Stories', href: '#testimonials' },
  { label: 'Contacts', href: '#contact' },
];

function InlineNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'glass-strong shadow-lg' : 'bg-transparent'}`} style={{ width: '100%', borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>

          {/* Logo & Club Name (Left) */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none', flexShrink: 0 }}>
            <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #6366f1, #f59e0b)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={22} color="white" strokeWidth={2.5} />
            </div>
            <div>
              <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.2rem', color: '#f9fafb', lineHeight: 1 }}>Triangle</div>
              <div style={{ fontSize: '0.65rem', color: '#9ca3af', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Sports Academy</div>
            </div>
          </Link>

          {/* Nav Links (Right) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div className="desktop-menu" style={{ alignItems: 'center', gap: '0.25rem' }}>
              {navLinks.map(link => (
                <a key={link.href} href={link.href} className="nav-link" style={{ padding: '0.5rem 0.75rem', borderRadius: '0.5rem', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>
                  {link.label}
                </a>
              ))}
            </div>

            {/* Login CTA */}
            <div className="desktop-menu" style={{ marginLeft: '1rem', paddingLeft: '1rem', borderLeft: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center' }}>
              <Link href="/login" className="btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem', textDecoration: 'none' }}>
                Login
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button style={{ background: scrolled ? '#1f2937' : 'transparent', border: scrolled ? '1px solid #374151' : '1px solid rgba(255,255,255,0.3)', color: '#f9fafb', cursor: 'pointer', padding: '0.5rem', borderRadius: '0.5rem', marginLeft: '1rem' }} className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`mobile-menu-dropdown ${menuOpen ? 'open' : ''}`}>
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {navLinks.map(link => (
            <a key={link.href} href={link.href} className="nav-link" style={{ padding: '0.75rem 1rem', display: 'block', borderRadius: '0.75rem', background: 'rgba(255,255,255,0.03)' }} onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
          <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #1f2937' }}>
            <Link href="/login" className="btn-primary" style={{ display: 'block', width: '100%', textAlign: 'center', padding: '0.75rem 1.5rem', textDecoration: 'none' }} onClick={() => setMenuOpen(false)}>
              Login to Dashboard
            </Link>
          </div>
        </div>
      </div>

      {menuOpen && <div style={{ position: 'fixed', inset: 0, top: '72px', background: 'rgba(0,0,0,0.5)', zIndex: 30 }} onClick={() => setMenuOpen(false)} className="mobile-toggle" />}
    </nav>
  );
}



const stats = [
  { value: '500+', label: 'Students Trained', icon: Users },
  { value: '15+', label: 'Expert Coaches', icon: Award },
  { value: '8', label: 'Professional Courts', icon: Shield },
  { value: '10+', label: 'Years Experience', icon: Target },
];

const facilities = [
  { icon: Shield, title: 'World-Class Facility', desc: 'International-standard courts and infrastructure with professional lighting' },
  { icon: Heart, title: 'Fitness Center', desc: 'Fully equipped gym dedicated to athletic & sports-specific training' },
  { icon: Target, title: 'Video Analysis', desc: 'Advanced video analysis tools to perfect your technique' },
  { icon: Award, title: 'Coaching Excellence', desc: 'State-certified coaches with national & international experience' },
  { icon: Users, title: 'Group & Private', desc: 'Flexible group batches and one-on-one personalized training' },
  { icon: Trophy, title: 'Tournament Prep', desc: 'Regular in-house tournaments and competition preparation' },
];

const batches = [
  { time: 'Morning Batch A', hours: '6:00 AM – 8:00 AM', days: 'Mon – Sat', color: '#6366f1' },
  { time: 'Morning Batch B', hours: '8:00 AM – 10:00 AM', days: 'Mon – Sat', color: '#f59e0b' },
  { time: 'Evening Batch A', hours: '4:00 PM – 6:00 PM', days: 'Mon – Sat', color: '#10b981' },
  { time: 'Evening Batch B', hours: '6:00 PM – 8:00 PM', days: 'Mon – Sat', color: '#3b82f6' },
];

const pricing = [
  { plan: 'Beginner', price: 1200, features: ['Group training', '6 days/week', 'Basic equipment', 'Progress tracking'], popular: false, color: '#10b981' },
  { plan: 'Intermediate', price: 1500, features: ['Group training', '6 days/week', 'Equipment provided', 'Video feedback', 'Monthly assessment'], popular: true, color: '#6366f1' },
  { plan: 'Advanced', price: 2000, features: ['Advanced coaching', '6 days/week', 'Premium equipment', 'Tournament prep', 'Performance reports'], popular: false, color: '#f59e0b' },
  { plan: 'Professional', price: 3000, features: ['1-on-1 training', 'Flexible schedule', 'All equipment', 'Tournament entry', 'Nutrition guidance', 'Video analysis'], popular: false, color: '#ef4444' },
];

const testimonials = [
  { name: 'Kiran Desai', age: 17, rating: 5, text: 'Triangle Sports Academy transformed my game completely! The coaches here are incredibly dedicated and the facilities are world-class. I went from beginner to state-level in just 18 months.', batch: 'Advanced Batch' },
  { name: 'Meera Pillai', age: 14, rating: 5, text: 'The best decision our family made! My daughter loves coming to practice every day. The coaches make learning fun and the progress is visible.', batch: 'Beginner Batch' },
  { name: 'Aryan Kapoor', age: 22, rating: 5, text: 'Professional training environment with coaches who truly care. The video analysis sessions have helped me correct technique flaws I\'ve had for years.', batch: 'Professional Batch' },
  { name: 'Sita Rao', age: 16, rating: 5, text: 'Won my first district tournament after just a year here. The tournament prep program is exceptional and the team spirit is amazing!', batch: 'Intermediate Batch' },
];

const galleryItems = [
  { label: 'Training Session', color: '#6366f1', icon: '🏸' },
  { label: 'Court View', color: '#f59e0b', icon: '🏟️' },
  { label: 'Tournament Day', color: '#10b981', icon: '🏆' },
  { label: 'Group Training', color: '#3b82f6', icon: '👥' },
  { label: 'Youth Championship', color: '#ef4444', icon: '🥇' },
  { label: 'Coaching Session', color: '#8b5cf6', icon: '🎯' },
];

const coaches = [
  { name: 'Coach Rajan Pillai', role: 'Head Coach', exp: '15 years', achievement: 'State Champion 2010, National Level Coach', color: '#6366f1' },
  { name: 'Coach Preethi Nair', role: 'Juniors Coach', exp: '8 years', achievement: 'U-18 National Medalist, Certified BWF Coach', color: '#f59e0b' },
  { name: 'Coach Suresh Babu', role: 'Fitness Coach', exp: '10 years', achievement: 'Sports Science Degree, Elite Athlete Trainer', color: '#10b981' },
];

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        let start = 0;
        const step = target / 50;
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { setCount(target); clearInterval(timer); } else { setCount(Math.floor(start)); }
        }, 30);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <div ref={ref}>{count}{suffix}</div>;
}

export default function HomePage() {
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', age: '', batch: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', phone: '', age: '', batch: '', message: '' });
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a1a' }}>
      <InlineNavbar />

      {/* ─── HERO ─── */}
      <section id="home" className="hero-gradient stars-bg" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', paddingTop: '72px' }}>
        {/* Background orbs */}
        <div style={{ position: 'absolute', top: '10%', right: '5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '10%', left: '5%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

        <div className="hero-grid" style={{ maxWidth: '1280px', margin: '0 auto', padding: '4rem 1.5rem', display: 'grid', gap: '4rem', alignItems: 'center', width: '100%' }}>
          <div className="animate-fade-in hero-content">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '9999px', padding: '0.4rem 1rem', marginBottom: '1.5rem' }}>
              <Zap size={14} color="#818cf8" />
              <span style={{ fontSize: '0.8rem', color: '#818cf8', fontWeight: 600 }}>India&apos;s Premier Multi-Sport Academy</span>
            </div>
            <h1 className="hero-title" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, lineHeight: 1.1, marginBottom: '1.5rem' }}>
              <span style={{ color: '#f9fafb' }}>Master the</span>{' '}
              <span className="gradient-text">Art of</span>{' '}
              <span style={{ color: '#f9fafb' }}>Badminton</span>
            </h1>
            <p className="hero-description" style={{ fontSize: '1.15rem', color: '#9ca3af', lineHeight: 1.7, marginBottom: '2.5rem', maxWidth: '480px' }}>
              Join Triangle Sports Academy — where champions are forged through expert coaching, world-class facilities, and a passion for excellence.
            </p>
            <div className="hero-btns">
              <a href="#register" className="btn-primary animate-pulse-glow hero-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                Start Training <ChevronRight size={18} />
              </a>
              <a href="#gallery" className="btn-secondary hero-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                <Play size={18} /> View Gallery
              </a>
            </div>
            {/* Trust badges */}
            <div style={{ display: 'flex', gap: '2rem', marginTop: '3rem', flexWrap: 'wrap' }}>
              {['BWF Certified', 'State Recognized', 'Award Winning'].map(badge => (
                <div key={badge} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#9ca3af', fontSize: '0.85rem' }}>
                  <CheckCircle size={16} color="#10b981" />
                  {badge}
                </div>
              ))}
            </div>
          </div>

          {/* Hero visual */}
          <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }} className="animate-fade-in delay-300 hero-visual">
            <div className="animate-float orbit-container" style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(245,158,11,0.2))', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid rgba(99,102,241,0.2)', position: 'relative' }}>
              <div className="shuttle-icon">🏸</div>
              {/* Orbit stats */}
              {stats.map((stat, i) => {
                const angles = [0, 90, 180, 270];
                const angle = (angles[i] * Math.PI) / 180;
                return (
                  <div key={stat.label} className="glass orbit-stat" style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    borderRadius: '1rem',
                    padding: '0.6rem 0.9rem',
                    textAlign: 'center',
                    transform: `translate(calc(-50% + cos(${angles[i]}deg) * var(--orbit-radius)), calc(-50% + sin(${angles[i]}deg) * var(--orbit-radius)))`
                  }}>
                    <div style={{ fontSize: 'var(--orbit-stat-size)', fontWeight: 800, color: '#818cf8', fontFamily: 'Outfit, sans-serif' }}>{stat.value}</div>
                    <div className="orbit-stat-label" style={{ color: '#9ca3af' }}>{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', color: '#6b7280', fontSize: '0.75rem' }}>
          <span>Scroll to explore</span>
          <div style={{ width: '24px', height: '40px', border: '2px solid #374151', borderRadius: '12px', display: 'flex', justifyContent: 'center', paddingTop: '6px' }}>
            <div style={{ width: '4px', height: '8px', background: '#6366f1', borderRadius: '2px', animation: 'float 1.5s ease-in-out infinite' }} />
          </div>
        </div>
      </section>

      {/* ─── STATS BAR ─── */}
      <div style={{ background: 'linear-gradient(135deg, #1e1b4b, #111827)', borderTop: '1px solid rgba(99,102,241,0.2)', borderBottom: '1px solid rgba(99,102,241,0.2)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2.5rem 1.5rem', display: 'grid', gap: '1.5rem', textAlign: 'center' }} className="stats-grid">
          {stats.map((stat, i) => (
            <div key={stat.label} style={{ borderRight: i < 3 ? '1px solid rgba(99,102,241,0.2)' : 'none', padding: '0.5rem' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, fontFamily: 'Outfit, sans-serif', color: '#818cf8' }}>
                {stat.value}
              </div>
              <div style={{ color: '#9ca3af', fontSize: '0.9rem', marginTop: '0.25rem' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── ABOUT ─── */}
      <section id="about" className="section-padding" style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)', borderRadius: '9999px', padding: '0.4rem 1rem', marginBottom: '1rem' }}>
            <Award size={14} color="#f59e0b" />
            <span style={{ fontSize: '0.8rem', color: '#f59e0b', fontWeight: 600 }}>Our Expert Team</span>
          </div>
          <h2 className="section-title">Meet Our Coaches</h2>
          <p style={{ color: '#9ca3af', maxWidth: '600px', margin: '0 auto', lineHeight: 1.7 }}>Our coaches bring decades of competitive experience and a passion for developing the next generation of badminton champions.</p>
        </div>
        <div style={{ display: 'grid', gap: '2rem' }} className="coaches-grid">
          {coaches.map((coach, i) => (
            <div key={coach.name} className="card animate-fade-in" style={{ animationDelay: `${i * 0.15}s`, textAlign: 'center', padding: '2.5rem 2rem' }}>
              <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: `linear-gradient(135deg, ${coach.color}, ${coach.color}88)`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '3rem', border: `3px solid ${coach.color}44` }}>
                👨‍🏫
              </div>
              <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.3rem', fontWeight: 700, color: '#f9fafb', marginBottom: '0.4rem' }}>{coach.name}</h3>
              <div style={{ color: coach.color, fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.75rem' }}>{coach.role}</div>
              <div style={{ color: '#9ca3af', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Experience: {coach.exp}</div>
              <div style={{ color: '#6b7280', fontSize: '0.8rem', fontStyle: 'italic' }}>{coach.achievement}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" style={{ maxWidth: '1280px', margin: '0 auto' }} />

      {/* ─── FACILITIES ─── */}
      <section id="facilities" className="section-padding" style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: '9999px', padding: '0.4rem 1rem', marginBottom: '1rem' }}>
            <Shield size={14} color="#10b981" />
            <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 600 }}>World-Class Infrastructure</span>
          </div>
          <h2 className="section-title">Our Facilities</h2>
          <p style={{ color: '#9ca3af', maxWidth: '600px', margin: '0 auto', lineHeight: 1.7 }}>State-of-the-art infrastructure designed to bring out the best in every player, from beginners to professionals.</p>
        </div>
        <div className="grid-responsive-3">
          {facilities.map((f, i) => (
            <div key={f.title} className="card animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
              <div style={{ width: '52px', height: '52px', background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(99,102,241,0.05))', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', border: '1px solid rgba(99,102,241,0.2)' }}>
                <f.icon size={24} color="#818cf8" />
              </div>
              <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.1rem', fontWeight: 700, color: '#f9fafb', marginBottom: '0.5rem' }}>{f.title}</h3>
              <p style={{ color: '#9ca3af', fontSize: '0.9rem', lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" style={{ maxWidth: '1280px', margin: '0 auto' }} />

      {/* ─── GALLERY ─── */}
      <section id="gallery" className="section-padding" style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)', borderRadius: '9999px', padding: '0.4rem 1rem', marginBottom: '1rem' }}>
            <Camera size={14} color="#818cf8" />
            <span style={{ fontSize: '0.8rem', color: '#818cf8', fontWeight: 600 }}>Photo Gallery</span>
          </div>
          <h2 className="section-title">Life at Triangle Sports Academy</h2>
          <p style={{ color: '#9ca3af', maxWidth: '600px', margin: '0 auto', lineHeight: 1.7 }}>Glimpses of our vibrant academy life — training, tournaments, and team spirit.</p>
        </div>
        <div style={{ display: 'grid', gap: '1.25rem' }} className="gallery-grid">
          {galleryItems.map((item, i) => (
            <div key={item.label} className="card" style={{ height: i === 0 || i === 5 ? '240px' : '180px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: `linear-gradient(135deg, ${item.color}22, ${item.color}08)`, border: `1px solid ${item.color}33`, cursor: 'pointer', transition: 'all 0.3s ease', overflow: 'hidden', position: 'relative' }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.03)'; (e.currentTarget as HTMLDivElement).style.boxShadow = `0 20px 40px ${item.color}33`; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)'; (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; }}>
              <div style={{ fontSize: '3.5rem', marginBottom: '0.75rem' }}>{item.icon}</div>
              <div style={{ color: item.color, fontWeight: 600, fontSize: '0.9rem' }}>{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" style={{ maxWidth: '1280px', margin: '0 auto' }} />

      {/* ─── PRICING ─── */}
      <section id="pricing" className="section-padding" style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)', borderRadius: '9999px', padding: '0.4rem 1rem', marginBottom: '1rem' }}>
            <IndianRupee size={14} color="#f59e0b" />
            <span style={{ fontSize: '0.8rem', color: '#f59e0b', fontWeight: 600 }}>Affordable Plans</span>
          </div>
          <h2 className="section-title">Training Plans & Pricing</h2>
          <p style={{ color: '#9ca3af', maxWidth: '600px', margin: '0 auto', lineHeight: 1.7 }}>Transparent, flexible pricing to suit every budget and training goal.</p>
        </div>

        {/* Batch timings */}
        <div style={{ display: 'grid', gap: '1rem', marginBottom: '3rem' }} className="batches-grid">
          {batches.map(batch => (
            <div key={batch.time} className="card" style={{ textAlign: 'center', borderColor: `${batch.color}44` }}>
              <Clock size={24} color={batch.color} style={{ margin: '0 auto 0.75rem' }} />
              <div style={{ fontWeight: 700, color: '#f9fafb', fontSize: '0.95rem', marginBottom: '0.25rem' }}>{batch.time}</div>
              <div style={{ color: batch.color, fontSize: '0.85rem', fontWeight: 600 }}>{batch.hours}</div>
              <div style={{ color: '#6b7280', fontSize: '0.75rem', marginTop: '0.25rem' }}>{batch.days}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gap: '1.5rem' }} className="pricing-grid">
          {pricing.map((p, i) => (
            <div key={p.plan} className="card" style={{ border: p.popular ? `2px solid ${p.color}` : `1px solid #1f2937`, position: 'relative', padding: '2rem', animationDelay: `${i * 0.1}s` }}>
              {p.popular && (
                <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', background: `linear-gradient(135deg, ${p.color}, ${p.color}cc)`, color: 'white', padding: '0.3rem 1rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700, whiteSpace: 'nowrap' }}>
                  ⭐ Most Popular
                </div>
              )}
              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: p.color, marginBottom: '0.5rem' }}>{p.plan}</div>
              <div style={{ marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '0.9rem', color: '#9ca3af' }}>₹</span>
                <span style={{ fontSize: '2.5rem', fontWeight: 900, color: '#f9fafb', fontFamily: 'Outfit, sans-serif' }}>{p.price.toLocaleString()}</span>
                <span style={{ color: '#6b7280', fontSize: '0.85rem' }}>/month</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.75rem' }}>
                {p.features.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#d1d5db' }}>
                    <CheckCircle size={14} color={p.color} />
                    {f}
                  </div>
                ))}
              </div>
              <a href="#register" style={{ display: 'block', textAlign: 'center', padding: '0.75rem', borderRadius: '0.75rem', background: p.popular ? `linear-gradient(135deg, ${p.color}, ${p.color}cc)` : 'rgba(255,255,255,0.05)', color: p.popular ? 'white' : p.color, textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem', border: `1px solid ${p.color}44`, transition: 'all 0.2s ease' }}>
                Get Started
              </a>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" style={{ maxWidth: '1280px', margin: '0 auto' }} />

      {/* ─── TESTIMONIALS ─── */}
      <section className="section-padding" style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: '9999px', padding: '0.4rem 1rem', marginBottom: '1rem' }}>
            <Star size={14} color="#10b981" />
            <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 600 }}>Student Stories</span>
          </div>
          <h2 className="section-title">What Our Students Say</h2>
        </div>
        <div style={{ display: 'grid', gap: '1.5rem' }} className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div key={t.name} className="card" style={{ padding: '2rem', animationDelay: `${i * 0.1}s` }}>
              <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1rem' }}>
                {[...Array(t.rating)].map((_, j) => <Star key={j} size={16} color="#f59e0b" fill="#f59e0b" />)}
              </div>
              <p style={{ color: '#d1d5db', lineHeight: 1.7, fontStyle: 'italic', marginBottom: '1.5rem', fontSize: '0.95rem' }}>&ldquo;{t.text}&rdquo;</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #818cf8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                  👤
                </div>
                <div>
                  <div style={{ fontWeight: 600, color: '#f9fafb', fontSize: '0.95rem' }}>{t.name}</div>
                  <div style={{ color: '#6b7280', fontSize: '0.8rem' }}>{t.batch} • Age {t.age}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" style={{ maxWidth: '1280px', margin: '0 auto' }} />

      {/* ─── REGISTER FORM ─── */}
      <section id="register" className="section-padding" style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 className="section-title">Register Online</h2>
          <p style={{ color: '#9ca3af' }}>Fill out the form below and our team will contact you within 24 hours.</p>
        </div>
        <div className="glass-strong registration-container" style={{ borderRadius: '1.5rem' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
              <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.5rem', fontWeight: 700, color: '#10b981', marginBottom: '0.5rem' }}>Registration Submitted!</h3>
              <p style={{ color: '#9ca3af' }}>We&apos;ll contact you within 24 hours to confirm your enrollment.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gap: '1.25rem', marginBottom: '1.25rem' }} className="form-grid">
                {[
                  { key: 'name', label: 'Full Name', placeholder: 'Your full name', type: 'text' },
                  { key: 'email', label: 'Email Address', placeholder: 'your@email.com', type: 'email' },
                  { key: 'phone', label: 'Phone Number', placeholder: '+91 98765 43210', type: 'tel' },
                  { key: 'age', label: 'Age', placeholder: 'Your age', type: 'number' },
                ].map(field => (
                  <div key={field.key}>
                    <label style={{ display: 'block', color: '#9ca3af', fontSize: '0.85rem', marginBottom: '0.5rem', fontWeight: 500 }}>{field.label}</label>
                    <input type={field.type} className="input-field" placeholder={field.placeholder} value={(formData as any)[field.key]} onChange={e => setFormData(prev => ({ ...prev, [field.key]: e.target.value }))} required />
                  </div>
                ))}
              </div>
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', color: '#9ca3af', fontSize: '0.85rem', marginBottom: '0.5rem', fontWeight: 500 }}>Preferred Batch</label>
                <select className="input-field" value={formData.batch} onChange={e => setFormData(prev => ({ ...prev, batch: e.target.value }))} required>
                  <option value="">Select a batch...</option>
                  {batches.map(b => <option key={b.time} value={b.time}>{b.time} ({b.hours})</option>)}
                </select>
              </div>
              <div style={{ marginBottom: '1.75rem' }}>
                <label style={{ display: 'block', color: '#9ca3af', fontSize: '0.85rem', marginBottom: '0.5rem', fontWeight: 500 }}>Message (Optional)</label>
                <textarea className="input-field" placeholder="Any specific requirements or questions..." value={formData.message} onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))} rows={3} style={{ resize: 'vertical' }} />
              </div>
              <button type="submit" className="btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <Send size={18} /> Submit Registration
              </button>
            </form>
          )}
        </div>
      </section>

      <div className="section-divider" style={{ maxWidth: '1280px', margin: '0 auto' }} />

      {/* ─── CONTACT ─── */}
      <section id="contact" className="section-padding" style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="section-title">Contact & Location</h2>
          <p style={{ color: '#9ca3af' }}>Come visit us or get in touch through any of the channels below.</p>
        </div>
        <div style={{ display: 'grid', gap: '3rem', alignItems: 'start' }} className="contact-grid">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[
              { icon: MapPin, label: 'Address', value: '42, Sports Complex Road,\nKoramangala, Bengaluru – 560034', color: '#6366f1' },
              { icon: Phone, label: 'Phone', value: '+91 98765 43210\n+91 80 2345 6789', color: '#10b981' },
              { icon: Mail, label: 'Email', value: 'info@trianglesportsacademy.com\nadmin@trianglesportsacademy.com', color: '#f59e0b' },
              { icon: Clock, label: 'Academy Hours', value: 'Mon–Sat: 5:30 AM – 9:00 PM\nSunday: 7:00 AM – 1:00 PM', color: '#3b82f6' },
            ].map(item => (
              <div key={item.label} className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ width: '44px', height: '44px', background: `${item.color}22`, borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <item.icon size={20} color={item.color} />
                </div>
                <div>
                  <div style={{ fontWeight: 600, color: '#f9fafb', marginBottom: '0.25rem', fontSize: '0.95rem' }}>{item.label}</div>
                  <div style={{ color: '#9ca3af', fontSize: '0.9rem', whiteSpace: 'pre-line', lineHeight: 1.6 }}>{item.value}</div>
                </div>
              </div>
            ))}
          </div>
          {/* Map placeholder */}
          <div className="card map-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(245,158,11,0.05))', border: '2px dashed rgba(99,102,241,0.3)' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🗺️</div>
            <div style={{ fontWeight: 700, color: '#818cf8', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Triangle Sports Academy</div>
            <div style={{ color: '#9ca3af', textAlign: 'center', fontSize: '0.9rem', padding: '0 2rem' }}>42, Sports Complex Road, Koramangala, Bengaluru – 560034</div>
            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ marginTop: '1.5rem', padding: '0.6rem 1.25rem', fontSize: '0.85rem', textDecoration: 'none' }}>Open in Google Maps</a>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ background: '#0d1117', borderTop: '1px solid #1f2937', padding: '3rem 1.5rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gap: '3rem' }} className="footer-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <div style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, #6366f1, #f59e0b)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Zap size={18} color="white" />
              </div>
              <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.1rem', color: '#f9fafb' }}>Triangle Sports Academy</span>
            </div>
            <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: 1.7, maxWidth: '280px' }}>Premier sports academy dedicated to developing champions through expert coaching and world-class facilities.</p>
          </div>
          {[
            { title: 'Quick Links', links: ['Home', 'About', 'Facilities', 'Pricing', 'Contact'] },
            { title: 'Programs', links: ['Beginner', 'Intermediate', 'Advanced', 'Professional', 'Kids Special'] },
            { title: 'Connect', links: ['Facebook', 'Instagram', 'YouTube', 'WhatsApp'] },
          ].map(col => (
            <div key={col.title}>
              <div style={{ fontWeight: 700, color: '#f9fafb', marginBottom: '1rem', fontSize: '0.95rem' }}>{col.title}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {col.links.map(l => <a key={l} href="#" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '0.85rem', transition: 'color 0.2s' }} onMouseEnter={e => (e.target as HTMLAnchorElement).style.color = '#818cf8'} onMouseLeave={e => (e.target as HTMLAnchorElement).style.color = '#6b7280'}>{l}</a>)}
              </div>
            </div>
          ))}
        </div>
        <div style={{ maxWidth: '1280px', margin: '3rem auto 0', borderTop: '1px solid #1f2937', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ color: '#4b5563', fontSize: '0.85rem' }}>© 2025 Triangle Sports Academy. All rights reserved.</div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['Privacy Policy', 'Terms of Service'].map(l => <a key={l} href="#" style={{ color: '#4b5563', textDecoration: 'none', fontSize: '0.85rem' }}>{l}</a>)}
          </div>
        </div>
      </footer>

      <style>{`
        :root {
          --orbit-radius: 200px;
          --orbit-stat-size: 1.2rem;
        }
        .desktop-menu { display: flex; }
        .mobile-toggle { display: none; }
        .section-padding { padding: 6rem 1.5rem; }
        .section-title { 
          font-family: 'Outfit, sans-serif'; 
          font-size: clamp(2rem, 4vw, 2.5rem); 
          fontWeight: 800; 
          color: #f9fafb; 
          margin-bottom: 1rem; 
        }
        .hero-title { font-size: clamp(2.5rem, 6vw, 4.5rem); }
        .hero-grid { grid-template-columns: 1fr 1fr; }
        .stats-grid { grid-template-columns: repeat(4, 1fr); }
        .coaches-grid { grid-template-columns: repeat(3, 1fr); }
        .gallery-grid { grid-template-columns: repeat(3, 1fr); }
        .batches-grid { grid-template-columns: repeat(4, 1fr); }
        .pricing-grid { grid-template-columns: repeat(4, 1fr); }
        .testimonials-grid { grid-template-columns: repeat(2, 1fr); }
        .form-grid { grid-template-columns: 1fr 1fr; }
        .contact-grid { grid-template-columns: 1fr 1fr; }
        .footer-grid { grid-template-columns: 2fr 1fr 1fr 1fr; }
        .hero-btns { display: flex; gap: 1rem; flex-wrap: wrap; justify-content: flex-start; }
        .hero-btn { padding: 0.9rem 2rem; font-size: 1rem; justify-content: center; }
        
        .orbit-container { width: 380px; height: 380px; }
        .shuttle-icon { font-size: clamp(6rem, 10vw, 7rem); line-height: 1; }
        .orbit-stat-label { font-size: 0.65rem; }
        .registration-container { padding: 2.5rem; }
        .map-container { height: 400px; }

        .mobile-menu-dropdown {
          position: absolute;
          top: 72px;
          left: 0;
          right: 0;
          background: #111827;
          border-bottom: 1px solid #1f2937;
          box-shadow: 0 10px 25px rgba(0,0,0,0.5);
          z-index: 40;
          overflow: hidden;
          max-height: 0;
          opacity: 0;
          visibility: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .mobile-menu-dropdown.open {
          max-height: 500px;
          opacity: 1;
          visibility: visible;
        }

        @media (max-width: 1024px) {
          :root {
            --orbit-radius: 160px;
          }
          .section-padding { padding: 4rem 1.5rem; }
          .desktop-menu { display: none !important; }
          .mobile-toggle { display: block !important; }
          .hero-grid { grid-template-columns: 1fr !important; text-align: center; }
          .hero-btns { display: flex; flex-direction: row; gap: 1rem; justify-content: center !important; }
          .hero-description { margin: 0 auto 2.5rem !important; }
          .hero-visual { margin-top: 2rem; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .coaches-grid { grid-template-columns: 1fr 1fr !important; }
          .pricing-grid { grid-template-columns: 1fr 1fr !important; }
          .batches-grid { grid-template-columns: 1fr 1fr !important; }
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
          .contact-grid { grid-template-columns: 1fr !important; }
          .orbit-container { width: 320px; height: 320px; }
          .shuttle-icon { font-size: 6rem; }
        }

        @media (max-width: 640px) {
          :root {
            --orbit-radius: 110px;
            --orbit-stat-size: 0.8rem;
          }
          .section-padding { padding: 3rem 1.25rem; }
          .hero-content { padding: 0 0.5rem; }
          .hero-title { font-size: 2.2rem; }
          .hero-btns { flex-direction: column !important; align-items: stretch !important; max-width: 260px; margin: 0 auto; gap: 0.75rem !important; }
          .hero-btn { padding: 0.7rem 1.5rem !important; font-size: 0.9rem !important; }
          .coaches-grid, .pricing-grid, .testimonials-grid, .gallery-grid { grid-template-columns: 1fr !important; }
          .form-grid { grid-template-columns: 1fr !important; }
          .batches-grid { grid-template-columns: 1fr !important; }
          .footer-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .registration-container { padding: 1.5rem; }
          .orbit-container { width: 220px; height: 220px; }
          .shuttle-icon { font-size: 5rem; }
          .orbit-stat { padding: 0.4rem 0.6rem !important; min-width: 80px !important; }
          .orbit-stat-label { font-size: 0.5rem; }
          .map-container { height: 250px; }
        }
      `}</style>
    </div>
  );
}
