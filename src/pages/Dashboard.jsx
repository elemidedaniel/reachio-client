import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';
import PageHeader from '../components/layout/PageHeader';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import EmptyState from '../components/ui/EmptyState';

export default function Dashboard() {
  const [stats, setStats]     = useState(null);
  const [recent, setRecent]   = useState([]);
  const [profile, setProfile] = useState(null);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const navigate              = useNavigate();

  useEffect(() => { fetchAll(); }, []);

  const fetchAll = async () => {
    try {
      const [cRes, lRes, pRes, sRes] = await Promise.all([
        api.get('/api/companies'),
        api.get('/api/emails/logs'),
        api.get('/api/profile'),
        api.get('/api/settings'),
      ]);

      const companies = cRes.data;
      const logs      = lRes.data;

      setProfile(pRes.data);
      setSettings(sRes.data);
      setRecent(logs.slice(0, 5));
      setStats({
        total:     companies.length,
        pending:   companies.filter(c => c.status === 'Pending' && !c.blacklisted).length,
        sent:      logs.length,
        opened:    logs.filter(l => l.opened).length,
        replied:   logs.filter(l => l.replied).length,
        openRate:  logs.length ? Math.round((logs.filter(l => l.opened).length / logs.length) * 100) : 0,
        replyRate: logs.length ? Math.round((logs.filter(l => l.replied).length / logs.length) * 100) : 0,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSendNow = async () => {
    if (!window.confirm(`This will send up to ${settings?.daily_limit || 10} emails now. Continue?`)) return;
    setSending(true);
    try {
      await api.post('/api/emails/send-now');
      alert('Batch started — check Email Log and Notifications in a few minutes.');
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '40vh' }}>
      <p style={{ color: '#9CA3AF' }}>Loading...</p>
    </div>
  );

  const firstName = profile?.full_name?.split(' ')[0] || 'there';
  const hour      = new Date().getHours();
  const greeting  = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div>
      <PageHeader
        title={`${greeting}, ${firstName}`}
        subtitle="Here's your outreach overview"
        action={
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              variant="ghost"
              onClick={handleSendNow}
              loading={sending}
            >
              ▶ Send Now
            </Button>
            <Button onClick={() => navigate('/companies')}>
              + Add Companies
            </Button>
          </div>
        }
      />

      {/* Warnings */}
      {(!profile?.gmail || !profile?.gmail_app_password) && (
        <div style={{
          background: '#FFFBEB', border: '1px solid #FDE68A',
          borderRadius: '10px', padding: '14px 18px',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', gap: '12px',
          marginBottom: '20px', flexWrap: 'wrap',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>⚠️</span>
            <p style={{ fontSize: '13.5px', color: '#92400E', margin: 0 }}>
              Gmail credentials missing. Add them in your profile to start sending.
            </p>
          </div>
          <Button size="sm" variant="ghost" onClick={() => navigate('/profile')}>
            Set up Gmail →
          </Button>
        </div>
      )}

      {stats?.pending === 0 && stats?.total > 0 && (
        <div style={{
          background: '#EFF6FF', border: '1px solid #BFDBFE',
          borderRadius: '10px', padding: '14px 18px',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', gap: '12px',
          marginBottom: '20px', flexWrap: 'wrap',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>📭</span>
            <p style={{ fontSize: '13.5px', color: '#1E40AF', margin: 0 }}>
              All companies have been contacted. Add more to continue outreach.
            </p>
          </div>
          <Button size="sm" variant="ghost" onClick={() => navigate('/companies')}>
            Add Companies →
          </Button>
        </div>
      )}

      {/* Scheduler status */}
      <div style={{
        background: settings?.scheduler_active ? '#F0FDF4' : '#F9FAFB',
        border: `1px solid ${settings?.scheduler_active ? '#BBF7D0' : '#E5E7EB'}`,
        borderRadius: '10px', padding: '12px 18px',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', gap: '12px',
        marginBottom: '24px', flexWrap: 'wrap',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '8px', height: '8px', borderRadius: '50%',
            background: settings?.scheduler_active ? '#22C55E' : '#9CA3AF',
          }} />
          <p style={{ fontSize: '13px', color: settings?.scheduler_active ? '#166534' : '#6B7280', margin: 0 }}>
            {settings?.scheduler_active
              ? `Scheduler active — sends at ${settings.send_time} UTC daily`
              : 'Scheduler is off — use Send Now or enable in Settings'}
          </p>
        </div>
        <Button size="sm" variant="ghost" onClick={() => navigate('/settings')}>
          Settings →
        </Button>
      </div>

      {/* Stats grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        gap: '12px',
        marginBottom: '28px',
      }}>
        {[
          { label: 'Total Companies',  value: stats.total,          color: '#0F0F0F' },
          { label: 'Pending',          value: stats.pending,        color: '#D97706' },
          { label: 'Emails Sent',      value: stats.sent,           color: 'var(--accent)' },
          { label: 'Opened',           value: stats.opened,         color: '#059669' },
          { label: 'Replied',          value: stats.replied,        color: '#7C3AED' },
          { label: 'Open Rate',        value: `${stats.openRate}%`, color: '#0284C7' },
          { label: 'Reply Rate',       value: `${stats.replyRate}%`,color: '#DB2777' },
        ].map(stat => (
          <div key={stat.label} style={{
            background: '#fff', borderRadius: '10px',
            border: '1px solid #E5E7EB', padding: '16px 18px',
          }}>
            <p style={{ fontSize: '12px', color: '#9CA3AF', marginBottom: '8px' }}>
              {stat.label}
            </p>
            <p style={{ fontSize: '22px', fontWeight: '600', color: stat.color, margin: 0, letterSpacing: '-0.4px' }}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Recent emails */}
      <div style={{
        background: '#fff', borderRadius: '12px',
        border: '1px solid #E5E7EB', overflow: 'hidden',
      }}>
        <div style={{
          padding: '16px 20px', borderBottom: '1px solid #F3F4F6',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <h3 style={{ fontSize: '13.5px', fontWeight: '600', color: '#0F0F0F', margin: 0 }}>
            Recent Emails
          </h3>
          {recent.length > 0 && (
            <button
              onClick={() => navigate('/email-log')}
              style={{
                fontSize: '12.5px', color: 'var(--accent)',
                background: 'none', border: 'none',
                cursor: 'pointer', fontFamily: 'inherit',
              }}
            >
              View all →
            </button>
          )}
        </div>

        {recent.length === 0 ? (
          <EmptyState
            icon="📭"
            title="No emails sent yet"
            subtitle="Add companies and templates, then hit Send Now or enable the scheduler."
          />
        ) : (
          <div>
            {recent.map((log, i) => (
              <div key={log.id} style={{
                padding: '14px 20px',
                borderBottom: i < recent.length - 1 ? '1px solid #F3F4F6' : 'none',
                display: 'flex', alignItems: 'center',
                justifyContent: 'space-between', gap: '12px',
              }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: '13.5px', fontWeight: '500', color: '#0F0F0F', marginBottom: '2px' }}>
                    {log.companies?.name || '—'}
                  </p>
                  <p style={{
                    fontSize: '12px', color: '#9CA3AF',
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}>
                    {log.subject}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                  {log.replied
                    ? <Badge label="Replied" type="success" />
                    : log.opened
                      ? <Badge label="Opened" type="info" />
                      : <Badge label="Sent" type="warning" />
                  }
                  <span style={{ fontSize: '12px', color: '#9CA3AF' }}>
                    {new Date(log.sent_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}