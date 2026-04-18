'use client';

import { useState } from 'react';
import { Button, Switch } from '@/components/ui';
import { Card } from '@/components/ui/Card';
import {
  UserOutlined,
  BellOutlined,
  SafetyOutlined,
  SettingOutlined,
  BgColorsOutlined,
  LockOutlined,
  SaveOutlined,
} from '@ant-design/icons';

const tabs = [
  { key: 'profile', label: 'Profile', icon: <UserOutlined /> },
  { key: 'notifications', label: 'Notifications', icon: <BellOutlined /> },
  { key: 'security', label: 'Security', icon: <SafetyOutlined /> },
  { key: 'preferences', label: 'Preferences', icon: <SettingOutlined /> },
  { key: 'appearance', label: 'Appearance', icon: <BgColorsOutlined /> },
  { key: 'privacy', label: 'Data & Privacy', icon: <LockOutlined /> },
];

const notificationSettings = [
  { key: 'email', label: 'Email Notifications', description: 'Receive email updates about your account', defaultOn: true },
  { key: 'push', label: 'Push Notifications', description: 'Get push notifications on your devices', defaultOn: true },
  { key: 'activity', label: 'Activity Alerts', description: 'Be notified of important system activities', defaultOn: true },
  { key: 'weekly', label: 'Weekly Reports', description: 'Receive weekly summary reports', defaultOn: false },
  { key: 'security', label: 'Security Alerts', description: 'Get notified of security-related events', defaultOn: false },
];

export function Settings() {
  const [activeTab, setActiveTab] = useState('notifications');
  const [toggles, setToggles] = useState<Record<string, boolean>>(
    notificationSettings.reduce((acc, item) => ({ ...acc, [item.key]: item.defaultOn }), {})
  );

  const handleToggle = (key: string) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-[var(--background)] p-4 md:p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <h1 className="text-4xl font-extrabold text-[var(--text)]">Settings</h1>
          <p className="mt-1 text-base text-[var(--text-secondary)]">
            Manage your account and system preferences
          </p>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="w-full shrink-0 lg:w-[220px]">
            <div className="space-y-1">
              {tabs.map((tab) => (
                <Button
                  key={tab.key}
                  variant={activeTab === tab.key ? 'primary' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab(tab.key)}
                >
                  <span className="text-lg">{tab.icon}</span>
                  {tab.label}
                </Button>
              ))}
            </div>
          </div>

          <Card className="flex-1 p-6">
            {activeTab === 'notifications' && (
              <div>
                <h2 className="text-[28px] font-extrabold text-[var(--text)]">Notification Preferences</h2>
                <p className="mt-1 text-[15px] text-[var(--text-secondary)]">
                  Choose how you want to be notified about updates
                </p>

                <div className="mt-6 space-y-4">
                  {notificationSettings.map((setting) => (
                    <div
                      key={setting.key}
                      className="flex items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--background)] px-5 py-4"
                    >
                      <div>
                        <p className="text-[17px] font-semibold text-[var(--text)]">{setting.label}</p>
                        <p className="text-[14px] text-[var(--text-secondary)]">{setting.description}</p>
                      </div>

                      <Switch
                        checked={toggles[setting.key]}
                        onChange={() => handleToggle(setting.key)}
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex items-center justify-end gap-3">
                  <Button variant="secondary">
                    Cancel
                  </Button>
                  <Button variant="primary">
                    <SaveOutlined /> Save Changes
                  </Button>
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div>
                <h2 className="text-[28px] font-extrabold text-[var(--text)]">Profile Settings</h2>
                <p className="mt-1 text-[15px] text-[var(--text-secondary)]">
                  Manage your personal information
                </p>
                <p className="mt-6 text-[var(--text-secondary)]">Profile settings content coming soon...</p>
              </div>
            )}

            {activeTab === 'security' && (
              <div>
                <h2 className="text-[28px] font-extrabold text-[var(--text)]">Security Settings</h2>
                <p className="mt-1 text-[15px] text-[var(--text-secondary)]">
                  Manage your security preferences
                </p>
                <p className="mt-6 text-[var(--text-secondary)]">Security settings content coming soon...</p>
              </div>
            )}

            {activeTab === 'preferences' && (
              <div>
                <h2 className="text-[28px] font-extrabold text-[var(--text)]">Preferences</h2>
                <p className="mt-1 text-[15px] text-[var(--text-secondary)]">
                  Customize your experience
                </p>
                <p className="mt-6 text-[var(--text-secondary)]">Preferences content coming soon...</p>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div>
                <h2 className="text-[28px] font-extrabold text-[var(--text)]">Appearance</h2>
                <p className="mt-1 text-[15px] text-[var(--text-secondary)]">
                  Customize the look and feel
                </p>
                <p className="mt-6 text-[var(--text-secondary)]">Appearance settings content coming soon...</p>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div>
                <h2 className="text-[28px] font-extrabold text-[var(--text)]">Data & Privacy</h2>
                <p className="mt-1 text-[15px] text-[var(--text-secondary)]">
                  Manage your data and privacy settings
                </p>
                <p className="mt-6 text-[var(--text-secondary)]">Privacy settings content coming soon...</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
