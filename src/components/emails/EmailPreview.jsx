import Button from '../ui/Button';

export default function EmailPreview({ template, profile, company }) {
  if (!template) return null;

  const resolve = (text) => {
    if (!text) return '';
    const works = profile?.works || [];
    const firstWork = works[0] || {};
    const vars = {
      '{{company_name}}':        company?.name || '[Company Name]',
      '{{employee_name}}':       company?.employee_name?.split(' ')[0] || '[Name]',
      '{{employee_role}}':       company?.employee_role || '',
      '{{your_name}}':           profile?.full_name || '[Your Name]',
      '{{your_role}}':           profile?.role || '[Your Role]',
      '{{your_skills}}':         (profile?.skills || []).join(', ') || '',
      '{{your_bio}}':            profile?.bio || '',
      '{{portfolio}}':           profile?.portfolio_url ? `Portfolio: ${profile.portfolio_url}` : '',
      '{{linkedin}}':            profile?.linkedin ? `LinkedIn: ${profile.linkedin}` : '',
      '{{github}}':              profile?.github ? `GitHub: ${profile.github}` : '',
      '{{project_title}}':       firstWork.title || '',
      '{{project_description}}': firstWork.description || '',
      '{{project_url}}':         firstWork.url ? `${firstWork.url}` : '',
      '{{value_proposition}}':   '',
    };

    let result = text;
    Object.entries(vars).forEach(([k, v]) => {
      result = result.replaceAll(k, v);
    });

    // Clean up empty lines from missing variables
    result = result.replace(/\n{3,}/g, '\n\n').trim();
    return result;
  };

  const resolvedSubject = resolve(template.subject);
  const resolvedBody    = resolve(template.body);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Subject */}
      <div style={{ background: '#F9FAFB', borderRadius: '8px', padding: '12px 16px', border: '1px solid #E5E7EB' }}>
        <p style={{ fontSize: '11px', color: '#9CA3AF', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Subject</p>
        <p style={{ fontSize: '14px', fontWeight: '500', color: '#0F0F0F' }}>{resolvedSubject}</p>
      </div>

      {/* Body */}
      <div style={{ background: '#fff', borderRadius: '8px', padding: '20px', border: '1px solid #E5E7EB' }}>
        <p style={{ fontSize: '11px', color: '#9CA3AF', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Body</p>
        <pre style={{
          fontSize: '13.5px', color: '#374151', lineHeight: '1.75',
          whiteSpace: 'pre-wrap', fontFamily: 'inherit', margin: 0,
        }}>
          {resolvedBody}
        </pre>
      </div>

      {/* CV */}
      <div style={{ background: '#F9FAFB', borderRadius: '8px', padding: '10px 14px', border: '1px solid #E5E7EB' }}>
        <p style={{ fontSize: '12px', color: '#6B7280' }}>
          Attachment: {template.custom_cv_url ? `Custom CV — ${template.custom_cv_url}` : profile?.cv_url ? `Profile CV — ${profile.cv_url}` : 'No CV attached'}
        </p>
      </div>
    </div>
  );
}