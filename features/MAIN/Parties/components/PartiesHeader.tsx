"use client";

import { Button } from '@/components/ui';
import { PlusOutlined } from '@ant-design/icons';
import { useTranslations } from 'next-intl';

interface PartiesHeaderProps {
  onAdd: () => void;
}

export function PartiesHeader({ onAdd }: PartiesHeaderProps) {
  const t = useTranslations('parties');

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{t('title')}</h1>
        <p className="text-muted-foreground">
          {t('description')}
        </p>
      </div>
      <Button onClick={onAdd} icon={<PlusOutlined />}>
        {t('addParty')}
      </Button>
    </div>
  );
}
