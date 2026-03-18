import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const NAV_ITEMS = [
  { path: '/dashboard',                  label: 'Dashboard',     icon: '⊞' },
  { path: '/dashboard/companies',        label: 'Companies',     icon: '⊡' },
  { path: '/dashboard/templates',        label: 'Templates',     icon: '⊟' },
  { path: '/dashboard/email-log',        label: 'Email Log',     icon: '⊠' },
  { path: '/dashboard/notifications',   label: 'Notifications', icon: '⊕' },
];

const BOTTOM_ITEMS = [
  { path: '/dashboard/settings', label: 'Settings', icon: '⚙' },
  { path: '/dashboard/profile',  label: 'Profile',  icon: '◯' },
];

export default function Sidebar() {
  const { signOut } = useAuth();
  const navigate    = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const linkStyle = (isActive) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '9px 12px',
    borderRadius: '7px',
    fontSize: '13.5px',
    fontWeight: isActive ? '500' : '400',
    color: isActive ? '#0F0F0F' : '#6B7280',
    background: isActive ? '#F3F4F6' : 'transparent',
    textDecoration: 'none',
    transition: 'all 0.15s ease',
    cursor: 'pointer',
  });

  return (
    <aside style={{
      width: '240px',
      height: '100vh',
      position: 'fixed',
      top: 0, left: 0,
      background: '#fff',
      borderRight: '1px solid #E5E7EB',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px 16px',
      zIndex: 100,
    }}>
      {/* Logo */}
      <div style={{ padding: '4px 12px 24px', borderBottom: '1px solid #F3F4F6' }}>
        <h1 style={{ fontSize: '18px', fontWeight: '700', color: '#0F0F0F', letterSpacing: '-0.4px' }}>
          Reachio
        </h1>
      </div>

      {/* Main nav */}
      <nav style={{ flex: 1, paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {NAV_ITEMS.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/dashboard'}
            style={({ isActive }) => linkStyle(isActive)}
            onMouseEnter={e => {
              if (!e.currentTarget.style.background.includes('F3F4F6')) {
                e.currentTarget.style.background = '#F9FAFB';
                e.currentTarget.style.color = '#374151';
              }
            }}
            onMouseLeave={e => {
              if (!e.currentTarget.style.background.includes('F3F4F6')) {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#6B7280';
              }
            }}
          >
            <span style={{ fontSize: '15px', width: '18px', textAlign: 'center' }}>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Bottom nav */}
      <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {BOTTOM_ITEMS.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => linkStyle(isActive)}
            onMouseEnter={e => {
              if (!e.currentTarget.style.background.includes('F3F4F6')) {
                e.currentTarget.style.background = '#F9FAFB';
                e.currentTarget.style.color = '#374151';
              }
            }}
            onMouseLeave={e => {
              if (!e.currentTarget.style.background.includes('F3F4F6')) {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#6B7280';
              }
            }}
          >
            <span style={{ fontSize: '15px', width: '18px', textAlign: 'center' }}>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}

        {/* Sign out */}
        <button
          onClick={handleSignOut}
          style={{
            ...linkStyle(false),
            border: 'none',
            background: 'transparent',
            width: '100%',
            textAlign: 'left',
            cursor: 'pointer',
            marginTop: '4px',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#FEF2F2'; e.currentTarget.style.color = '#EF4444'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#6B7280'; }}
        >
          <span style={{ fontSize: '15px', width: '18px', textAlign: 'center' }}>→</span>
          Sign Out
        </button>
      </div>
    </aside>
  );
}