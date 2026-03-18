import Badge from '../ui/Badge';
import Button from '../ui/Button';
import BlacklistBadge from './BlacklistBadge';
import { Tr, Td } from '../ui/Table';

export default function CompanyRow({ company, onEdit, onDelete, onToggleBlacklist, blacklisting }) {
  const firstName = company.employee_name?.split(' ')[0] || company.employee_name;

  return (
    <Tr>
      <Td>
        <div>
          <p style={{ fontWeight: '500', color: '#0F0F0F', marginBottom: '1px' }}>{company.name}</p>
          {company.industry && (
            <p style={{ fontSize: '12px', color: '#9CA3AF' }}>{company.industry}</p>
          )}
        </div>
      </Td>
      <Td>
        <div>
          <p style={{ color: '#374151' }}>{firstName}</p>
          <p style={{ fontSize: '12px', color: '#9CA3AF' }}>{company.employee_email}</p>
        </div>
      </Td>
      <Td muted>{company.employee_role || '—'}</Td>
      <Td>
        <Badge label={company.blacklisted ? 'Blacklisted' : company.status} />
      </Td>
      <Td muted>{new Date(company.created_at).toLocaleDateString()}</Td>
      <Td>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <Button size="sm" variant="ghost" onClick={() => onEdit(company)}>
            Edit
          </Button>
          <BlacklistBadge
            blacklisted={company.blacklisted}
            onToggle={() => onToggleBlacklist(company)}
            loading={blacklisting === company.id}
          />
          <Button size="sm" variant="danger" onClick={() => onDelete(company.id)}>
            Delete
          </Button>
        </div>
      </Td>
    </Tr>
  );
}