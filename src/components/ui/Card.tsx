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
      <AntCard
        ref={ref}
        className={className}
        style={{ backgroundColor: tokens.surface }}
        {...props}
      >
        {children}
      </AntCard>
    );
  }
);

Card.displayName = 'Card';
