'use client';

import { Button } from '@/components/ui';
import { PlusOutlined } from '@ant-design/icons';

interface PageHeaderProps {
  onAddClick: () => void;
}

export function PageHeader({ onAddClick }: PageHeaderProps) {
  return (
    <div className="mb-5 flex items-start justify-between gap-4">
      <div>
        <h1
          className="text-[20px] font-bold leading-tight md:text-[22px]"
          style={{ color: '#111827' }}
        >
          Roles & Permissions
        </h1>
        <p
          className="mt-1 text-[13px]"
          style={{ color: '#6b7280' }}
        >
          Manage user roles and their permissions
        </p>
      </div>

      <Button variant="primary" onClick={onAddClick}>
        <PlusOutlined /> Create Role
      </Button>
    </div>
  );
}
