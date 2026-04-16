'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { useTheme } from '@/lib/theme/use-theme';
import { 
  UserOutlined, 
  MailOutlined, 
  PhoneOutlined, 
  EnvironmentOutlined,
  EditOutlined,
  SaveOutlined,
} from '@ant-design/icons';

export function ProfileSettings() {
  const { tokens } = useTheme();

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: tokens.text }}>
            Profile Settings
          </h1>
          <p className="text-sm" style={{ color: tokens.textSecondary }}>
            Manage your account information
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <div className="text-center space-y-4">
            <div 
              className="neumorphic-flat w-32 h-32 rounded-full flex items-center justify-center mx-auto"
              style={{ color: tokens.primary }}
            >
              <UserOutlined className="text-5xl" />
            </div>
            <div>
              <h2 className="text-xl font-bold" style={{ color: tokens.text }}>
                John Doe
              </h2>
              <p className="text-sm" style={{ color: tokens.textSecondary }}>
                Administrator
              </p>
            </div>
            <Button variant="secondary" className="w-full">
              <EditOutlined /> Change Avatar
            </Button>
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4" style={{ color: tokens.text }}>
            Personal Information
          </h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="First Name"
                placeholder="John"
              />
              <Input
                label="Last Name"
                placeholder="Doe"
              />
            </div>

            <Input
              label="Email"
              placeholder="john.doe@company.com"
              type="email"
            />

            <Input
              label="Phone"
              placeholder="+1 234 567 890"
              type="tel"
            />

            <Input
              label="Address"
              placeholder="123 Main St, City, Country"
            />

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="ghost">
                Cancel
              </Button>
              <Button variant="primary">
                <SaveOutlined /> Save Changes
              </Button>
            </div>
          </form>
        </Card>
      </div>

      <Card>
        <h2 className="text-lg font-semibold mb-4" style={{ color: tokens.text }}>
          Security Settings
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 neumorphic-flat rounded-lg">
            <div>
              <h3 className="font-medium" style={{ color: tokens.text }}>
                Change Password
              </h3>
              <p className="text-sm" style={{ color: tokens.textSecondary }}>
                Update your password regularly
              </p>
            </div>
            <Button variant="secondary">
              Change
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 neumorphic-flat rounded-lg">
            <div>
              <h3 className="font-medium" style={{ color: tokens.text }}>
                Two-Factor Authentication
              </h3>
              <p className="text-sm" style={{ color: tokens.textSecondary }}>
                Add an extra layer of security
              </p>
            </div>
            <Button variant="secondary">
              Enable
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
