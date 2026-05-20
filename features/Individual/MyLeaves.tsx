'use client';

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui';
import { CalendarOutlined, PlusOutlined } from '@ant-design/icons';

export function MyLeaves() {
  const leaveBalance = {
    annual: { used: 8, total: 20, remaining: 12 },
    sick: { used: 3, total: 10, remaining: 7 },
  };

  return (
    <div className="min-h-screen p-4" style={{ background: '#f4f1f8' }}>
      <div className="mb-5 flex justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Leaves</h1>
          <p className="text-sm text-gray-600">Manage your leave requests</p>
        </div>
        <Button variant="primary"><PlusOutlined /> Request Leave</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-600">Annual Leave</p>
              <h3 className="text-3xl font-bold mt-2">{leaveBalance.annual.remaining}</h3>
              <p className="text-xs text-gray-500">days remaining</p>
            </div>
            <CalendarOutlined style={{ fontSize: 24, color: '#3b82f6' }} />
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-600">Sick Leave</p>
              <h3 className="text-3xl font-bold mt-2">{leaveBalance.sick.remaining}</h3>
              <p className="text-xs text-gray-500">days remaining</p>
            </div>
            <CalendarOutlined style={{ fontSize: 24, color: '#ef4444' }} />
          </div>
        </Card>
      </div>
    </div>
  );
}
