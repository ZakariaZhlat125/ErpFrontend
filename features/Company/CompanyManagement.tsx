'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useTheme } from '@/lib/theme/use-theme';
import { 
  BuildOutlined, 
  MailOutlined, 
  PhoneOutlined, 
  EnvironmentOutlined,
  GlobalOutlined,
  PlusOutlined,
  EditOutlined,
  UserOutlined,
  FileTextOutlined,
} from '@ant-design/icons';

export function CompanyManagement() {
  const { tokens } = useTheme();

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: tokens.text }}>
            Company Management
          </h1>
          <p className="text-sm" style={{ color: tokens.textSecondary }}>
            Manage your company information and branches
          </p>
        </div>
        <Button variant="primary">
          <PlusOutlined /> Add Company
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div 
                className="neumorphic-flat w-16 h-16 rounded-lg flex items-center justify-center"
                style={{ color: tokens.primary }}
              >
                <BuildOutlined className="text-3xl" />
              </div>
              <div>
                <h2 className="text-xl font-bold" style={{ color: tokens.text }}>
                  Acme Corporation
                </h2>
                <p className="text-sm" style={{ color: tokens.textSecondary }}>
                  Main Office
                </p>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              <EditOutlined />
            </Button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <MailOutlined style={{ color: tokens.textSecondary }} />
              <span style={{ color: tokens.text }}>
                contact@acme.com
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <PhoneOutlined style={{ color: tokens.textSecondary }} />
              <span style={{ color: tokens.text }}>
                +1 234 567 890
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <EnvironmentOutlined style={{ color: tokens.textSecondary }} />
              <span style={{ color: tokens.text }}>
                123 Business Ave, New York, NY
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <GlobalOutlined style={{ color: tokens.textSecondary }} />
              <span style={{ color: tokens.text }}>
                www.acme.com
              </span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t" style={{ borderColor: tokens.border }}>
            <div className="flex justify-between text-sm">
              <span style={{ color: tokens.textSecondary }}>Employees</span>
              <span style={{ color: tokens.text, fontWeight: '500' }}>1,234</span>
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span style={{ color: tokens.textSecondary }}>Departments</span>
              <span style={{ color: tokens.text, fontWeight: '500' }}>12</span>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div 
                className="neumorphic-flat w-16 h-16 rounded-lg flex items-center justify-center"
                style={{ color: tokens.success }}
              >
                <BuildOutlined className="text-3xl" />
              </div>
              <div>
                <h2 className="text-xl font-bold" style={{ color: tokens.text }}>
                  Tech Solutions Ltd
                </h2>
                <p className="text-sm" style={{ color: tokens.textSecondary }}>
                  Branch Office
                </p>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              <EditOutlined />
            </Button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <MailOutlined style={{ color: tokens.textSecondary }} />
              <span style={{ color: tokens.text }}>
                info@techsolutions.com
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <PhoneOutlined style={{ color: tokens.textSecondary }} />
              <span style={{ color: tokens.text }}>
                +1 987 654 321
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <EnvironmentOutlined style={{ color: tokens.textSecondary }} />
              <span style={{ color: tokens.text }}>
                456 Tech Park, San Francisco, CA
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <GlobalOutlined style={{ color: tokens.textSecondary }} />
              <span style={{ color: tokens.text }}>
                www.techsolutions.com
              </span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t" style={{ borderColor: tokens.border }}>
            <div className="flex justify-between text-sm">
              <span style={{ color: tokens.textSecondary }}>Employees</span>
              <span style={{ color: tokens.text, fontWeight: '500' }}>567</span>
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span style={{ color: tokens.textSecondary }}>Departments</span>
              <span style={{ color: tokens.text, fontWeight: '500' }}>8</span>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <h2 className="text-lg font-semibold mb-4" style={{ color: tokens.text }}>
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="secondary" className="w-full">
            <BuildOutlined /> Add Branch
          </Button>
          <Button variant="secondary" className="w-full">
            <UserOutlined /> Manage Users
          </Button>
          <Button variant="secondary" className="w-full">
            <FileTextOutlined /> Generate Report
          </Button>
        </div>
      </Card>
    </div>
  );
}
