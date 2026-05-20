import { Button, Input } from '@/components/ui';
import { Card } from '@/components/ui/Card';
import { SearchOutlined, DownOutlined } from '@ant-design/icons';

export function SearchFilters() {
  return (
    <Card className="mb-6 p-5">
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="flex flex-1 items-center gap-3">
          <SearchOutlined className="text-lg text-(--text-muted)" />
          <Input placeholder="Search branches..." className="flex-1" />
        </div>

        <Button variant="secondary" className="min-w-52.5">
          All Organizations <DownOutlined className="text-xs" />
        </Button>
      </div>
    </Card>
  );
}
