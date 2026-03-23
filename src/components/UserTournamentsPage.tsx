'use client';
import { useState } from 'react';
import { useData, Tournament } from '@/context/DataContext';
import { useAuth } from '@/context/AuthContext';
import { Trophy, Users, Calendar, MapPin, Check, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

export default function UserTournamentsPage() {
  const { tournaments, registerForTournament } = useData();
  const { user } = useAuth();
  const [showDetail, setShowDetail] = useState<Tournament | null>(null);

  // Use demo student name for registration
  const studentName = 'Arjun Sharma'; 

  const handleRegister = (id: string, name: string) => {
    registerForTournament(id, name);
    toast.success('Successfully registered for tournament!');
    setShowDetail(null);
  };

  const statusColor = { Upcoming: '#6366f1', Ongoing: '#f59e0b', Completed: '#10b981' };
  const statusBadge = { Upcoming: 'badge-blue', Ongoing: 'badge-yellow', Completed: 'badge-green' };

  return (
    <div>
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.8rem', fontWeight: 800, color: '#f9fafb' }}>Tournaments</h1>
        <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginTop: '0.25rem' }}>Browse events and view results</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem' }} className="user-tournament-grid">
        {tournaments.map(t => {
          const isRegistered = user?.role === 'student' && t.participants.includes(studentName);
          
          return (
            <div key={t.id} className="card" style={{ borderColor: `${statusColor[t.status]}33`, cursor: 'pointer', position: 'relative' }} onClick={() => setShowDetail(t)}>
              {isRegistered && (
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(16,185,129,0.15)', color: '#10b981', padding: '0.3rem 0.6rem', borderRadius: '0.5rem', fontSize: '0.7rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Check size={12} strokeWidth={3} /> Registered
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div style={{ fontSize: '2.5rem' }}>🏆</div>
              </div>
              <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, color: '#f9fafb', marginBottom: '0.75rem', fontSize: '1rem', paddingRight: isRegistered ? '5rem' : 0 }}>{t.name}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: '#9ca3af', fontSize: '0.83rem' }}>
                  <Calendar size={13} /> {t.date}
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: '#9ca3af', fontSize: '0.83rem' }}>
                  <MapPin size={13} /> {t.venue}
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: '#9ca3af', fontSize: '0.83rem' }}>
                  <Users size={13} /> {t.participants.length} participants • {t.category}
                </div>
              </div>
              <div style={{ marginTop: '1rem', display: 'inline-block' }}>
                 <span className={`badge ${statusBadge[t.status]}`}>{t.status}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Modal */}
      {showDetail && (
        <div className="modal-overlay" onClick={() => setShowDetail(null)}>
          <div className="modal-content" style={{ maxWidth: '600px' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.2rem', fontWeight: 700, color: '#f9fafb' }}>{showDetail.name}</h2>
              <button onClick={() => setShowDetail(null)} style={{ background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer' }}>✕</button>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              {[
                { label: 'Date', value: showDetail.date },
                { label: 'Venue', value: showDetail.venue },
                { label: 'Category', value: showDetail.category },
                { label: 'Status', value: showDetail.status },
              ].map(item => (
                <div key={item.label}>
                  <div style={{ color: '#6b7280', fontSize: '0.78rem', marginBottom: '0.25rem' }}>{item.label}</div>
                  <div style={{ color: '#f9fafb', fontWeight: 600 }}>{item.value}</div>
                </div>
              ))}
            </div>

            {user?.role === 'student' && showDetail.status === 'Upcoming' && (
              <div style={{ marginBottom: '1.5rem', padding: '1.25rem', background: '#1f2937', borderRadius: '1rem', border: '1px solid #374151' }}>
                <h4 style={{ color: '#f9fafb', fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.25rem' }}>Registration Open</h4>
                <p style={{ color: '#9ca3af', fontSize: '0.85rem', marginBottom: '1rem' }}>Enter this tournament to compete against other academy players.</p>
                
                {showDetail.participants.includes(studentName) ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981', fontWeight: 600, fontSize: '0.9rem', background: 'rgba(16,185,129,0.1)', padding: '0.75rem', borderRadius: '0.5rem' }}>
                    <Check size={18} /> You are registered for this event
                  </div>
                ) : (
                  <button className="btn-primary" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }} onClick={() => handleRegister(showDetail.id, studentName)}>
                    <Plus size={18} /> Register Now
                  </button>
                )}
              </div>
            )}

            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ color: '#9ca3af', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.75rem' }}>PARTICIPANTS ({showDetail.participants.length})</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {showDetail.participants.map(p => (
                  <span key={p} className="badge" style={{ background: p === studentName && user?.role === 'student' ? 'rgba(16,185,129,0.15)' : 'rgba(99,102,241,0.1)', color: p === studentName && user?.role === 'student' ? '#10b981' : '#818cf8', border: p === studentName && user?.role === 'student' ? '1px solid rgba(16,185,129,0.3)' : '1px solid rgba(99,102,241,0.2)', fontSize: '0.8rem' }}>
                    {p} {p === studentName && user?.role === 'student' && '(You)'}
                  </span>
                ))}
              </div>
            </div>

            {showDetail.results && showDetail.results.length > 0 && (
              <div>
                <div style={{ color: '#9ca3af', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.75rem' }}>RESULTS</div>
                {showDetail.results.map(r => (
                  <div key={r.position} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 1rem', background: '#1f2937', borderRadius: '0.6rem', marginBottom: '0.4rem', border: r.name.includes(studentName) && user?.role === 'student' ? '1px solid #10b981' : 'none' }}>
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                      <span style={{ fontSize: '1.2rem' }}>{r.position === 1 ? '🥇' : r.position === 2 ? '🥈' : '🥉'}</span>
                      <span style={{ color: '#f9fafb', fontWeight: r.name.includes(studentName) && user?.role === 'student' ? 800 : 600 }}>
                        {r.name} {r.name.includes(studentName) && user?.role === 'student' && '(You)'}
                      </span>
                    </div>
                    <span style={{ color: '#9ca3af', fontSize: '0.85rem' }}>{r.score}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      <style>{`@media (max-width: 640px) { .user-tournament-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}
