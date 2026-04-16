'use client';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useTheme } from '@/lib/theme/use-theme';
import { 
  FileTextOutlined, 
  DownloadOutlined, 
  CalendarOutlined, 
  BarChartOutlined,
  PieChartOutlined,
  LineChartOutlined,
  TeamOutlined,
  InboxOutlined,
  ProjectOutlined,
} from '@ant-design/icons';

export function ReportsDashboard() {
  const { tokens } = useTheme();

  const reportCategories = [
    { title: 'Financial Reports', icon: <BarChartOutlined />, count: 12, color: tokens.primary },
    { title: 'HR Reports', icon: <TeamOutlined />, count: 8, color: tokens.success },
    { title: 'Inventory Reports', icon: <InboxOutlined />, count: 15, color: tokens.warning },
    { title: 'Project Reports', icon: <ProjectOutlined />, count: 23, color: tokens.info },
  ];

  const recentReports = [
    { id: 1, name: 'Q1 Financial Summary', type: 'Financial', date: '2024-04-01', size: '2.5 MB' },
    { id: 2, name: 'Employee Performance', type: 'HR', date: '2024-03-28', size: '1.8 MB' },
    { id: 3, name: 'Stock Analysis', type: 'Inventory', date: '2024-03-25', size: '3.2 MB' },
    { id: 4, name: 'Project Status Report', type: 'Project', date: '2024-03-20', size: '2.1 MB' },
  ];

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: tokens.text }}>
            Reports
          </h1>
          <p className="text-sm" style={{ color: tokens.textSecondary }}>
            Generate and view business reports
          </p>
        </div>
        <Button variant="primary">
          <FileTextOutlined /> Generate Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reportCategories.map((category) => (
          <Card key={category.title} className="cursor-pointer hover:scale-105 transition-transform">
            <div 
              className="neumorphic-flat w-12 h-12 rounded-lg flex items-center justify-center mb-3"
              style={{ color: category.color }}
            >
              {category.icon}
            </div>
            <p className="text-sm" style={{ color: tokens.textSecondary }}>
              {category.title}
            </p>
            <p className="text-2xl font-bold" style={{ color: tokens.text }}>
              {category.count}
            </p>
          </Card>
        ))}
      </div>

      <Card>
        <h2 className="text-lg font-semibold mb-4" style={{ color: tokens.text }}>
          Recent Reports
        </h2>
        <div className="space-y-3">
          {recentReports.map((report) => (
            <div 
              key={report.id}
              className="flex items-center justify-between p-4 neumorphic-flat rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: tokens.secondary }}
                >
                  <FileTextOutlined style={{ color: tokens.text }} />
                </div>
                <div>
                  <p className="font-medium" style={{ color: tokens.text }}>
                    {report.name}
                  </p>
                  <p className="text-sm" style={{ color: tokens.textSecondary }}>
                    {report.type} • {report.date}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm" style={{ color: tokens.textSecondary }}>
                  {report.size}
                </span>
                <Button variant="ghost" size="sm">
                  <DownloadOutlined />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Button variant="ghost" className="w-full">
            View All Reports
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <h2 className="text-lg font-semibold mb-4" style={{ color: tokens.text }}>
            Generate Report
          </h2>
          <div className="space-y-3">
            <Button variant="secondary" className="w-full">
              <BarChartOutlined /> Financial Report
            </Button>
            <Button variant="secondary" className="w-full">
              <TeamOutlined /> HR Report
            </Button>
            <Button variant="secondary" className="w-full">
              <InboxOutlined /> Inventory Report
            </Button>
            <Button variant="secondary" className="w-full">
              <ProjectOutlined /> Project Report
            </Button>
          </div>
        </Card>

        <Card className="md:col-span-2">
          <h2 className="text-lg font-semibold mb-4" style={{ color: tokens.text }}>
            Report Schedule
          </h2>
          <div className="space-y-3">
            {[
              { name: 'Weekly Financial Summary', frequency: 'Every Monday', next: '2024-04-15' },
              { name: 'Monthly HR Report', frequency: '1st of each month', next: '2024-05-01' },
              { name: 'Quarterly Inventory Review', frequency: 'Every quarter', next: '2024-06-30' },
            ].map((schedule) => (
              <div 
                key={schedule.name}
                className="flex items-center justify-between p-4 neumorphic-flat rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <CalendarOutlined style={{ color: tokens.textSecondary }} />
                  <div>
                    <p className="font-medium" style={{ color: tokens.text }}>
                      {schedule.name}
                    </p>
                    <p className="text-sm" style={{ color: tokens.textSecondary }}>
                      {schedule.frequency}
                    </p>
                  </div>
                </div>
                <span className="text-sm" style={{ color: tokens.textSecondary }}>
                  Next: {schedule.next}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
