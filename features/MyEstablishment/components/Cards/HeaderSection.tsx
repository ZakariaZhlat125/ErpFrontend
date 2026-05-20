import React from 'react';
import { Button } from '@/components/ui/Button';
import { PlusOutlined } from '@ant-design/icons';
import { useTranslations } from 'next-intl';

interface HeaderSectionProps {
  tokens: {
    text: string;
    textSecondary: string;
  };
  onAddNew: () => void;
}

export function HeaderSection({ tokens, onAddNew }: HeaderSectionProps) {
  const t = useTranslations('my-establishment');

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold mb-2" style={{ color: tokens.text }}>
          {t('title')}
        </h1>
        <p style={{ color: tokens.textSecondary }}>
          {t('subtitle')}
        </p>
      </div>
      <Button 
        variant="primary" 
        onClick={onAddNew}
        aria-label={t('addNew')}
      >
        <PlusOutlined /> {t('addNew')}
      </Button>
    </div>
  );
}
