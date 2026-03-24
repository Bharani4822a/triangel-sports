'use client';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Zap, Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react';
import Link from 'next/link';

const demoCredentials = [
  { role: 'Admin', email: 'admin@trianglesportsacademy.com', password: 'admin123', color: '#6366f1', icon: '👑' },
  { role: 'Coach', email: 'coach@trianglesportsacademy.com', password: 'coach123', color: '#f59e0b', icon: '🏅' },
  { role: 'Student', email: 'student@trianglesportsacademy.com', password: 'student123', color: '#10b981', icon: '🎯' },
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
    <div className="min-h-screen flex flex-col md:flex-row bg-[#0a0a1a] relative overflow-hidden">
      {/* Background orbs */}
      <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-100px', left: '-100px', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

      {/* LEFT SIDE: Content Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 py-12 md:px-20 relative z-10">
        <div className="animate-fade-in">
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', textDecoration: 'none', marginBottom: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src="/logo.png" alt="Triangle Sports Academy" style={{ height: '64px', width: 'auto', objectFit: 'contain' }} />
            </div>
            <div>
              <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: '2rem', color: '#f9fafb', lineHeight: 1 }}>Triangle</div>
              <div style={{ fontSize: '0.8rem', color: '#818cf8', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>Sports Academy</div>
            </div>
          </Link>
          
          <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '3.5rem', fontWeight: 900, color: '#f9fafb', lineHeight: 1.1, marginBottom: '1.5rem' }}>
            Welcome <span className="gradient-text">Back!</span>
          </h1>
          <p style={{ color: '#9ca3af', fontSize: '1.2rem', lineHeight: 1.6, maxWidth: '420px', marginBottom: '2rem' }}>
            Sign in to access your dashboard, manage training sessions, and track athlete progress at Triangle Sports Academy.
          </p>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#6b7280' }}>
            <div style={{ width: '40px', height: '1px', background: '#374151' }}></div>
            <span style={{ fontSize: '0.9rem', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Empowering Champions</span>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Login Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 relative z-10">
        <div className="w-full max-w-[480px] animate-fade-in delay-200">
          <div className="glass-strong" style={{ borderRadius: '2rem', padding: '2.5rem', border: '1px solid rgba(99,102,241,0.2)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
            
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.5rem', fontWeight: 700, color: '#f9fafb', marginBottom: '1.5rem', textAlign: 'center' }}>Account Login</h2>

            {/* Demo credentials */}
            <div className="glass" style={{ borderRadius: '1.25rem', padding: '1.25rem', marginBottom: '2rem', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '1rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'center' }}>Quick Demo Login</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                {demoCredentials.map(cred => (
                  <button key={cred.role} onClick={() => fillDemo(cred)} style={{ background: `${cred.color}10`, border: `1px solid ${cred.color}25`, borderRadius: '0.8rem', padding: '0.75rem', cursor: 'pointer', textAlign: 'center', transition: 'all 0.3s ease' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = `${cred.color}20`; (e.currentTarget as HTMLButtonElement).style.borderColor = cred.color; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = `${cred.color}10`; (e.currentTarget as HTMLButtonElement).style.borderColor = `${cred.color}25`; }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{cred.icon}</div>
                    <div style={{ color: cred.color, fontSize: '0.7rem', fontWeight: 800 }}>{cred.role}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Login form */}
            {error && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '1rem', padding: '1rem', marginBottom: '1.5rem' }}>
                <AlertCircle size={18} color="#ef4444" />
                <span style={{ color: '#ef4444', fontSize: '0.9rem', fontWeight: 500 }}>{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', color: '#9ca3af', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.6rem', marginLeft: '0.25rem' }}>Email Address</label>
                <input type="email" className="input-field" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} required style={{ padding: '0.9rem 1.25rem' }} />
              </div>
              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', color: '#9ca3af', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.6rem', marginLeft: '0.25rem' }}>Password</label>
                <div style={{ position: 'relative' }}>
                  <input type={showPassword ? 'text' : 'password'} className="input-field" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required style={{ padding: '0.9rem 3.5rem 0.9rem 1.25rem' }} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '1.25rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              <button type="submit" className="btn-primary" style={{ width: '100%', marginBottom: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.75rem', padding: '1rem' }} disabled={isLoading}>
                {isLoading ? (
                  <> <div className="spinner" style={{ width: '20px', height: '20px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 1s linear infinite' }} /> <span>Signing in...</span> </>
                ) : (
                  <><LogIn size={20} /> <span>Sign In</span></>
                )}
              </button>
            </form>

            <div style={{ textAlign: 'center' }}>
              <Link href="/" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.2s' }} onMouseEnter={e => (e.target as HTMLAnchorElement).style.color = '#f9fafb'} onMouseLeave={e => (e.target as HTMLAnchorElement).style.color = '#6b7280'}>
                ← Back to Website
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
  );
}
