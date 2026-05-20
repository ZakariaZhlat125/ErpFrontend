'use client';

import { useTheme } from '@/lib/theme/use-theme';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui';
import { 
  ClockCircleOutlined,
  CalendarOutlined,
  DollarOutlined,
  CheckSquareOutlined,
  RiseOutlined,
  LoginOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

export function EmployeeDashboard() {
  const { tokens } = useTheme();

  const stats = [
    {
      title: 'Hours This Week',
      value: '38.5h',
      target: '40h',
      icon: <ClockCircleOutlined />,
      color: '#0ea5e9',
    },
    {
      title: 'Leave Balance',
      value: '12',
      subtitle: 'days remaining',
      icon: <CalendarOutlined />,
      color: '#8b5cf6',
    },
    {
      title: 'Last Salary',
      value: '$4,250',
      subtitle: 'Paid on Jan 30',
      icon: <DollarOutlined />,
      color: '#10b981',
    },
    {
      title: 'Active Tasks',
      value: '8',
      subtitle: '3 due soon',
      icon: <CheckSquareOutlined />,
      color: '#f59e0b',
    },
  ];

  const myTasks = [
    { title: 'Complete project documentation', priority: 'High', due: 'Today', status: 'In Progress' },
    { title: 'Review code changes', priority: 'Medium', due: 'Tomorrow', status: 'Pending' },
    { title: 'Team meeting preparation', priority: 'Low', due: 'Jan 20', status: 'Pending' },
    { title: 'Update timesheet', priority: 'High', due: 'Today', status: 'In Progress' },
  ];

  const attendanceHistory = [
    { date: 'Today', checkIn: '09:00 AM', checkOut: '--', hours: '5.5h', status: 'Working' },
    { date: 'Yesterday', checkIn: '08:55 AM', checkOut: '05:30 PM', hours: '8.5h', status: 'Complete' },
    { date: 'Jan 15', checkIn: '09:05 AM', checkOut: '05:25 PM', hours: '8.3h', status: 'Complete' },
  ];

  return (
    <div className="min-h-screen p-3 md:p-4" style={{ background: '#f4f1f8' }}>
      {/* Header */}
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-[20px] font-bold leading-tight md:text-[22px]" style={{ color: '#111827' }}>
            My Dashboard
          </h1>
          <p className="mt-1 text-[13px]" style={{ color: '#6b7280' }}>
            Welcome back! Here's your personal overview
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="success" size="sm">
            <LoginOutlined /> Check In
          </Button>
          <Button variant="secondary" size="sm">
            <LogoutOutlined /> Check Out
          </Button>
        </div>
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
                {stat.subtitle && (
                  <p className="text-[12px] text-[#6b7280] mt-1">{stat.subtitle}</p>
                )}
                {stat.target && (
                  <p className="text-[12px] text-[#6b7280] mt-1">of {stat.target}</p>
                )}
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
        {/* My Tasks */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[18px] font-bold" style={{ color: '#111827' }}>
              My Tasks
            </h2>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          <div className="space-y-3">
            {myTasks.map((task, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg border border-[#ececf2]"
              >
                <input type="checkbox" className="mt-1" />
                <div className="flex-1">
                  <h4 className="text-[14px] font-semibold" style={{ color: '#111827' }}>
                    {task.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
                        task.priority === 'High'
                          ? 'bg-red-100 text-red-700'
                          : task.priority === 'Medium'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {task.priority}
                    </span>
                    <span className="text-[11px] text-[#6b7280]">Due: {task.due}</span>
                  </div>
                </div>
                <span
                  className={`text-[11px] font-medium px-2 py-1 rounded-full ${
                    task.status === 'In Progress'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {task.status}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Attendance History */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[18px] font-bold" style={{ color: '#111827' }}>
              Attendance History
            </h2>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          <div className="space-y-3">
            {attendanceHistory.map((record, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg border border-[#ececf2]"
              >
                <div>
                  <h4 className="text-[14px] font-semibold" style={{ color: '#111827' }}>
                    {record.date}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[12px] text-[#6b7280]">
                      <ClockCircleOutlined className="mr-1" />
                      {record.checkIn} - {record.checkOut}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[14px] font-semibold" style={{ color: '#111827' }}>
                    {record.hours}
                  </p>
                  <span
                    className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
                      record.status === 'Working'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-emerald-100 text-emerald-700'
                    }`}
                  >
                    {record.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-5 mt-4">
        <h2 className="text-[18px] font-bold mb-4" style={{ color: '#111827' }}>
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Button variant="secondary" className="h-auto flex-col gap-2 py-4">
            <CalendarOutlined style={{ fontSize: 24 }} />
            <span className="text-[13px]">Request Leave</span>
          </Button>
          <Button variant="secondary" className="h-auto flex-col gap-2 py-4">
            <ClockCircleOutlined style={{ fontSize: 24 }} />
            <span className="text-[13px]">Log Time</span>
          </Button>
          <Button variant="secondary" className="h-auto flex-col gap-2 py-4">
            <DollarOutlined style={{ fontSize: 24 }} />
            <span className="text-[13px]">View Payslip</span>
          </Button>
          <Button variant="secondary" className="h-auto flex-col gap-2 py-4">
            <CheckSquareOutlined style={{ fontSize: 24 }} />
            <span className="text-[13px]">My Tasks</span>
          </Button>
        </div>
      </Card>
    </div>
  );
}
