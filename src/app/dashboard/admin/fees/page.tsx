'use client';
import { useState } from 'react';
import { useData, PaymentStatus } from '@/context/DataContext';
import { CreditCard, Search, Check, Printer } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminFeesPage() {
  const { fees, updateFeeStatus, students } = useData();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [receiptModal, setReceiptModal] = useState<string | null>(null);

  const filtered = fees.filter(f =>
    f.studentName.toLowerCase().includes(search.toLowerCase()) &&
    (!filterStatus || f.status === filterStatus)
  );

  const totalCollected = fees.filter(f => f.status === 'Paid').reduce((s, f) => s + f.amount, 0);
  const totalPending = fees.filter(f => f.status !== 'Paid').reduce((s, f) => s + f.amount, 0);
  const overdueCount = fees.filter(f => f.status === 'Overdue').length;

  const handleMarkPaid = (id: string) => {
    const receiptNo = `RCP${Date.now().toString().slice(-6)}`;
    updateFeeStatus(id, 'Paid', receiptNo);
    toast.success('Marked as Paid! Receipt generated.');
  };

  const feeRecord = fees.find(f => f.id === receiptModal);
  const student = feeRecord ? students.find(s => s.id === feeRecord.studentId) : null;

  return (
    <div>
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.8rem', fontWeight: 800, color: '#f9fafb' }}>Fees Management</h1>
        <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginTop: '0.25rem' }}>Track and manage all student fee payments</p>
      </div>

      {/* Summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem', marginBottom: '2rem' }} className="fee-stats-grid">
        {[
          { label: 'Total Collected', value: `₹${totalCollected.toLocaleString()}`, color: '#10b981', bg: 'rgba(16,185,129,0.1)', icon: '💰' },
          { label: 'Total Pending', value: `₹${totalPending.toLocaleString()}`, color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', icon: '⏳' },
          { label: 'Overdue', value: `${overdueCount} students`, color: '#ef4444', bg: 'rgba(239,68,68,0.1)', icon: '⚠️' },
        ].map(s => (
          <div key={s.label} className="stat-card" style={{ borderColor: `${s.color}33` }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ color: '#6b7280', fontSize: '0.8rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: s.color, fontFamily: 'Outfit, sans-serif' }}>{s.value}</div>
              </div>
              <div style={{ fontSize: '2rem' }}>{s.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
          <Search size={16} color="#6b7280" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
          <input className="input-field" placeholder="Search student..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: '2.75rem' }} />
        </div>
        <select className="input-field" value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={{ width: 'auto' }}>
          <option value="">All Status</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
          <option value="Overdue">Overdue</option>
        </select>
      </div>

      {/* Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Month</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Paid Date</th>
              <th>Receipt No</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(f => (
              <tr key={f.id}>
                <td style={{ fontWeight: 600, color: '#f9fafb' }}>{f.studentName}</td>
                <td style={{ color: '#9ca3af' }}>{f.month}</td>
                <td style={{ color: '#f9fafb', fontWeight: 600 }}>₹{f.amount.toLocaleString()}</td>
                <td><span className={`badge ${f.status === 'Paid' ? 'badge-green' : f.status === 'Overdue' ? 'badge-red' : 'badge-yellow'}`}>{f.status}</span></td>
                <td style={{ color: '#9ca3af' }}>{f.paidDate || '—'}</td>
                <td style={{ color: '#818cf8', fontWeight: 600 }}>{f.receiptNo || '—'}</td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {f.status !== 'Paid' && (
                      <button onClick={() => handleMarkPaid(f.id)} style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '0.5rem', padding: '0.4rem 0.75rem', cursor: 'pointer', color: '#10b981', fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Check size={13} /> Mark Paid
                      </button>
                    )}
                    {f.status === 'Paid' && (
                      <button onClick={() => setReceiptModal(f.id)} style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '0.5rem', padding: '0.4rem 0.75rem', cursor: 'pointer', color: '#818cf8', fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Printer size={13} /> Receipt
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Receipt Modal */}
      {receiptModal && feeRecord && (
        <div className="modal-overlay" onClick={() => setReceiptModal(null)}>
          <div className="modal-content" style={{ maxWidth: '420px' }} onClick={e => e.stopPropagation()}>
            <div style={{ textAlign: 'center', borderBottom: '2px dashed #374151', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏸</div>
              <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: '1.4rem', color: '#f9fafb' }}>SmashPro Academy</div>
              <div style={{ color: '#9ca3af', fontSize: '0.8rem' }}>OFFICIAL FEE RECEIPT</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              {[
                { label: 'Receipt No', value: feeRecord.receiptNo },
                { label: 'Student', value: feeRecord.studentName },
                { label: 'Month', value: feeRecord.month },
                { label: 'Amount Paid', value: `₹${feeRecord.amount.toLocaleString()}` },
                { label: 'Payment Date', value: feeRecord.paidDate },
                { label: 'Status', value: 'PAID ✓' },
              ].map(row => (
                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0', borderBottom: '1px solid #1f2937' }}>
                  <span style={{ color: '#9ca3af', fontSize: '0.88rem' }}>{row.label}</span>
                  <span style={{ color: '#f9fafb', fontWeight: 600, fontSize: '0.88rem' }}>{row.value}</span>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', color: '#10b981', fontWeight: 600, fontSize: '0.85rem', marginBottom: '1rem' }}>✓ Payment Verified by SmashPro Academy</div>
            <button className="btn-primary" style={{ width: '100%' }} onClick={() => { window.print(); setReceiptModal(null); }}>
              🖨️ Print Receipt
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) { .fee-stats-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
