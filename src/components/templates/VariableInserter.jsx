const VARIABLES = [
  { key: '{{company_name}}',       label: 'Company Name',       desc: 'Acme Inc' },
  { key: '{{employee_name}}',      label: 'Employee Name',      desc: 'John' },
  { key: '{{employee_role}}',      label: 'Employee Role',      desc: 'CTO' },
  { key: '{{your_name}}',          label: 'Your Name',          desc: 'Daniel' },
  { key: '{{your_role}}',          label: 'Your Role',          desc: 'Frontend Developer' },
  { key: '{{your_skills}}',        label: 'Your Skills',        desc: 'React, Node.js' },
  { key: '{{your_bio}}',           label: 'Your Bio',           desc: 'Short bio text' },
  { key: '{{portfolio}}',          label: 'Portfolio URL',      desc: 'Only if filled' },
  { key: '{{linkedin}}',           label: 'LinkedIn',           desc: 'Only if filled' },
  { key: '{{github}}',             label: 'GitHub',             desc: 'Only if filled' },
  { key: '{{project_title}}',      label: 'Project Title',      desc: 'First work/project' },
  { key: '{{project_description}}',label: 'Project Description',desc: 'First work description' },
  { key: '{{project_url}}',        label: 'Project URL',        desc: 'Only if URL exists' },
  { key: '{{value_proposition}}',  label: 'Value Proposition',  desc: 'Custom per template' },
];

export default function VariableInserter({ onInsert }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <p style={{ fontSize: '12px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
        Click to insert variable
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {VARIABLES.map(v => (
          <button
            key={v.key}
            type="button"
            onClick={() => onInsert(v.key)}
            title={v.desc}
            style={{
              padding: '4px 10px',
              fontSize: '11.5px',
              background: '#F3F4F6',
              border: '1px solid #E5E7EB',
              borderRadius: '6px',
              color: '#374151',
              cursor: 'pointer',
              fontFamily: 'monospace',
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'var(--accent)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#F3F4F6'; e.currentTarget.style.color = '#374151'; e.currentTarget.style.borderColor = '#E5E7EB'; }}
          >
            {v.label}
          </button>
        ))}
      </div>
    </div>
  );
}