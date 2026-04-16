'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { useTheme } from '@/lib/theme/use-theme';
import { UserOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons';
import Link from 'next/link';

const schema = z.object({
  email: z.string().email('Email غير صحيح'),
  password: z.string().min(8, 'كلمة المرور لازم 8 أحرف على الأقل'),
});

type FormValues = z.infer<typeof schema>;

export function LoginForm() {
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
            <LoginOutlined className="text-4xl" />
          </div>
          <h1 className="text-3xl font-bold" style={{ color: tokens.text }}>
            Welcome Back
          </h1>
          <p className="text-sm" style={{ color: tokens.textSecondary }}>
            Sign in to your ERP dashboard
          </p>
        </div>

        <Card>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm" style={{ color: tokens.text }}>
                <input type="checkbox" className="neumorphic-inset w-4 h-4 rounded" />
                Remember me
              </label>
              <Link 
                href="/forget-password"
                className="text-sm hover:underline"
                style={{ color: tokens.primary }}
              >
                Forgot password?
              </Link>
            </div>

            <Button 
              type="submit" 
              variant="primary" 
              className="w-full"
              isLoading={isSubmitting}
            >
              Sign In
            </Button>
          </form>
        </Card>

        <div className="text-center space-y-2">
          <p className="text-sm" style={{ color: tokens.textSecondary }}>
            Don't have an account?
          </p>
          <Link 
            href="/register"
            className="text-sm font-medium hover:underline"
            style={{ color: tokens.primary }}
          >
            Create account
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
