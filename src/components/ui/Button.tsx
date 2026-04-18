'use client';

import { forwardRef } from 'react';
import { Button as AntButton, ButtonProps as AntButtonProps } from 'antd';
import { useTheme } from '@/lib/theme/use-theme';
import { cn } from '@/lib/utils/cn';

export interface ButtonProps extends Omit<AntButtonProps, 'size' | 'variant'> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'ghost' | 'link';
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
    onClick,
    ...props 
  }, ref) => {
    const { tokens } = useTheme();

    const variantToType = {
      primary: 'primary',
      secondary: 'default',
      success: 'primary',
      warning: 'primary',
      danger: 'primary',
      ghost: 'text',
      link: 'link',
    } as const;

    const antdSize = {
      sm: 'small',
      md: 'middle',
      lg: 'large',
    } as const;

    const getCustomStyle = () => {
      switch (variant) {
        case 'primary':
          return { backgroundColor: tokens.primary };
        case 'success':
          return { backgroundColor: tokens.success };
        case 'warning':
          return { backgroundColor: tokens.warning };
        case 'danger':
          return { backgroundColor: tokens.danger };
        default:
          return {};
      }
    };

    return (
      <AntButton
        ref={ref}
        type={variantToType[variant]}
        size={antdSize[size]}
        loading={isLoading}
        disabled={disabled}
        className={className}
        style={getCustomStyle()}
        onClick={onClick}
        {...props}
      >
        {children}
      </AntButton>
    );
  }
);

Button.displayName = 'Button';
