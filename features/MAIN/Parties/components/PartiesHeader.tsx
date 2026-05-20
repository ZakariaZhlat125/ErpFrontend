import { Button } from '@/components/ui';
import { PlusOutlined } from '@ant-design/icons';

interface PartiesHeaderProps {
  onAddParty: () => void;
}

export function PartiesHeader({ onAddParty }: PartiesHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight text-text">
          Parties
        </h1>
        <p className="mt-1 text-base text-text-secondary">
          Manage customers, suppliers, agents, and contractors
        </p>
      </div>

      <Button variant="primary" onClick={onAddParty}>
        <PlusOutlined /> Add Party
      </Button>
    </div>
  );
}
