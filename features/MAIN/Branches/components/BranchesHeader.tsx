import { Button } from '@/components/ui';
import { PlusOutlined } from '@ant-design/icons';

interface BranchesHeaderProps {
  onAddBranch: () => void;
}

export function BranchesHeader({ onAddBranch }: BranchesHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight text-text">
          Branches
        </h1>
        <p className="mt-1 text-base text-text-secondary">
          Manage all branch locations across organizations
        </p>
      </div>

      <Button variant="primary" onClick={onAddBranch}>
        <PlusOutlined /> Add Branch
      </Button>
    </div>
  );
}
