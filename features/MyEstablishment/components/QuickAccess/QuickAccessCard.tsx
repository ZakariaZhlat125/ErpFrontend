'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { useTheme } from '@/lib/theme/use-theme';
import { useTranslations } from 'next-intl';
import {
  TeamOutlined,
  BuildOutlined,
  DollarOutlined,
  InboxOutlined,
  ProjectOutlined,
  FileTextOutlined,
  SettingOutlined,
} from '@ant-design/icons';

interface QuickAccessCardProps {
  onQuickAccess: (path: string) => void;
}

export function QuickAccessCard({ onQuickAccess }: QuickAccessCardProps) {
  const { tokens } = useTheme();
  const t = useTranslations('my-establishment');

  const quickAccessItems = [
    { name: t('quickAccess.hr'), icon: <TeamOutlined />, path: '/hr', color: tokens.primary },
    { name: t('quickAccess.finance'), icon: <DollarOutlined />, path: '/finance', color: tokens.success },
    { name: t('quickAccess.inventory'), icon: <InboxOutlined />, path: '/inventory', color: tokens.warning },
    { name: t('quickAccess.projects'), icon: <ProjectOutlined />, path: '/projects', color: tokens.info },
    { name: t('quickAccess.reports'), icon: <FileTextOutlined />, path: '/reports', color: '#8b5cf6' },
    { name: t('quickAccess.settings'), icon: <SettingOutlined />, path: '/settings', color: tokens.textSecondary },
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2
          className="text-2xl font-bold"
          style={{ color: tokens.text }}
        >
          {t('quickAccess.title')}
        </h2>
        <div 
          className="text-sm font-medium"
          style={{ color: tokens.textSecondary }}
        >
          {quickAccessItems.length} modules
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {quickAccessItems.map((item) => (
          <button
            key={item.name}
            onClick={() => onQuickAccess(item.path)}
            aria-label={item.name}
            className="group relative flex flex-col items-center gap-3 p-4 rounded-xl transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: tokens.surface,
              border: `1px solid ${tokens.border}`,
              cursor: 'pointer',
            }}
          >
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110"
              style={{
                backgroundColor: `${item.color}15`,
                color: item.color,
              }}
            >
              <span className="text-xl">{item.icon}</span>
            </div>
            <span
              className="text-sm font-medium text-center transition-colors duration-300"
              style={{ color: tokens.text }}
            >
              {item.name}
            </span>
            <div
              className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                boxShadow: `0 4px 20px ${item.color}20`,
              }}
            />
          </button>
        ))}
      </div>
    </Card>
  );
}
