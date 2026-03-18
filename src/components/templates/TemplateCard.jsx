import Button from '../ui/Button';
import Badge from '../ui/Badge';

export default function TemplateCard({ template, onEdit, onDelete, onPreview }) {
  const previewText = template.body.slice(0, 120).replace(/\n/g, ' ');

  return (
    <div style={{
      background: '#fff', borderRadius: '12px',
      border: '1px solid #E5E7EB', padding: '20px',
      display: 'flex', flexDirection: 'column', gap: '14px',
      transition: 'border-color 0.15s',
    }}
      onMouseEnter={e => e.currentTarget.style.borderColor = '#D1D5DB'}
      onMouseLeave={e => e.currentTarget.style.borderColor = '#E5E7EB'}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
            <p style={{ fontSize: '14px', fontWeight: '600', color: '#0F0F0F' }}>{template.name}</p>
            {template.is_followup && <Badge label="Follow-up" type="warning" />}
            {template.industry && <Badge label={template.industry} type="info" />}
          </div>
          <p style={{ fontSize: '12.5px', color: '#6B7280' }}>
            Subject: <span style={{ color: '#374151' }}>{template.subject}</span>
          </p>
        </div>
      </div>

      {/* Preview */}
      <p style={{
        fontSize: '13px', color: '#9CA3AF', lineHeight: '1.6',
        background: '#F9FAFB', borderRadius: '8px',
        padding: '12px', fontStyle: 'italic',
      }}>
        {previewText}...
      </p>

      {/* CV info */}
      <p style={{ fontSize: '12px', color: '#9CA3AF' }}>
        CV: {template.custom_cv_url ? '✓ Custom CV attached' : 'Using profile CV'}
      </p>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '8px', paddingTop: '4px', borderTop: '1px solid #F3F4F6' }}>
        <Button size="sm" variant="ghost" onClick={() => onPreview(template)}>Preview</Button>
        <Button size="sm" variant="ghost" onClick={() => onEdit(template)}>Edit</Button>
        <Button size="sm" variant="danger" onClick={() => onDelete(template.id)}>Delete</Button>
      </div>
    </div>
  );
}