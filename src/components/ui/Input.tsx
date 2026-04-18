'use client';

import { forwardRef } from 'react';
import { Input as AntInput, InputProps as AntInputProps } from 'antd';
import { useTheme } from '@/lib/theme/use-theme';
import { cn } from '@/lib/utils/cn';

export interface InputProps extends Omit<AntInputProps, 'size'> {
  error?: boolean;
  label?: string;
  errorText?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Input = forwardRef<any, InputProps>(
  ({ 
    className, 
    error, 
    label, 
    errorText, 
    size = 'md',
    ...props 
  }, ref) => {
    const { tokens } = useTheme();

    const antdSize = {
      sm: 'small',
      md: 'middle',
      lg: 'large',
    } as const;

    const heightStyles = {
      sm: '38px',
      md: '44px',
      lg: '52px',
    };

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label 
            className="text-sm font-medium mb-0.5"
            style={{ color: tokens.text }}
          >
            {label}
          </label>
        )}
        <AntInput
          ref={ref}
          className={cn(
            'neumorphic-flat',
            className
          )}
          size={antdSize[size]}
          status={error ? 'error' : undefined}
          style={{
            backgroundColor: tokens.surface,
            borderRadius: '8px',
            border: 'none',
            boxShadow: `4px 4px 8px ${tokens.shadowDark}, -4px -4px 8px ${tokens.shadowLight}`,
            height: heightStyles[size],
            padding: '10px 16px',
            fontSize: '14px',
          }}
          {...props}
        />
        {error && errorText && (
          <p className="text-xs mt-1" style={{ color: tokens.danger }}>
            {errorText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
