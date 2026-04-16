'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { useTheme } from '@/lib/theme/use-theme';
import { MailOutlined, KeyOutlined } from '@ant-design/icons';
import Link from 'next/link';

const schema = z.object({
  email: z.string().email('Email غير صحيح'),
});

type FormValues = z.infer<typeof schema>;

export function ForgetPasswordForm() {
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
            <KeyOutlined className="text-4xl" />
          </div>
          <h1 className="text-3xl font-bold" style={{ color: tokens.text }}>
            Forgot Password?
          </h1>
          <p className="text-sm" style={{ color: tokens.textSecondary }}>
            Enter your email to receive a reset link
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

            <Button 
              type="submit" 
              variant="primary" 
              className="w-full"
              isLoading={isSubmitting}
            >
              Send Reset Link
            </Button>
          </form>
        </Card>

        <div className="text-center space-y-2">
          <Link 
            href="/login"
            className="text-sm font-medium hover:underline flex items-center justify-center gap-1"
            style={{ color: tokens.primary }}
          >
            ← Back to Sign In
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
