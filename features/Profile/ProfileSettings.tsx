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
import { useTranslations } from 'next-intl';

export function ProfileSettings() {
  const { tokens } = useTheme();
  const t = useTranslations('profile');

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: tokens.text }}>
            {t('title')}
          </h1>
          <p className="text-sm" style={{ color: tokens.textSecondary }}>
            {t('description')}
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
              <EditOutlined /> {t('personal.changePhoto')}
            </Button>
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4" style={{ color: tokens.text }}>
            {t('personal.title')}
          </h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label={t('personal.form.firstName')}
                placeholder={t('personal.form.firstNamePlaceholder')}
              />
              <Input
                label={t('personal.form.lastName')}
                placeholder={t('personal.form.lastNamePlaceholder')}
              />
            </div>

            <Input
              label={t('personal.form.email')}
              placeholder={t('personal.form.emailPlaceholder')}
              type="email"
            />

            <Input
              label={t('personal.form.phone')}
              placeholder={t('personal.form.phonePlaceholder')}
              type="tel"
            />

            <Input
              label={t('personal.form.address')}
              placeholder={t('personal.form.addressPlaceholder')}
            />

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="ghost">
                {t('form.cancel')}
              </Button>
              <Button variant="primary">
                <SaveOutlined /> {t('personal.save')}
              </Button>
            </div>
          </form>
        </Card>
      </div>

      <Card>
        <h2 className="text-lg font-semibold mb-4" style={{ color: tokens.text }}>
          {t('security.title')}
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 neumorphic-flat rounded-lg">
            <div>
              <h3 className="font-medium" style={{ color: tokens.text }}>
                {t('security.changePassword')}
              </h3>
              <p className="text-sm" style={{ color: tokens.textSecondary }}>
                {t('security.twoFactorDescription')}
              </p>
            </div>
            <Button variant="secondary">
              {t('form.change')}
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 neumorphic-flat rounded-lg">
            <div>
              <h3 className="font-medium" style={{ color: tokens.text }}>
                {t('security.twoFactor')}
              </h3>
              <p className="text-sm" style={{ color: tokens.textSecondary }}>
                {t('security.twoFactorDescription')}
              </p>
            </div>
            <Button variant="secondary">
              {t('security.enable2FA')}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
