import React from 'react';
import { Card } from '@/components/ui/Card';
import { BuildOutlined, TeamOutlined, StarOutlined } from '@ant-design/icons';
import { useTranslations } from 'next-intl';

interface StatsSectionProps {
  totalEstablishments: number;
  totalEmployees: number;
  activeEstablishments: number;
  tokens: {
    background: string;
    primary: string;
    success: string;
    info: string;
    text: string;
    textSecondary: string;
  };
}

export function StatsSection({
  totalEstablishments,
  totalEmployees,
  activeEstablishments,
  tokens,
}: StatsSectionProps) {
  const t = useTranslations('my-establishment');

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: tokens.primary + '15', color: tokens.primary }}
          >
            <BuildOutlined className="text-2xl" />
          </div>
          <div>
            <p className="text-sm" style={{ color: tokens.textSecondary }}>
              {t('stats.totalEstablishments')}
            </p>
            <p className="text-2xl font-bold" style={{ color: tokens.text }}>
              {totalEstablishments}
            </p>
          </div>
        </div>
      </Card>
      <Card>
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: tokens.success + '15', color: tokens.success }}
          >
            <TeamOutlined className="text-2xl" />
          </div>
          <div>
            <p className="text-sm" style={{ color: tokens.textSecondary }}>
              {t('stats.totalEmployees')}
            </p>
            <p className="text-2xl font-bold" style={{ color: tokens.text }}>
              {totalEmployees}
            </p>
          </div>
        </div>
      </Card>
      <Card>
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: tokens.info + '15', color: tokens.info }}
          >
            <StarOutlined className="text-2xl" />
          </div>
          <div>
            <p className="text-sm" style={{ color: tokens.textSecondary }}>
              {t('stats.activeEstablishments')}
            </p>
            <p className="text-2xl font-bold" style={{ color: tokens.text }}>
              {activeEstablishments}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
