'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/lib/theme/use-theme';
import { useLocale, useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { 
  DashboardOutlined, 
  UserOutlined, 
  SafetyOutlined, 
  BankOutlined, 
  BranchesOutlined, 
  PaperClipOutlined, 
  LineChartOutlined,
  TeamOutlined,
  AlertOutlined,
  FileTextOutlined,
  ShoppingOutlined,
  ShopOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DownOutlined,
  CaretDownOutlined,
  WalletOutlined,
  DatabaseOutlined,
  SwapOutlined,
  SyncOutlined,
  CalculatorOutlined,
  SettingOutlined,
} from '@ant-design/icons';

interface NavItem {
  key: string;
  icon: React.ReactNode;
  labelKey: string;
  section: string;
  category?: string;
}

const navItems: NavItem[] = [
  { key: 'dashboard', icon: <DashboardOutlined />, labelKey: 'public.sidebar.dashboard', section: 'dashboard', category: 'MAIN' },
  { key: 'users', icon: <UserOutlined />, labelKey: 'public.sidebar.users', section: 'users', category: 'MAIN' },
  { key: 'roles', icon: <SafetyOutlined />, labelKey: 'public.sidebar.roles', section: 'roles', category: 'MAIN' },
  { key: 'organizations', icon: <BankOutlined />, labelKey: 'public.sidebar.organizations', section: 'organizations', category: 'MAIN' },
  { key: 'branches', icon: <BranchesOutlined />, labelKey: 'public.sidebar.branches', section: 'branches', category: 'MAIN' },
  { key: 'attachments', icon: <PaperClipOutlined />, labelKey: 'public.sidebar.attachments', section: 'attachments', category: 'MAIN' },
  { key: 'activity', icon: <LineChartOutlined />, labelKey: 'public.sidebar.activity', section: 'activity', category: 'MAIN' },
  { key: 'parties', icon: <TeamOutlined />, labelKey: 'public.sidebar.parties', section: 'parties', category: 'ACCOUNTING' },
  { key: 'accounts', icon: <AlertOutlined />, labelKey: 'public.sidebar.accounts', section: 'accounts', category: 'ACCOUNTING' },
  { key: 'invoices', icon: <FileTextOutlined />, labelKey: 'public.sidebar.invoices', section: 'invoices', category: 'ACCOUNTING' },
  { key: 'payments', icon: <ShoppingOutlined />, labelKey: 'public.sidebar.payments', section: 'payments', category: 'ACCOUNTING' },
  { key: 'journal', icon: <FileTextOutlined />, labelKey: 'public.sidebar.journal', section: 'journal', category: 'ACCOUNTING' },
  { key: 'reports', icon: <LineChartOutlined />, labelKey: 'public.sidebar.reports', section: 'reports', category: 'ACCOUNTING' },
  { key: 'products', icon: <ShopOutlined />, labelKey: 'public.sidebar.products', section: 'products', category: 'INVENTORY' },
  { key: 'warehouses', icon: <DatabaseOutlined />, labelKey: 'public.sidebar.warehouses', section: 'warehouses', category: 'INVENTORY' },
  { key: 'stock-balances', icon: <WalletOutlined />, labelKey: 'public.sidebar.stockBalances', section: 'stock-balances', category: 'INVENTORY' },
  { key: 'stock-movements', icon: <SwapOutlined />, labelKey: 'public.sidebar.stockMovements', section: 'stock-movements', category: 'INVENTORY' },
  { key: 'stock-transfer', icon: <SyncOutlined />, labelKey: 'public.sidebar.stockTransfer', section: 'stock-transfer', category: 'INVENTORY' },
  { key: 'stock-count', icon: <CalculatorOutlined />, labelKey: 'public.sidebar.stockCount', section: 'stock-count', category: 'INVENTORY' },
  { key: 'settings', icon: <SettingOutlined />, labelKey: 'public.sidebar.settings', section: 'settings', category: 'SETTINGS' },
];

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

export function Sidebar({ collapsed = false, onToggle }: SidebarProps) {
  const { tokens } = useTheme();
  const t = useTranslations();
  const locale = useLocale();
  const params = useParams();
  const establishmentId = params?.establishmentId as string;
  const [isHovered, setIsHovered] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    MAIN: true,
    ACCOUNTING: true,
    INVENTORY: true,
    SETTINGS: true,
  });

  const groupedItems = navItems.reduce((acc, item) => {
    const category = item.category || 'MAIN';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, NavItem[]>);

  const categoryOrder = ['MAIN', 'ACCOUNTING', 'INVENTORY', 'SETTINGS'];
  const orderedCategories = categoryOrder.filter(cat => groupedItems[cat]);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const getLocalizedPath = (section: string) => {
    if (establishmentId) {
      return `/${locale}/${establishmentId}/${section}/`;
    }
    return `/${locale}/${section}/`;
  };

  return (
    <aside
      className={`h-screen flex flex-col transition-all duration-300 ${
        collapsed && !isHovered ? 'w-16' : 'w-96'
      }`}
      style={{ background: 'var(--sidebar-bg)' }}
      onMouseEnter={() => collapsed && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`flex items-center justify-between gap-3 ${collapsed && !isHovered ? 'p-3 justify-center' : 'p-6'}`}>
        <div className={`flex items-center gap-3 ${collapsed && !isHovered ? 'cursor-pointer' : ''}`} onClick={collapsed && !isHovered ? onToggle : undefined}>
          <div
            className={`rounded-lg flex items-center justify-center font-bold text-xl ${collapsed && !isHovered ? 'w-10 h-10' : 'w-12 h-12'}`}
            style={{ backgroundColor: 'var(--sidebar-logo-bg)', color: '#7c3aed' }}
          >
            ⊞
          </div>
          {!(collapsed && !isHovered) && (
            <div>
              <h1 className="font-bold text-white text-base">ERP Platform</h1>
              <p className="text-xs" style={{ color: 'var(--sidebar-text-secondary)' }}>
                Enterprise Solution
              </p>
            </div>
          )}
        </div>
        {!(collapsed && !isHovered) && (
          <button
            onClick={onToggle}
            className="p-2 rounded-lg hover:bg-white/10 transition-all"
            style={{ color: 'var(--sidebar-text)' }}
          >
            <MenuFoldOutlined />
          </button>
        )}
      </div>

      <nav className={`flex-1 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 ${collapsed && !isHovered ? 'px-2 py-4' : 'px-4 py-4'}`}>
        {orderedCategories.map((category) => (
          <div key={category}>
            {category !== 'MAIN' && !(collapsed && !isHovered) && (
              <button
                onClick={() => toggleCategory(category)}
                className="w-full flex items-center justify-between px-4 py-2 rounded-lg transition-all hover:bg-white/10"
                style={{ color: 'var(--sidebar-text-secondary)' }}
              >
                <p className="text-xs font-semibold uppercase tracking-wider">
                  {category}
                </p>
                <CaretDownOutlined
                  className="text-xs transition-transform"
                  style={{
                    transform: expandedCategories[category] ? 'rotate(0deg)' : 'rotate(-90deg)',
                  }}
                />
              </button>
            )}
            {(category === 'MAIN' || expandedCategories[category]) && (
              <div className="space-y-2">
                {groupedItems[category].map((item) => (
                  <a
                    key={item.key}
                    href={getLocalizedPath(item.section)}
                    className={`flex items-center gap-3 rounded-lg transition-all hover:bg-white/20 active:bg-white/30 ${collapsed && !isHovered ? 'justify-center px-2 py-3' : 'px-4 py-3'}`}
                    style={{
                      color: 'var(--sidebar-text)',
                      backgroundColor: item.key === 'dashboard' ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                    }}
                  >
                    <span className={`flex-shrink-0 ${collapsed && !isHovered ? 'text-xl' : 'text-lg'}`}>{item.icon}</span>
                    {!(collapsed && !isHovered) && (
                      <span className="font-medium whitespace-nowrap text-sm">{t(item.labelKey)}</span>
                    )}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      <div className={`border-t border-white/10 ${collapsed && !isHovered ? 'p-2' : 'p-4'}`}>
        <div
          className={`rounded-lg cursor-pointer hover:bg-white/10 transition-all ${collapsed && !isHovered ? 'justify-center p-2' : 'p-4'}`}
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
        >
          <div className={`flex items-center gap-3 ${collapsed && !isHovered ? 'justify-center' : ''}`}>
            <div className="relative">
              <div
                className={`rounded-full flex items-center justify-center flex-shrink-0 font-bold ${collapsed && !isHovered ? 'w-8 h-8 text-sm' : 'w-10 h-10'}`}
                style={{ backgroundColor: '#ec4899', color: 'white' }}
              >
                A
              </div>
              <div
                className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2"
                style={{ backgroundColor: '#22c55e', borderColor: 'var(--sidebar-bg)' }}
              />
            </div>
            {!(collapsed && !isHovered) && (
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">Admin User</p>
                <p className="text-xs" style={{ color: 'var(--sidebar-text-secondary)' }}>
                  admin@example.com
                </p>
                <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                  Super Admin
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
