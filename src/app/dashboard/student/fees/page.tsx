'use client';
import { useData } from '@/context/DataContext';
import { Download, CreditCard, AlertCircle } from 'lucide-react';

export default function StudentFeesPage() {
  const { fees } = useData();
  const studentId = 's1';
  
  const myFees = fees.filter(f => f.studentId === studentId).sort((a, b) => b.month.localeCompare(a.month));

  return (
    <div>
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.8rem', fontWeight: 800, color: '#f9fafb' }}>My Fees</h1>
        <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginTop: '0.25rem' }}>Track your fee payments and download receipts</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
        {myFees.map(f => (
          <div key={f.id} className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', borderLeft: `4px solid ${f.status === 'Paid' ? '#10b981' : f.status === 'Overdue' ? '#ef4444' : '#f59e0b'}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(99,102,241,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#818cf8' }}>
                <CreditCard size={24} />
              </div>
              <div>
                <div style={{ color: '#9ca3af', fontSize: '0.85rem' }}>Fee Month</div>
                <div style={{ fontWeight: 700, color: '#f9fafb', fontSize: '1.1rem' }}>{f.month}</div>
              </div>
              <div>
                <div style={{ color: '#9ca3af', fontSize: '0.85rem' }}>Amount</div>
                <div style={{ fontWeight: 700, color: '#f9fafb', fontSize: '1.1rem' }}>₹{f.amount}</div>
              </div>
              {f.paidDate && (
                <div>
                  <div style={{ color: '#9ca3af', fontSize: '0.85rem' }}>Paid On</div>
                  <div style={{ color: '#f9fafb' }}>{f.paidDate}</div>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span className={`badge ${f.status === 'Paid' ? 'badge-green' : f.status === 'Overdue' ? 'badge-red' : 'badge-yellow'}`} style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}>
                {f.status}
              </span>
              
              {f.status === 'Paid' && f.receiptNo ? (
                <button className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Download size={16} /> Receipt
                </button>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ef4444', fontSize: '0.85rem', fontWeight: 600 }}>
                  <AlertCircle size={16} /> Please pay at counter
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
