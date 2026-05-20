'use client';

import { useTheme } from '@/lib/theme/use-theme';
import { Card } from '@/components/ui/Card';
import { 
  BankOutlined,
  UserOutlined,
  LineChartOutlined,
  SafetyOutlined,
  RiseOutlined,
  FallOutlined,
} from '@ant-design/icons';

export function AdminDashboard() {
  const { tokens } = useTheme();

  const stats = [
    {
      title: 'Total Organizations',
      value: '24',
      change: '+12%',
      trend: 'up',
      icon: <BankOutlined />,
      color: '#0ea5e9',
    },
    {
      title: 'Total Users',
      value: '1,847',
      change: '+18%',
      trend: 'up',
      icon: <UserOutlined />,
      color: '#10b981',
    },
    {
      title: 'System Health',
      value: '99.8%',
      change: '+0.2%',
      trend: 'up',
      icon: <LineChartOutlined />,
      color: '#8b5cf6',
    },
    {
      title: 'Active Roles',
      value: '12',
      change: '+2',
      trend: 'up',
      icon: <SafetyOutlined />,
      color: '#f59e0b',
    },
  ];

  const recentOrganizations = [
    { name: 'Tech Solutions Inc.', users: 45, status: 'Active', date: '2024-01-15' },
    { name: 'Global Trade LLC', users: 32, status: 'Active', date: '2024-01-14' },
    { name: 'Innovation Hub', users: 28, status: 'Active', date: '2024-01-13' },
    { name: 'Digital Services Co.', users: 19, status: 'Pending', date: '2024-01-12' },
    { name: 'Smart Systems Ltd.', users: 41, status: 'Active', date: '2024-01-11' },
  ];

  return (
    <div className="min-h-screen p-3 md:p-4" style={{ background: '#f4f1f8' }}>
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-[20px] font-bold leading-tight md:text-[22px]" style={{ color: '#111827' }}>
          Platform Dashboard
        </h1>
        <p className="mt-1 text-[13px]" style={{ color: '#6b7280' }}>
          Overview of system-wide statistics and activity
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[13px] text-[#6b7280]">{stat.title}</p>
                <h3 className="text-[24px] font-bold mt-2" style={{ color: '#111827' }}>
                  {stat.value}
                </h3>
                <div className="flex items-center gap-1 mt-2">
                  {stat.trend === 'up' ? (
                    <RiseOutlined style={{ color: '#10b981', fontSize: 12 }} />
                  ) : (
                    <FallOutlined style={{ color: '#ef4444', fontSize: 12 }} />
                  )}
                  <span
                    className="text-[12px] font-medium"
                    style={{ color: stat.trend === 'up' ? '#10b981' : '#ef4444' }}
                  >
                    {stat.change}
                  </span>
                  <span className="text-[12px] text-[#6b7280]">vs last month</span>
                </div>
              </div>
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${stat.color}20`, color: stat.color }}
              >
                <span style={{ fontSize: 20 }}>{stat.icon}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Organizations */}
        <Card className="p-5">
          <h2 className="text-[18px] font-bold mb-4" style={{ color: '#111827' }}>
            Recent Organizations
          </h2>
          <div className="space-y-3">
            {recentOrganizations.map((org, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg border border-[#ececf2]"
              >
                <div>
                  <h4 className="text-[14px] font-semibold" style={{ color: '#111827' }}>
                    {org.name}
                  </h4>
                  <p className="text-[12px] text-[#6b7280]">{org.users} users</p>
                </div>
                <div className="text-right">
                  <span
                    className={`text-[11px] font-medium px-2 py-1 rounded-full ${
                      org.status === 'Active'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    {org.status}
                  </span>
                  <p className="text-[11px] text-[#6b7280] mt-1">{org.date}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* System Activity */}
        <Card className="p-5">
          <h2 className="text-[18px] font-bold mb-4" style={{ color: '#111827' }}>
            System Activity
          </h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[#f9fafb]">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100">
                <UserOutlined style={{ color: '#3b82f6', fontSize: 14 }} />
              </div>
              <div className="flex-1">
                <p className="text-[13px] font-medium" style={{ color: '#111827' }}>
                  New user registration spike
                </p>
                <p className="text-[12px] text-[#6b7280]">145 new users in last 24h</p>
              </div>
              <span className="text-[11px] text-[#6b7280]">2h ago</span>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-[#f9fafb]">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                <BankOutlined style={{ color: '#10b981', fontSize: 14 }} />
              </div>
              <div className="flex-1">
                <p className="text-[13px] font-medium" style={{ color: '#111827' }}>
                  New organization created
                </p>
                <p className="text-[12px] text-[#6b7280]">Tech Solutions Inc. activated</p>
              </div>
              <span className="text-[11px] text-[#6b7280]">5h ago</span>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-[#f9fafb]">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-100">
                <SafetyOutlined style={{ color: '#8b5cf6', fontSize: 14 }} />
              </div>
              <div className="flex-1">
                <p className="text-[13px] font-medium" style={{ color: '#111827' }}>
                  Role permissions updated
                </p>
                <p className="text-[12px] text-[#6b7280]">Manager role modified</p>
              </div>
              <span className="text-[11px] text-[#6b7280]">1d ago</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
