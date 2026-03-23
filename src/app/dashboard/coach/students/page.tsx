'use client';
import { useData } from '@/context/DataContext';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import toast from 'react-hot-toast';

const BATCHES = ['Morning 6-8 AM', 'Morning 8-10 AM', 'Evening 4-6 PM', 'Evening 6-8 PM'];

export default function CoachStudentsPage() {
  const { students } = useData();
  const [filterBatch, setFilterBatch] = useState('');
  const [filterGroup, setFilterGroup] = useState('');

  const filtered = students.filter(s =>
    (!filterBatch || s.batch === filterBatch) &&
    (!filterGroup || s.group === filterGroup)
  );

  const skillColors: Record<string, string> = { Beginner: '#10b981', Intermediate: '#f59e0b', Advanced: '#6366f1', Professional: '#ef4444' };

  return (
    <div>
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.8rem', fontWeight: 800, color: '#f9fafb' }}>My Students</h1>
        <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginTop: '0.25rem' }}>{filtered.length} students</p>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <select className="input-field" value={filterBatch} onChange={e => setFilterBatch(e.target.value)} style={{ width: 'auto', minWidth: '180px' }}>
          <option value="">All Batches</option>
          {BATCHES.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
        <select className="input-field" value={filterGroup} onChange={e => setFilterGroup(e.target.value)} style={{ width: 'auto' }}>
          <option value="">All Groups</option>
          {['Group A', 'Group B', 'Group C'].map(g => <option key={g} value={g}>{g}</option>)}
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }} className="coach-students-grid">
        {filtered.map(s => (
          <div key={s.id} className="card" style={{ borderTop: `3px solid ${skillColors[s.skillLevel]}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: `linear-gradient(135deg, ${skillColors[s.skillLevel]}, ${skillColors[s.skillLevel]}88)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '1rem', flexShrink: 0 }}>
                {s.name.charAt(0)}
              </div>
              <div>
                <div style={{ fontWeight: 700, color: '#f9fafb', fontSize: '0.95rem' }}>{s.name}</div>
                <span className="badge" style={{ background: `${skillColors[s.skillLevel]}15`, color: skillColors[s.skillLevel], border: `1px solid ${skillColors[s.skillLevel]}33`, fontSize: '0.7rem' }}>{s.skillLevel}</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.83rem' }}>
              {[
                { label: 'Age', value: `${s.age} years` },
                { label: 'Batch', value: s.batch },
                { label: 'Group', value: s.group },
                { label: 'Phone', value: s.phone },
                { label: 'Parent', value: s.parentName || '—' },
              ].map(row => (
                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#6b7280' }}>{row.label}</span>
                  <span style={{ color: '#d1d5db', fontWeight: 500 }}>{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <style>{`@media (max-width: 1024px) { .coach-students-grid { grid-template-columns: 1fr 1fr !important; } } @media (max-width: 640px) { .coach-students-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}
