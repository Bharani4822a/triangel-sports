'use client';
import { useState } from 'react';
import { useData, Tournament } from '@/context/DataContext';
import { Trophy, Plus, X, Users, Calendar, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';

const emptyForm = { name: '', date: '', venue: '', category: '', status: 'Upcoming' as Tournament['status'], participants: [], results: [] };

export default function AdminTournamentsPage() {
  const { tournaments, addTournament } = useData();
  const [showModal, setShowModal] = useState(false);
  const [showDetail, setShowDetail] = useState<Tournament | null>(null);
  const [form, setForm] = useState(emptyForm);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addTournament(form);
    setShowModal(false);
    toast.success('Tournament created!');
    setForm(emptyForm);
  };

  const statusColor = { Upcoming: '#6366f1', Ongoing: '#f59e0b', Completed: '#10b981' };
  const statusBadge = { Upcoming: 'badge-blue', Ongoing: 'badge-yellow', Completed: 'badge-green' };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.8rem', fontWeight: 800, color: '#f9fafb' }}>Tournaments & Events</h1>
          <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginTop: '0.25rem' }}>{tournaments.length} events total</p>
        </div>
        <button className="btn-primary" onClick={() => setShowModal(true)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={18} /> Create Event
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem' }} className="tournament-grid">
        {tournaments.map(t => (
          <div key={t.id} className="card" style={{ borderColor: `${statusColor[t.status]}33`, cursor: 'pointer' }} onClick={() => setShowDetail(t)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div style={{ fontSize: '2.5rem' }}>🏆</div>
              <span className={`badge ${statusBadge[t.status]}`}>{t.status}</span>
            </div>
            <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, color: '#f9fafb', marginBottom: '0.75rem', fontSize: '1rem' }}>{t.name}</h3>
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
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {showDetail && (
        <div className="modal-overlay" onClick={() => setShowDetail(null)}>
          <div className="modal-content" style={{ maxWidth: '600px' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.2rem', fontWeight: 700, color: '#f9fafb' }}>{showDetail.name}</h2>
              <button onClick={() => setShowDetail(null)} style={{ background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer' }}><X size={20} /></button>
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
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ color: '#9ca3af', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.75rem' }}>PARTICIPANTS ({showDetail.participants.length})</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {showDetail.participants.map(p => <span key={p} className="badge badge-blue" style={{ fontSize: '0.8rem' }}>{p}</span>)}
              </div>
            </div>
            {showDetail.results && showDetail.results.length > 0 && (
              <div>
                <div style={{ color: '#9ca3af', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.75rem' }}>RESULTS</div>
                {showDetail.results.map(r => (
                  <div key={r.position} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 1rem', background: '#1f2937', borderRadius: '0.6rem', marginBottom: '0.4rem' }}>
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                      <span style={{ fontSize: '1.2rem' }}>{r.position === 1 ? '🥇' : r.position === 2 ? '🥈' : '🥉'}</span>
                      <span style={{ color: '#f9fafb', fontWeight: 600 }}>{r.name}</span>
                    </div>
                    <span style={{ color: '#9ca3af', fontSize: '0.85rem' }}>{r.score}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add Tournament Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.3rem', fontWeight: 700, color: '#f9fafb' }}>Create Tournament</h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <form onSubmit={handleAdd}>
              {[
                { key: 'name', label: 'Tournament Name', type: 'text', placeholder: 'e.g. SmashPro Open 2025' },
                { key: 'date', label: 'Date', type: 'date', placeholder: '' },
                { key: 'venue', label: 'Venue', type: 'text', placeholder: 'Court / location' },
                { key: 'category', label: 'Category', type: 'text', placeholder: 'e.g. Under 18, Open' },
              ].map(f => (
                <div key={f.key} style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', color: '#9ca3af', fontSize: '0.85rem', marginBottom: '0.5rem' }}>{f.label}</label>
                  <input type={f.type} className="input-field" placeholder={f.placeholder} value={(form as any)[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} required />
                </div>
              ))}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', color: '#9ca3af', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Status</label>
                <select className="input-field" value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value as any }))}>
                  <option value="Upcoming">Upcoming</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <button type="submit" className="btn-primary" style={{ width: '100%' }}>Create Tournament</button>
            </form>
          </div>
        </div>
      )}
      <style>{`@media (max-width: 640px) { .tournament-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}
