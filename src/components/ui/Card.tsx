'use client';

import { forwardRef } from 'react';
import { Card as AntCard, CardProps as AntCardProps } from 'antd';
import { useTheme } from '@/lib/theme/use-theme';
import { cn } from '@/lib/utils/cn';

export interface CardProps extends Omit<AntCardProps, 'variant'> {
  variant?: 'default' | 'flat' | 'inset';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const { tokens } = useTheme();

    return (
      <>
        <AntCard
          ref={ref}
          className={cn('custom-card w-full', className)}
          style={{ 
            backgroundColor: 'var(--surface)',
            borderColor: 'var(--border)',
          }}
          {...props}
        >
          {children}
        </AntCard>
        <style jsx global>{`
          .custom-card {
            border-radius: 12px !important;
            border: 1px solid var(--border) !important;
          }
          .custom-card .ant-card-body {
            color: var(--text) !important;
            padding: 16px !important;
          }
          @media (min-width: 640px) {
            .custom-card .ant-card-body {
              padding: 24px !important;
            }
          }
          .custom-card .ant-card-head {
            background-color: var(--surface) !important;
            border-bottom-color: var(--border) !important;
            color: var(--text) !important;
            padding: 0 16px !important;
            min-height: 48px !important;
          }
          @media (min-width: 640px) {
            .custom-card .ant-card-head {
              padding: 0 24px !important;
              min-height: 56px !important;
            }
          }
        `}</style>
      </>
    );
  }
);

Card.displayName = 'Card';
