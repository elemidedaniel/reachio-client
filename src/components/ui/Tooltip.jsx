import { useState } from 'react';

export default function Tooltip({ text, children }) {
  const [show, setShow] = useState(false);

  return (
    <div
      style={{ position: 'relative', display: 'inline-flex' }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div style={{
          position: 'absolute', bottom: '100%', left: '50%',
          transform: 'translateX(-50%)', marginBottom: '6px',
          background: '#1F2937', color: '#fff',
          fontSize: '12px', padding: '5px 10px',
          borderRadius: '6px', whiteSpace: 'nowrap',
          zIndex: 999, pointerEvents: 'none',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        }}>
          {text}
          <div style={{
            position: 'absolute', top: '100%', left: '50%',
            transform: 'translateX(-50%)',
            border: '4px solid transparent',
            borderTopColor: '#1F2937',
          }} />
        </div>
      )}
    </div>
  );
}