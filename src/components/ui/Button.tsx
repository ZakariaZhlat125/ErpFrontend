'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { useTheme } from '@/lib/theme/use-theme';
import { cn } from '@/lib/utils/cn';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    isLoading = false,
    disabled,
    children,
    ...props 
  }, ref) => {
    const { tokens } = useTheme();

    const variantStyles = {
      primary: {
        background: tokens.primary,
        color: '#FFFFFF',
        hoverBackground: tokens.primary,
      },
      secondary: {
        background: tokens.secondary,
        color: tokens.text,
        hoverBackground: tokens.secondary,
      },
      success: {
        background: tokens.success,
        color: '#FFFFFF',
        hoverBackground: tokens.success,
      },
      warning: {
        background: tokens.warning,
        color: '#FFFFFF',
        hoverBackground: tokens.warning,
      },
      danger: {
        background: tokens.danger,
        color: '#FFFFFF',
        hoverBackground: tokens.danger,
      },
      ghost: {
        background: 'transparent',
        color: tokens.text,
        hoverBackground: tokens.secondary,
      },
    };

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    const style = variantStyles[variant];

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'neumorphic rounded-lg font-medium transition-all duration-200',
          'hover:scale-105 active:scale-95',
          'focus:outline-none focus:ring-2 focus:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
          sizeStyles[size],
          className
        )}
        style={{
          backgroundColor: style.background,
          color: style.color,
          boxShadow: variant === 'ghost' 
            ? 'none' 
            : `8px 8px 16px ${tokens.shadowDark}, -8px -8px 16px ${tokens.shadowLight}`,
        }}
        {...props}
      >
        {isLoading ? (
          <span className="inline-flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Loading...
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
