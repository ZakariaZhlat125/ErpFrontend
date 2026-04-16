'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { useTheme } from '@/lib/theme/use-theme';
import { 
  SettingOutlined, 
  BulbOutlined, 
  GlobalOutlined, 
  SecurityScanOutlined,
  NotificationOutlined,
  UserOutlined,
} from '@ant-design/icons';

export function SettingsDashboard() {
  const { tokens, mode, toggleTheme } = useTheme();

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: tokens.text }}>
          Settings
        </h1>
        <p className="text-sm" style={{ color: tokens.textSecondary }}>
          Manage your application preferences
        </p>
      </div>

      <Card>
        <h2 className="text-lg font-semibold mb-4" style={{ color: tokens.text }}>
          Appearance
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 neumorphic-flat rounded-lg">
            <div className="flex items-center gap-3">
              <BulbOutlined style={{ color: tokens.text }} />
              <div>
                <p className="font-medium" style={{ color: tokens.text }}>
                  Theme Mode
                </p>
                <p className="text-sm" style={{ color: tokens.textSecondary }}>
                  Switch between light and dark mode
                </p>
              </div>
            </div>
            <Button variant="secondary" onClick={toggleTheme}>
              {mode === 'light' ? 'Switch to Dark' : 'Switch to Light'}
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 neumorphic-flat rounded-lg">
            <div className="flex items-center gap-3">
              <GlobalOutlined style={{ color: tokens.text }} />
              <div>
                <p className="font-medium" style={{ color: tokens.text }}>
                  Language
                </p>
                <p className="text-sm" style={{ color: tokens.textSecondary }}>
                  Select your preferred language
                </p>
              </div>
            </div>
            <select 
              className="neumorphic-inset px-4 py-2 rounded-lg"
              style={{ 
                backgroundColor: tokens.surface,
                color: tokens.text,
                border: 'none'
              }}
            >
              <option value="en">English</option>
              <option value="ar">العربية</option>
            </select>
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold mb-4" style={{ color: tokens.text }}>
          Notifications
        </h2>
        <div className="space-y-4">
          {[
            { title: 'Email Notifications', description: 'Receive updates via email' },
            { title: 'Push Notifications', description: 'Get instant alerts on your device' },
            { title: 'SMS Notifications', description: 'Receive text message alerts' },
          ].map((setting) => (
            <div 
              key={setting.title}
              className="flex items-center justify-between p-4 neumorphic-flat rounded-lg"
            >
              <div className="flex items-center gap-3">
                <NotificationOutlined style={{ color: tokens.text }} />
                <div>
                  <p className="font-medium" style={{ color: tokens.text }}>
                    {setting.title}
                  </p>
                  <p className="text-sm" style={{ color: tokens.textSecondary }}>
                    {setting.description}
                  </p>
                </div>
              </div>
              <input 
                type="checkbox" 
                className="neumorphic-inset w-5 h-5 rounded"
                defaultChecked
              />
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold mb-4" style={{ color: tokens.text }}>
          Security
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 neumorphic-flat rounded-lg">
            <div className="flex items-center gap-3">
              <SecurityScanOutlined style={{ color: tokens.text }} />
              <div>
                <p className="font-medium" style={{ color: tokens.text }}>
                  Two-Factor Authentication
                </p>
                <p className="text-sm" style={{ color: tokens.textSecondary }}>
                  Add an extra layer of security
                </p>
              </div>
            </div>
            <Button variant="secondary">
              Enable
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 neumorphic-flat rounded-lg">
            <div className="flex items-center gap-3">
              <UserOutlined style={{ color: tokens.text }} />
              <div>
                <p className="font-medium" style={{ color: tokens.text }}>
                  Change Password
                </p>
                <p className="text-sm" style={{ color: tokens.textSecondary }}>
                  Update your password regularly
                </p>
              </div>
            </div>
            <Button variant="secondary">
              Change
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 neumorphic-flat rounded-lg">
            <div className="flex items-center gap-3">
              <SettingOutlined style={{ color: tokens.text }} />
              <div>
                <p className="font-medium" style={{ color: tokens.text }}>
                  Session Timeout
                </p>
                <p className="text-sm" style={{ color: tokens.textSecondary }}>
                  Auto-logout after inactivity
                </p>
              </div>
            </div>
            <select 
              className="neumorphic-inset px-4 py-2 rounded-lg"
              style={{ 
                backgroundColor: tokens.surface,
                color: tokens.text,
                border: 'none'
              }}
            >
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="never">Never</option>
            </select>
          </div>
        </div>
      </Card>

      <div className="flex justify-end gap-3">
        <Button variant="ghost">
          Cancel
        </Button>
        <Button variant="primary">
          Save Changes
        </Button>
      </div>
    </div>
  );
}
