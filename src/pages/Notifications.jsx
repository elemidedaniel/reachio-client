import { useState, useEffect } from 'react';
import api from '../lib/api';
import PageHeader from '../components/layout/PageHeader';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';

const TYPE_STYLES = {
  info:    { bg: '#EFF6FF', color: '#1D4ED8', dot: '#3B82F6' },
  success: { bg: '#F0FDF4', color: '#166534', dot: '#22C55E' },
  warning: { bg: '#FEFCE8', color: '#854D0E', dot: '#EAB308' },
  error:   { bg: '#FEF2F2', color: '#991B1B', dot: '#EF4444' },
};

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading]             = useState(true);
  const [clearing, setClearing]           = useState(false);

  useEffect(() => { fetchNotifications(); }, []);

  const fetchNotifications = async () => {
    try {
      const res = await api.get('/api/notifications');
      setNotifications(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDismiss = async (id) => {
    try {
      await api.delete(`/api/notifications/${id}`);
      setNotifications(p => p.filter(n => n.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleClearAll = async () => {
    setClearing(true);
    try {
      await api.delete('/api/notifications');
      setNotifications([]);
    } catch (err) {
      console.error(err);
    } finally {
      setClearing(false);
    }
  };

  const formatTime = (ts) => {
    const d    = new Date(ts);
    const now  = new Date();
    const diff = Math.floor((now - d) / 1000);
    if (diff < 60)   return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400)return `${Math.floor(diff / 3600)}h ago`;
    return d.toLocaleDateString();
  };

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '40vh' }}>
      <p style={{ color: '#9CA3AF' }}>Loading notifications...</p>
    </div>
  );

  return (
    <div>
      <PageHeader
        title="Notifications"
        subtitle={`${notifications.length} notification${notifications.length !== 1 ? 's' : ''}`}
        action={
          notifications.length > 0 && (
            <Button variant="ghost" size="sm" onClick={handleClearAll} loading={clearing}>
              Clear All
            </Button>
          )
        }
      />

      {notifications.length === 0 ? (
        <EmptyState
          icon="🔔"
          title="No notifications"
          subtitle="You're all caught up. Notifications will appear here when your scheduler runs."
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '680px' }}>
          {notifications.map(n => {
            const style = TYPE_STYLES[n.type] || TYPE_STYLES.info;
            return (
              <div key={n.id} style={{
                background: '#fff', borderRadius: '10px',
                border: '1px solid #E5E7EB', padding: '14px 16px',
                display: 'flex', alignItems: 'flex-start',
                gap: '12px', transition: 'border-color 0.15s',
              }}>
                {/* Dot */}
                <div style={{
                  width: '8px', height: '8px', borderRadius: '50%',
                  background: style.dot, flexShrink: 0, marginTop: '5px',
                }} />

                {/* Content */}
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '13.5px', color: '#374151', lineHeight: '1.5', margin: '0 0 4px' }}>
                    {n.message}
                  </p>
                  <p style={{ fontSize: '11.5px', color: '#9CA3AF', margin: 0 }}>
                    {formatTime(n.created_at)}
                  </p>
                </div>

                {/* Dismiss */}
                <button
                  onClick={() => handleDismiss(n.id)}
                  style={{
                    background: 'transparent', border: 'none',
                    cursor: 'pointer', color: '#9CA3AF',
                    fontSize: '16px', padding: '0 4px',
                    lineHeight: 1, flexShrink: 0,
                    fontFamily: 'inherit',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#EF4444'}
                  onMouseLeave={e => e.currentTarget.style.color = '#9CA3AF'}
                  title="Dismiss"
                >
                  ×
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}