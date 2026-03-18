import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../lib/api';

const PAGE_TITLES = {
  '/dashboard':                'Dashboard',
  '/dashboard/companies':      'Companies',
  '/dashboard/templates':      'Templates',
  '/dashboard/email-log':      'Email Log',
  '/dashboard/notifications':  'Notifications',
  '/dashboard/settings':       'Settings',
  '/dashboard/profile':        'Profile',
};

export default function Topbar() {
  const location                      = useLocation();
  const navigate                      = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);
  const title                         = PAGE_TITLES[location.pathname] || 'Reachio';

  useEffect(() => {
    fetchUnread();
  }, [location.pathname]);

  const fetchUnread = async () => {
    try {
      const res = await api.get('/api/notifications');
      setUnreadCount(res.data.filter(n => !n.read).length);
    } catch {}
  };

  return (
    <header style={{
      height: '60px',
      background: '#fff',
      borderBottom: '1px solid #E5E7EB',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 32px',
      position: 'sticky',
      top: 0,
      zIndex: 50,
    }}>
      <h2 style={{ fontSize: '15px', fontWeight: '600', color: '#0F0F0F' }}>
        {title}
      </h2>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Notification bell */}
        <button
          onClick={() => navigate('/dashboard/notifications')}
          style={{
            position: 'relative',
            background: 'transparent',
            border: '1px solid #E5E7EB',
            borderRadius: '8px',
            width: '36px', height: '36px',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '16px',
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#F9FAFB'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          🔔
          {unreadCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-4px', right: '-4px',
              background: '#EF4444',
              color: '#fff',
              fontSize: '10px',
              fontWeight: '600',
              width: '16px', height: '16px',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}