import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#F9FAFB',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
    }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#0F0F0F',
            letterSpacing: '-0.5px',
          }}>
            Reachio
          </h1>
          <p style={{ fontSize: '13px', color: '#6B7280', marginTop: '4px' }}>
            Cold outreach, automated.
          </p>
        </div>
        <Outlet />
      </div>
    </div>
  );
}