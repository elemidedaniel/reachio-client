import { useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import Button from '../ui/Button';

const COLOR_OPTIONS = [
  { key: 'black',  label: 'Midnight',  hex: '#0F0F0F', desc: 'Default — clean and sharp' },
  { key: 'blue',   label: 'Cobalt',    hex: '#2563EB', desc: 'Professional and trustworthy' },
  { key: 'orange', label: 'Ember',     hex: '#E85D26', desc: 'Bold and energetic' },
  { key: 'green',  label: 'Forest',    hex: '#16A34A', desc: 'Fresh and growth-focused' },
];

export default function ColorPicker({ profile, onSave, saving }) {
  const { accent, changeAccent } = useTheme();

  useEffect(() => {
    if (profile?.accent_color) {
      const match = COLOR_OPTIONS.find(c => c.hex === profile.accent_color);
      if (match) changeAccent(match.key);
    }
  }, [profile]);

  const handleSelect = (option) => {
    changeAccent(option.key);
    onSave({ accent_color: option.hex });
  };

  return (
    <div style={{
      background: '#fff', borderRadius: '12px',
      border: '1px solid #E5E7EB', padding: '24px',
    }}>
      <h3 style={{ fontSize: '13.5px', fontWeight: '600', color: '#0F0F0F', marginBottom: '4px' }}>
        Accent Color
      </h3>
      <p style={{ fontSize: '12px', color: '#9CA3AF', marginBottom: '24px' }}>
        Choose your preferred accent color for the dashboard
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
        {COLOR_OPTIONS.map(option => {
          const isSelected = accent === option.hex;
          return (
            <button
              key={option.key}
              onClick={() => handleSelect(option)}
              style={{
                display: 'flex', alignItems: 'center', gap: '14px',
                padding: '16px', borderRadius: '10px',
                border: `2px solid ${isSelected ? option.hex : '#E5E7EB'}`,
                background: isSelected ? `${option.hex}08` : '#fff',
                cursor: 'pointer', textAlign: 'left',
                transition: 'all 0.15s', fontFamily: 'inherit',
              }}
            >
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%',
                background: option.hex, flexShrink: 0,
                boxShadow: isSelected ? `0 0 0 3px ${option.hex}33` : 'none',
                transition: 'box-shadow 0.15s',
              }} />
              <div>
                <p style={{ fontSize: '13.5px', fontWeight: '500', color: '#0F0F0F', marginBottom: '2px' }}>
                  {option.label}
                </p>
                <p style={{ fontSize: '12px', color: '#9CA3AF' }}>
                  {option.desc}
                </p>
              </div>
              {isSelected && (
                <span style={{ marginLeft: 'auto', color: option.hex, fontSize: '16px' }}>✓</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}