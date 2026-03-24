'use client';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Zap, Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react';
import Link from 'next/link';

const demoCredentials = [
  { role: 'Admin', email: 'admin@smashpro.com', password: 'admin123', color: '#6366f1', icon: '👑' },
  { role: 'Coach', email: 'coach@smashpro.com', password: 'coach123', color: '#f59e0b', icon: '🏅' },
  { role: 'Student', email: 'student@smashpro.com', password: 'student123', color: '#10b981', icon: '🎯' },
];

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const ok = await login(email, password);
    if (ok) {
      const role = email.includes('admin') ? 'admin' : email.includes('coach') ? 'coach' : 'student';
      router.push(`/dashboard/${role}`);
    } else {
      setError('Invalid email or password. Please try again.');
    }
  };

  const fillDemo = (cred: typeof demoCredentials[0]) => {
    setEmail(cred.email);
    setPassword(cred.password);
    setError('');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', position: 'relative', overflow: 'hidden' }}>
      {/* Background orbs */}
      <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-100px', left: '-100px', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: '480px', position: 'relative', zIndex: 1 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', marginBottom: '0.5rem' }}>
            <div style={{ width: '52px', height: '52px', background: 'linear-gradient(135deg, #6366f1, #f59e0b)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={28} color="white" strokeWidth={2.5} />
            </div>
            <div>
              <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: '1.6rem', color: '#f9fafb' }}>Triangle</div>
              <div style={{ fontSize: '0.7rem', color: '#6b7280', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Sports Academy</div>
            </div>
          </Link>
          <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.8rem', fontWeight: 800, color: '#f9fafb', marginTop: '1.5rem' }}>Welcome Back!</h1>
          <p style={{ color: '#6b7280', marginTop: '0.5rem', fontSize: '0.95rem' }}>Sign in to access your dashboard</p>
        </div>

        {/* Demo credentials */}
        <div className="glass" style={{ borderRadius: '1rem', padding: '1rem', marginBottom: '1.5rem', border: '1px solid rgba(99,102,241,0.2)' }}>
          <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Quick Demo Login</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
            {demoCredentials.map(cred => (
              <button key={cred.role} onClick={() => fillDemo(cred)} style={{ background: `${cred.color}15`, border: `1px solid ${cred.color}33`, borderRadius: '0.6rem', padding: '0.6rem', cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s ease' }}
                onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = `${cred.color}25`}
                onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = `${cred.color}15`}>
                <div style={{ fontSize: '1.2rem' }}>{cred.icon}</div>
                <div style={{ color: cred.color, fontSize: '0.75rem', fontWeight: 700, marginTop: '0.2rem' }}>{cred.role}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Login form */}
        <div className="glass-strong" style={{ borderRadius: '1.5rem', padding: '2rem', border: '1px solid rgba(99,102,241,0.15)' }}>
          {error && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '0.75rem', padding: '0.75rem 1rem', marginBottom: '1.5rem' }}>
              <AlertCircle size={16} color="#ef4444" />
              <span style={{ color: '#ef4444', fontSize: '0.9rem' }}>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', color: '#9ca3af', fontSize: '0.85rem', fontWeight: 500, marginBottom: '0.5rem' }}>Email Address</label>
              <input type="email" className="input-field" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div style={{ marginBottom: '1.75rem' }}>
              <label style={{ display: 'block', color: '#9ca3af', fontSize: '0.85rem', fontWeight: 500, marginBottom: '0.5rem' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <input type={showPassword ? 'text' : 'password'} className="input-field" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required style={{ paddingRight: '3rem' }} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer' }}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <button type="submit" className="btn-primary" style={{ width: '100%', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }} disabled={isLoading}>
              {isLoading ? (
                <> <div className="spinner" style={{ width: '18px', height: '18px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 1s linear infinite' }} /> Signing in... </>
              ) : (
                <><LogIn size={18} /> Sign In</>
              )}
            </button>
          </form>
        </div>

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <Link href="/" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }} onMouseEnter={e => (e.target as HTMLAnchorElement).style.color = '#818cf8'} onMouseLeave={e => (e.target as HTMLAnchorElement).style.color = '#6b7280'}>
            ← Back to Website
          </Link>
        </div>
      </div>
    </div>
  );
}
