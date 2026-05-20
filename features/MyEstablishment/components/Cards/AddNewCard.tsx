import React from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { PlusOutlined } from '@ant-design/icons';
import { useTranslations } from 'next-intl';

interface AddNewCardProps {
  tokens: {
    primary: string;
    text: string;
    textSecondary: string;
    border: string;
  };
  onClick: () => void;
}

export function AddNewCard({ tokens, onClick }: AddNewCardProps) {
  const t = useTranslations('my-establishment');

  return (
    <Card
      className="p-6 flex flex-col items-center justify-center min-h-75 cursor-pointer hover:scale-105 transition-transform border-2 border-dashed"
      style={{ borderColor: tokens.border }}
      onClick={onClick}
    >
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
        style={{ backgroundColor: tokens.primary + '15', color: tokens.primary }}
      >
        <PlusOutlined className="text-3xl" />
      </div>
      <h3
        className="text-xl font-bold mb-2"
        style={{ color: tokens.text }}
      >
        {t('addCard.title')}
      </h3>
      <p
        className="text-sm text-center mb-4"
        style={{ color: tokens.textSecondary }}
      >
        {t('addCard.description')}
      </p>
      <Button variant="secondary">
        {t('addCard.button')}
      </Button>
    </Card>
  );
}
