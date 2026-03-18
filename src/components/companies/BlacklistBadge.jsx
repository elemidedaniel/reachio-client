import Button from '../ui/Button';

export default function BlacklistBadge({ blacklisted, onToggle, loading }) {
  return (
    <Button
      size="sm"
      variant={blacklisted ? 'danger' : 'ghost'}
      onClick={onToggle}
      loading={loading}
    >
      {blacklisted ? 'Unblacklist' : 'Blacklist'}
    </Button>
  );
}