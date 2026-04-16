'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { useTheme } from '@/lib/theme/use-theme';
import { 
  UserOutlined, 
  BankOutlined,
  BranchesOutlined,
  FileTextOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  LineChartOutlined,
  TeamOutlined,
} from '@ant-design/icons';

export function Dashboard() {
  const { tokens } = useTheme();

  const stats = [
    { title: 'Total Users', value: '2,847', change: '+12.5%', trend: 'up', icon: <UserOutlined />, color: '#0ea5e9' },
    { title: 'Organizations', value: '124', change: '+8.2%', trend: 'up', icon: <BankOutlined />, color: '#a855f7' },
    { title: 'Active Branches', value: '456', change: '-2.4%', trend: 'down', icon: <BranchesOutlined />, color: '#ff6b35' },
    { title: 'Documents', value: '12,847', change: '+18.7%', trend: 'up', icon: <FileTextOutlined />, color: '#10b981' },
  ];

  const activities = [
    { initials: 'S', name: 'Sarah Johnson', action: 'created a new organization', detail: 'Tech Solutions Inc.', time: '2 minutes ago', color: '#a8e6cf' },
    { initials: 'M', name: 'Michael Chen', action: 'updated user permissions for', detail: 'Marketing Team', time: '15 minutes ago', color: '#c7ceea' },
    { initials: 'E', name: 'Emma Davis', action: 'uploaded documents to', detail: 'Q1 Financial Reports', time: '1 hour ago', color: '#ffd3b6' },
    { initials: 'J', name: 'James Wilson', action: 'deleted branch', detail: 'Downtown Office', time: '2 hours ago', color: '#ffaaa5' },
    { initials: 'L', name: 'Lisa Anderson', action: 'assigned role', detail: 'Senior Manager', time: '3 hours ago', color: '#ffd1dc' },
  ];

  const organizations = [
    { name: 'TechCorp Global', users: 324, branches: 12, status: 'active' },
    { name: 'Innovation Labs', users: 156, branches: 5, status: 'active' },
    { name: 'Digital Solutions', users: 89, branches: 3, status: 'pending' },
    { name: 'Future Systems', users: 201, branches: 8, status: 'active' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold" style={{ color: tokens.text }}>
          Dashboard
        </h1>
        <p className="text-sm mt-1" style={{ color: tokens.textSecondary }}>
          Welcome back! Here's what's happening with your ERP platform.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm" style={{ color: tokens.textSecondary }}>
                  {stat.title}
                </p>
                <p className="text-3xl font-bold mt-2" style={{ color: tokens.text }}>
                  {stat.value}
                </p>
                <div className="flex items-center gap-1 mt-3">
                  {stat.trend === 'up' ? (
                    <ArrowUpOutlined style={{ color: '#10b981', fontSize: '12px' }} />
                  ) : (
                    <ArrowDownOutlined style={{ color: '#ef4444', fontSize: '12px' }} />
                  )}
                  <span style={{ color: stat.trend === 'up' ? '#10b981' : '#ef4444', fontSize: '12px', fontWeight: 500 }}>
                    {stat.change}
                  </span>
                  <span style={{ color: tokens.textSecondary, fontSize: '12px' }}>
                    vs last month
                  </span>
                </div>
              </div>
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: stat.color, color: 'white' }}
              >
                <span style={{ fontSize: '24px' }}>{stat.icon}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <LineChartOutlined style={{ color: '#a855f7', fontSize: '18px' }} />
              <h2 className="text-lg font-semibold" style={{ color: tokens.text }}>
                Recent Activity
              </h2>
            </div>
            <a href="#" style={{ color: '#a855f7', fontSize: '14px', fontWeight: 500 }}>
              View All
            </a>
          </div>
          <div className="space-y-4">
            {activities.map((activity, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-sm"
                  style={{ backgroundColor: activity.color, color: '#333' }}
                >
                  {activity.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p style={{ color: tokens.text, fontSize: '14px' }}>
                    <span style={{ fontWeight: 600 }}>{activity.name}</span> {activity.action} <span style={{ fontWeight: 600 }}>{activity.detail}</span>
                  </p>
                  <p style={{ color: tokens.textSecondary, fontSize: '12px', marginTop: '4px' }}>
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <TeamOutlined style={{ color: '#a855f7', fontSize: '18px' }} />
              <h2 className="text-lg font-semibold" style={{ color: tokens.text }}>
                Top Organizations
              </h2>
            </div>
          </div>
          <div className="space-y-4">
            {organizations.map((org, idx) => (
              <div key={idx} className="pb-4" style={{ borderBottom: idx < organizations.length - 1 ? `1px solid ${tokens.border}` : 'none' }}>
                <div className="flex items-center justify-between mb-2">
                  <p style={{ color: tokens.text, fontWeight: 600, fontSize: '14px' }}>
                    {org.name}
                  </p>
                  <span
                    style={{
                      backgroundColor: org.status === 'active' ? '#d1fae5' : '#fef3c7',
                      color: org.status === 'active' ? '#059669' : '#d97706',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: 600,
                    }}
                  >
                    {org.status}
                  </span>
                </div>
                <div className="flex items-center gap-4" style={{ color: tokens.textSecondary, fontSize: '13px' }}>
                  <span>👥 {org.users}</span>
                  <span>🏢 {org.branches}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
