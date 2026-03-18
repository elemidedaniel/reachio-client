export default function Toggle({ checked, onChange, label, hint }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
      <div>
        {label && <p style={{ fontSize: '13.5px', fontWeight: '500', color: '#374151' }}>{label}</p>}
        {hint && <p style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '2px' }}>{hint}</p>}
      </div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        style={{
          width: '44px', height: '24px',
          borderRadius: '12px',
          background: checked ? 'var(--accent)' : '#E5E7EB',
          border: 'none', cursor: 'pointer',
          position: 'relative',
          transition: 'background 0.2s',
          flexShrink: 0,
        }}
      >
        <span style={{
          position: 'absolute',
          top: '2px',
          left: checked ? '22px' : '2px',
          width: '20px', height: '20px',
          borderRadius: '50%',
          background: '#fff',
          transition: 'left 0.2s',
          boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
        }} />
      </button>
    </div>
  );
}