import Table from '../ui/Table';
import CompanyRow from './CompanyRow';
import EmptyState from '../ui/EmptyState';

const COLUMNS = ['Company', 'Contact', 'Role', 'Status', 'Added', 'Actions'];

export default function CompanyTable({
  companies, loading, onEdit,
  onDelete, onToggleBlacklist, blacklisting,
}) {
  if (!loading && companies.length === 0) {
    return (
      <EmptyState
        icon="🏢"
        title="No companies yet"
        subtitle="Add companies manually or import from a CSV file"
      />
    );
  }

  return (
    <Table columns={COLUMNS} loading={loading}>
      {companies.map(company => (
        <CompanyRow
          key={company.id}
          company={company}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleBlacklist={onToggleBlacklist}
          blacklisting={blacklisting}
        />
      ))}
    </Table>
  );
}