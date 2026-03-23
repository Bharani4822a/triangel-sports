'use client';
import { useState } from 'react';
import { useData } from '@/context/DataContext';
import { Bell, Plus, X, Check } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminNotificationsPage() {
  const { notifications, addNotification, markNotificationRead } = useData();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: '', message: '', type: 'info' as any, targetRole: 'all' as any });

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    addNotification(form);
    setShowModal(false);
    toast.success('Notification sent!');
    setForm({ title: '', message: '', type: 'info', targetRole: 'all' });
  };

  const typeColor = { info: '#3b82f6', warning: '#f59e0b', success: '#10b981', danger: '#ef4444' };
  const typeIcon = { info: 'ℹ️', warning: '⚠️', success: '✅', danger: '🚨' };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.8rem', fontWeight: 800, color: '#f9fafb' }}>Notifications</h1>
          <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginTop: '0.25rem' }}>{notifications.filter(n => !n.read).length} unread notifications</p>
        </div>
        <button className="btn-primary" onClick={() => setShowModal(true)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={18} /> Send Notification
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {notifications.map(n => (
          <div key={n.id} className="card" style={{ borderLeft: `4px solid ${typeColor[n.type]}`, opacity: n.read ? 0.6 : 1, transition: 'opacity 0.2s' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '1rem', flex: 1 }}>
                <div style={{ fontSize: '1.5rem', flexShrink: 0 }}>{typeIcon[n.type]}</div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.4rem' }}>
                    <span style={{ fontWeight: 700, color: '#f9fafb', fontSize: '0.95rem' }}>{n.title}</span>
                    {!n.read && <span style={{ background: '#6366f1', color: 'white', fontSize: '0.65rem', padding: '0.15rem 0.5rem', borderRadius: '9999px', fontWeight: 700 }}>NEW</span>}
                    <span className="badge badge-gray" style={{ fontSize: '0.7rem' }}>{n.targetRole === 'all' ? 'Everyone' : n.targetRole}</span>
                  </div>
                  <p style={{ color: '#9ca3af', fontSize: '0.88rem', lineHeight: 1.6 }}>{n.message}</p>
                  <div style={{ color: '#4b5563', fontSize: '0.75rem', marginTop: '0.5rem' }}>{n.createdAt}</div>
                </div>
              </div>
              {!n.read && (
                <button onClick={() => { markNotificationRead(n.id); toast.success('Marked as read'); }} style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '0.5rem', padding: '0.4rem', cursor: 'pointer', color: '#10b981', flexShrink: 0 }}>
                  <Check size={15} />
                </button>
              )}
            </div>
          </div>
        ))}
        {notifications.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#6b7280' }}>
            <Bell size={48} style={{ margin: '0 auto 1rem', opacity: 0.2 }} />
            <div>No notifications yet</div>
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.3rem', fontWeight: 700, color: '#f9fafb' }}>Send Notification</h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <form onSubmit={handleSend}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', color: '#9ca3af', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Title</label>
                <input className="input-field" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="Notification title" required />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', color: '#9ca3af', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Message</label>
                <textarea className="input-field" value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} placeholder="Your message..." rows={3} required style={{ resize: 'vertical' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', color: '#9ca3af', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Type</label>
                  <select className="input-field" value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value as any }))}>
                    <option value="info">Info</option>
                    <option value="warning">Warning</option>
                    <option value="success">Success</option>
                    <option value="danger">Danger</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', color: '#9ca3af', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Send To</label>
                  <select className="input-field" value={form.targetRole} onChange={e => setForm(p => ({ ...p, targetRole: e.target.value as any }))}>
                    <option value="all">Everyone</option>
                    <option value="student">Students</option>
                    <option value="coach">Coaches</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="btn-primary" style={{ width: '100%' }}>Send Notification</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
