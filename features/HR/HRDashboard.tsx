'use client';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useTheme } from '@/lib/theme/use-theme';
import { 
  TeamOutlined, 
  UserAddOutlined, 
  CheckCircleOutlined, 
  ClockCircleOutlined,
  CalendarOutlined,
  PlusOutlined,
} from '@ant-design/icons';

export function HRDashboard() {
  const { tokens } = useTheme();

  const hrStats = [
    { title: 'Total Employees', value: '2,543', icon: <TeamOutlined />, color: tokens.primary },
    { title: 'Active', value: '2,340', icon: <CheckCircleOutlined />, color: tokens.success },
    { title: 'On Leave', value: '123', icon: <ClockCircleOutlined />, color: tokens.warning },
    { title: 'New Hires', value: '80', icon: <UserAddOutlined />, color: tokens.info },
  ];

  const recentActivities = [
    { id: 1, employee: 'John Doe', action: 'Joined the company', date: 'Today' },
    { id: 2, employee: 'Jane Smith', action: 'Requested leave', date: '2 hours ago' },
    { id: 3, employee: 'Bob Johnson', action: 'Completed training', date: '1 day ago' },
    { id: 4, employee: 'Alice Brown', action: 'Promoted to Senior', date: '2 days ago' },
  ];

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: tokens.text }}>
            Human Resources
          </h1>
          <p className="text-sm" style={{ color: tokens.textSecondary }}>
            Manage your workforce
          </p>
        </div>
        <Button variant="primary">
          <PlusOutlined /> Add Employee
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {hrStats.map((stat) => (
          <Card key={stat.title}>
            <div 
              className="neumorphic-flat w-12 h-12 rounded-lg flex items-center justify-center mb-3"
              style={{ color: stat.color }}
            >
              {stat.icon}
            </div>
            <p className="text-sm" style={{ color: tokens.textSecondary }}>
              {stat.title}
            </p>
            <p className="text-2xl font-bold" style={{ color: tokens.text }}>
              {stat.value}
            </p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-lg font-semibold mb-4" style={{ color: tokens.text }}>
            Recent Activities
          </h2>
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <div 
                key={activity.id}
                className="flex items-center justify-between p-4 neumorphic-flat rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: tokens.secondary }}
                  >
                    <TeamOutlined style={{ color: tokens.text }} />
                  </div>
                  <div>
                    <p className="font-medium" style={{ color: tokens.text }}>
                      {activity.employee}
                    </p>
                    <p className="text-sm" style={{ color: tokens.textSecondary }}>
                      {activity.action}
                    </p>
                  </div>
                </div>
                <span className="text-sm" style={{ color: tokens.textSecondary }}>
                  {activity.date}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Button variant="ghost" className="w-full">
              View All Activities
            </Button>
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold mb-4" style={{ color: tokens.text }}>
            Quick Actions
          </h2>
          <div className="space-y-3">
            <Button variant="secondary" className="w-full">
              <UserAddOutlined /> Hire Employee
            </Button>
            <Button variant="secondary" className="w-full">
              <CalendarOutlined /> Manage Leave
            </Button>
            <Button variant="secondary" className="w-full">
              <TeamOutlined /> View Departments
            </Button>
            <Button variant="secondary" className="w-full">
              <CheckCircleOutlined /> Performance Review
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
