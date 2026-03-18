export default function Select({
  label, value, onChange, options,
  error, required = false, placeholder, hint,
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
      {label && (
        <label style={{ fontSize: '12.5px', fontWeight: '500', color: '#374151' }}>
          {label} {required && <span style={{ color: '#EF4444' }}>*</span>}
        </label>
      )}
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          padding: '9px 12px',
          fontSize: '13.5px',
          border: `1px solid ${error ? '#FCA5A5' : '#E5E7EB'}`,
          borderRadius: '8px',
          outline: 'none',
          background: '#fff',
          color: value ? '#0F0F0F' : '#9CA3AF',
          width: '100%',
          fontFamily: 'inherit',
          cursor: 'pointer',
          transition: 'border-color 0.15s',
        }}
        onFocus={e => e.target.style.borderColor = 'var(--accent)'}
        onBlur={e => e.target.style.borderColor = error ? '#FCA5A5' : '#E5E7EB'}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {hint && !error && <p style={{ fontSize: '12px', color: '#9CA3AF' }}>{hint}</p>}
      {error && <p style={{ fontSize: '12px', color: '#EF4444' }}>{error}</p>}
    </div>
  );
}