import { useState, useRef } from 'react';
import Button from '../ui/Button';

export default function CSVImport({ onImport }) {
  const [preview, setPreview]   = useState([]);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');
  const fileRef                 = useRef(null);

  const parseCSV = (text) => {
    const lines  = text.trim().split('\n');
    const header = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/\s+/g, '_'));
    return lines.slice(1).map(line => {
      const values = line.split(',');
      return header.reduce((obj, key, i) => {
        obj[key] = values[i]?.trim() || '';
        return obj;
      }, {});
    });
  };

  const handleFile = (e) => {
    setError('');
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const rows = parseCSV(ev.target.result);
        if (rows.length === 0) { setError('CSV is empty'); return; }
        setPreview(rows.slice(0, 3));
      } catch {
        setError('Invalid CSV format');
      }
    };
    reader.readAsText(file);
  };

  const handleImport = async () => {
    const file = fileRef.current.files[0];
    if (!file) return;
    setLoading(true);
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const rows = parseCSV(ev.target.result);
      await onImport(rows);
      setPreview([]);
      setLoading(false);
      fileRef.current.value = '';
    };
    reader.readAsText(file);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{
        border: '2px dashed #E5E7EB', borderRadius: '10px',
        padding: '32px', textAlign: 'center',
      }}>
        <p style={{ fontSize: '14px', color: '#374151', marginBottom: '6px', fontWeight: '500' }}>
          Upload CSV File
        </p>
        <p style={{ fontSize: '12.5px', color: '#9CA3AF', marginBottom: '16px' }}>
          Required columns: <code>name, employee_name, employee_email</code><br />
          Optional: <code>industry, website, employee_role, notes</code>
        </p>
        <input
          ref={fileRef}
          type="file"
          accept=".csv"
          onChange={handleFile}
          style={{ display: 'none' }}
          id="csv-upload"
        />
        <label htmlFor="csv-upload">
          <Button variant="ghost" onClick={() => fileRef.current.click()} type="button">
            Choose File
          </Button>
        </label>
      </div>

      {error && (
        <p style={{ fontSize: '13px', color: '#EF4444' }}>{error}</p>
      )}

      {preview.length > 0 && (
        <div>
          <p style={{ fontSize: '12.5px', color: '#6B7280', marginBottom: '8px' }}>
            Preview (first 3 rows):
          </p>
          <div style={{ overflowX: 'auto', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12.5px' }}>
              <thead>
                <tr style={{ background: '#F9FAFB' }}>
                  {Object.keys(preview[0]).map(k => (
                    <th key={k} style={{ padding: '8px 12px', textAlign: 'left', color: '#6B7280', fontWeight: '500' }}>{k}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {preview.map((row, i) => (
                  <tr key={i} style={{ borderTop: '1px solid #F3F4F6' }}>
                    {Object.values(row).map((val, j) => (
                      <td key={j} style={{ padding: '8px 12px', color: '#374151' }}>{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
            <Button onClick={handleImport} loading={loading}>
              Import Companies
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}