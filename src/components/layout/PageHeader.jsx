export default function PageHeader({ title, subtitle, action }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginBottom: '28px',
      flexWrap: 'wrap',
      gap: '12px',
    }}>
      <div>
        <h1 style={{ fontSize: '20px', fontWeight: '600', color: '#0F0F0F', letterSpacing: '-0.3px' }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{ fontSize: '13px', color: '#6B7280', marginTop: '4px' }}>
            {subtitle}
          </p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}