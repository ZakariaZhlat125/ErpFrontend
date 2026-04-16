'use client';

import { HTMLAttributes, forwardRef } from 'react';
import { useTheme } from '@/lib/theme/use-theme';
import { cn } from '@/lib/utils/cn';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'flat' | 'inset';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const { tokens } = useTheme();

    const variantClasses = {
      default: 'neumorphic',
      flat: 'neumorphic-flat',
      inset: 'neumorphic-inset',
    };

    return (
      <div
        ref={ref}
        className={cn(
          variantClasses[variant],
          'p-6 transition-all duration-200',
          className
        )}
        style={{ backgroundColor: tokens.surface }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
