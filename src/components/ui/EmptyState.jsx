import Button from './Button';

export default function EmptyState({ icon = '📭', title, subtitle, action, actionLabel }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '64px 24px', textAlign: 'center',
    }}>
      <span style={{ fontSize: '40px', marginBottom: '16px' }}>{icon}</span>
      <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#0F0F0F', marginBottom: '6px' }}>
        {title}
      </h3>
      {subtitle && (
        <p style={{ fontSize: '13px', color: '#6B7280', maxWidth: '320px', lineHeight: '1.6' }}>
          {subtitle}
        </p>
      )}
      {action && actionLabel && (
        <div style={{ marginTop: '20px' }}>
          <Button onClick={action}>{actionLabel}</Button>
        </div>
      )}
    </div>
  );
}