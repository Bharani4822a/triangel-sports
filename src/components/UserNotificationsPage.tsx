'use client';
import { useData } from '@/context/DataContext';
import { useAuth } from '@/context/AuthContext';
import { Bell, Check } from 'lucide-react';
import toast from 'react-hot-toast';

export default function UserNotificationsPage() {
  const { notifications, markNotificationRead } = useData();
  const { user } = useAuth();

  const myNotifications = notifications.filter(n => n.targetRole === 'all' || n.targetRole === user?.role);

  const typeColor = { info: '#3b82f6', warning: '#f59e0b', success: '#10b981', danger: '#ef4444' };
  const typeIcon = { info: 'ℹ️', warning: '⚠️', success: '✅', danger: '🚨' };

  return (
    <div>
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.8rem', fontWeight: 800, color: '#f9fafb' }}>Announcements</h1>
        <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginTop: '0.25rem' }}>Stay updated with academy news and alerts</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {myNotifications.map(n => (
          <div key={n.id} className="card" style={{ borderLeft: `4px solid ${typeColor[n.type]}`, opacity: n.read ? 0.6 : 1, transition: 'opacity 0.2s' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '1rem', flex: 1 }}>
                <div style={{ fontSize: '1.5rem', flexShrink: 0 }}>{typeIcon[n.type]}</div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.4rem' }}>
                    <span style={{ fontWeight: 700, color: '#f9fafb', fontSize: '0.95rem' }}>{n.title}</span>
                    {!n.read && <span style={{ background: '#6366f1', color: 'white', fontSize: '0.65rem', padding: '0.15rem 0.5rem', borderRadius: '9999px', fontWeight: 700 }}>NEW</span>}
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
        {myNotifications.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#6b7280' }}>
            <Bell size={48} style={{ margin: '0 auto 1rem', opacity: 0.2 }} />
            <div>No new announcements</div>
          </div>
        )}
      </div>
    </div>
  );
}
