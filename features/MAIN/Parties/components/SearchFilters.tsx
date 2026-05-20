import { Button, Input, Select } from '@/components/ui';
import { Card } from '@/components/ui/Card';
import { SearchOutlined, DownOutlined } from '@ant-design/icons';

export function SearchFilters() {
  return (
    <Card className="mb-6 p-5">
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="flex flex-1 items-center gap-3">
          <SearchOutlined className="text-lg text-(--text-muted)" />
          <Input placeholder="Search parties..." className="flex-1" />
        </div>

        <Select
          placeholder="All Types"
          options={[
            { label: 'Individual', value: 'individual' },
            { label: 'Company', value: 'company' },
          ]}
        />

        <Select
          placeholder="All Roles"
          options={[
            { label: 'Customer', value: 'customer' },
            { label: 'Supplier', value: 'supplier' },
            { label: 'Agent', value: 'agent' },
            { label: 'Contractor', value: 'contractor' },
          ]}
        />

        <Button variant="secondary" className="min-w-32">
          Active <DownOutlined className="text-xs ml-2" />
        </Button>
      </div>
    </Card>
  );
}
