"use client";

import { Button } from '@/components/ui';
import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface BranchesHeaderProps {
  onAdd: () => void;
}

export function BranchesHeader({ onAdd }: BranchesHeaderProps) {
  const t = useTranslations('branches');

  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight text-text">
          {t('title')}
        </h1>
        <p className="mt-1 text-base text-text-secondary">
          {t('description')}
        </p>
      </div>

      <Button variant="primary" onClick={onAdd}>
        <Plus className="mr-2 h-4 w-4" />
        {t('addBranch')}
      </Button>
    </div>
  );
}
