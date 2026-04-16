'use client';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useTheme } from '@/lib/theme/use-theme';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { 
  BuildOutlined, 
  PlusOutlined,
  ArrowRightOutlined,
  TeamOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  StarOutlined,
} from '@ant-design/icons';

export function MyEstablishment() {
  const { tokens } = useTheme();
  const router = useRouter();
  const t = useTranslations('my-establishment');

  const establishments = [
    {
      id: 1,
      name: 'شركة الأفق للتقنية',
      type: 'شركة تقنية',
      location: 'الرياض، السعودية',
      phone: '+966 11 234 5678',
      employees: 150,
      status: 'active',
      lastAccess: 'منذ 2 ساعة',
    },
    {
      id: 2,
      name: 'مجموعة النور الصناعية',
      type: 'صناعة',
      location: 'جدة، السعودية',
      phone: '+966 12 345 6789',
      employees: 320,
      status: 'active',
      lastAccess: 'منذ يوم',
    },
    {
      id: 3,
      name: 'شركة الخليج للخدمات',
      type: 'خدمات',
      location: 'الدمام، السعودية',
      phone: '+966 13 456 7890',
      employees: 85,
      status: 'active',
      lastAccess: 'منذ 3 أيام',
    },
  ];

  const handleSelectEstablishment = (id: number) => {
    // Navigate to dashboard with selected establishment
    router.push(`/${id}/dashboard`);
  };

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2" style={{ color: tokens.text }}>
              {t('title')}
            </h1>
            <p style={{ color: tokens.textSecondary }}>
              {t('subtitle')}
            </p>
          </div>
          <Button variant="primary">
            <PlusOutlined /> {t('addNew')}
          </Button>
        </div>

        {/* Stats */}
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
                  {establishments.length}
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
                  {establishments.reduce((sum, e) => sum + e.employees, 0)}
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
                  {establishments.filter(e => e.status === 'active').length}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Establishments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {establishments.map((establishment) => (
            <Card 
              key={establishment.id} 
              className="p-6 hover:scale-105 transition-transform cursor-pointer"
              onClick={() => handleSelectEstablishment(establishment.id)}
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
                {establishment.type}
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <EnvironmentOutlined style={{ color: tokens.textSecondary, fontSize: '1rem' }} />
                  <span style={{ color: tokens.text }}>{establishment.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <PhoneOutlined style={{ color: tokens.textSecondary, fontSize: '1rem' }} />
                  <span style={{ color: tokens.text }}>{establishment.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <TeamOutlined style={{ color: tokens.textSecondary, fontSize: '1rem' }} />
                  <span style={{ color: tokens.text }}>{establishment.employees} {t('card.employees')}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4" style={{ borderTop: `1px solid ${tokens.border}` }}>
                <span className="text-sm" style={{ color: tokens.textSecondary }}>
                  {t('card.lastAccess')} {establishment.lastAccess}
                </span>
                <Button variant="ghost" size="sm">
                  {t('card.enter')} <ArrowRightOutlined />
                </Button>
              </div>
            </Card>
          ))}

          {/* Add New Establishment Card */}
          <Card 
            className="p-6 flex flex-col items-center justify-center min-h-[300px] cursor-pointer hover:scale-105 transition-transform border-2 border-dashed"
            style={{ borderColor: tokens.border }}
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
        </div>

        {/* Quick Access */}
        <Card className="p-6">
          <h2 
            className="text-xl font-bold mb-4"
            style={{ color: tokens.text }}
          >
            {t('quickAccess.title')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: t('quickAccess.hr'), icon: <TeamOutlined />, path: '/hr' },
              { name: t('quickAccess.finance'), icon: <BuildOutlined />, path: '/finance' },
              { name: t('quickAccess.inventory'), icon: <BuildOutlined />, path: '/inventory' },
              { name: t('quickAccess.projects'), icon: <BuildOutlined />, path: '/projects' },
              { name: t('quickAccess.reports'), icon: <BuildOutlined />, path: '/reports' },
              { name: t('quickAccess.settings'), icon: <BuildOutlined />, path: '/settings' },
            ].map((item) => (
              <Button
                key={item.name}
                variant="secondary"
                className="flex flex-col items-center gap-2 py-6 h-auto"
                onClick={() => router.push(`/${establishments[0].id}${item.path}`)}
              >
                <div style={{ color: tokens.primary }}>{item.icon}</div>
                <span className="text-sm">{item.name}</span>
              </Button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
