'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { useTheme } from '@/lib/theme/use-theme';
import { UserOutlined, MailOutlined, LockOutlined, UserAddOutlined } from '@ant-design/icons';
import Link from 'next/link';

const schema = z.object({
  fullName: z.string().min(2, 'الاسم قصير جدًا'),
  email: z.string().email('Email غير صحيح'),
  password: z.string().min(8, 'كلمة المرور لازم 8 أحرف على الأقل'),
  confirmPassword: z.string().min(8, 'كلمة المرور لازم 8 أحرف على الأقل'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'كلمات المرور غير متطابقة',
  path: ['confirmPassword'],
});

type FormValues = z.infer<typeof schema>;

export function RegisterForm() {
  const { tokens, toggleTheme, mode } = useTheme();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  });

  const onSubmit = async (values: FormValues) => {
    console.log(values);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div 
            className="neumorphic-flat w-20 h-20 rounded-full flex items-center justify-center mx-auto"
            style={{ color: tokens.primary }}
          >
            <UserAddOutlined className="text-4xl" />
          </div>
          <h1 className="text-3xl font-bold" style={{ color: tokens.text }}>
            Create Account
          </h1>
          <p className="text-sm" style={{ color: tokens.textSecondary }}>
            Join our ERP platform
          </p>
        </div>

        <Card>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              {...register('fullName')}
              type="text"
              label="Full Name"
              placeholder="John Doe"
              error={!!errors.fullName}
              errorText={errors.fullName?.message}
            />

            <Input
              {...register('email')}
              type="email"
              label="Email"
              placeholder="name@company.com"
              error={!!errors.email}
              errorText={errors.email?.message}
            />

            <Input
              {...register('password')}
              type="password"
              label="Password"
              placeholder="••••••••"
              error={!!errors.password}
              errorText={errors.password?.message}
            />

            <Input
              {...register('confirmPassword')}
              type="password"
              label="Confirm Password"
              placeholder="••••••••"
              error={!!errors.confirmPassword}
              errorText={errors.confirmPassword?.message}
            />

            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                className="neumorphic-inset w-4 h-4 rounded"
                required
              />
              <label className="text-sm" style={{ color: tokens.text }}>
                I agree to the Terms and Conditions
              </label>
            </div>

            <Button 
              type="submit" 
              variant="primary" 
              className="w-full"
              isLoading={isSubmitting}
            >
              Create Account
            </Button>
          </form>
        </Card>

        <div className="text-center space-y-2">
          <p className="text-sm" style={{ color: tokens.textSecondary }}>
            Already have an account?
          </p>
          <Link 
            href="/login"
            className="text-sm font-medium hover:underline"
            style={{ color: tokens.primary }}
          >
            Sign in
          </Link>
        </div>

        <div className="text-center">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={toggleTheme}
          >
            Toggle {mode === 'light' ? 'Dark' : 'Light'} Mode
          </Button>
        </div>
      </div>
    </div>
  );
}
