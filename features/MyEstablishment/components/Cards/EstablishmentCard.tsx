import React from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import {
  BuildOutlined,
  ArrowRightOutlined,
  TeamOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { useTranslations } from 'next-intl';
import { Organization } from '../../types/organization.types';

interface EstablishmentCardProps {
  establishment: Organization;
  tokens: {
    background: string;
    primary: string;
    success: string;
    warning: string;
    text: string;
    textSecondary: string;
    border: string;
  };
  onSelect: (establishment: Organization) => void;
  onEdit: (e: React.MouseEvent, establishment: Organization) => void;
  onDelete: (e: React.MouseEvent, id: number) => void;
}

export function EstablishmentCard({
  establishment,
  tokens,
  onSelect,
  onEdit,
  onDelete,
}: EstablishmentCardProps) {
  const t = useTranslations('my-establishment');

  return (
    <Card
      className="p-6 hover:scale-105 transition-transform cursor-pointer"
      onClick={() => onSelect(establishment)}
      role="button"
      tabIndex={0}
      aria-label={`Select ${establishment.name}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(establishment);
        }
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-16 h-16 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: tokens.primary + '15', color: tokens.primary }}
        >
          <BuildOutlined className="text-3xl" />
        </div>
        <span
          className="px-3 py-1 rounded-full text-xs font-medium"
          style={{
            backgroundColor: establishment.status === 'active' ? tokens.success + '15' : tokens.warning + '15',
            color: establishment.status === 'active' ? tokens.success : tokens.warning
          }}
        >
          {establishment.status === 'active' ? t('status.active') : t('status.inactive')}
        </span>
      </div>

      <h3
        className="text-xl font-bold mb-1"
        style={{ color: tokens.text }}
      >
        {establishment.name}
      </h3>
      <p className="text-sm mb-4" style={{ color: tokens.textSecondary }}>
        {establishment.legal_name}
      </p>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <EnvironmentOutlined style={{ color: tokens.textSecondary, fontSize: '1rem' }} />
          <span style={{ color: tokens.text }}>{establishment.address}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <PhoneOutlined style={{ color: tokens.textSecondary, fontSize: '1rem' }} />
          <span style={{ color: tokens.text }}>{establishment.phone}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <TeamOutlined style={{ color: tokens.textSecondary, fontSize: '1rem' }} />
          <span style={{ color: tokens.text }}>{establishment.email}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4" style={{ borderTop: `1px solid ${tokens.border}` }}>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => onEdit(e, establishment)}
            aria-label={`Edit ${establishment.name}`}
          >
            <EditOutlined />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => onDelete(e, establishment.id)}
            aria-label={`Delete ${establishment.name}`}
          >
            <DeleteOutlined />
          </Button>
        </div>
        <Button variant="ghost" size="sm">
          {t('card.enter')} <ArrowRightOutlined />
        </Button>
      </div>
    </Card>
  );
}
