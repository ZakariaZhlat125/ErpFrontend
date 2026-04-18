'use client';

import { forwardRef } from 'react';
import { Checkbox as AntCheckbox, CheckboxProps as AntCheckboxProps } from 'antd';
import { useTheme } from '@/lib/theme/use-theme';
import { cn } from '@/lib/utils/cn';

export interface CheckboxProps extends Omit<AntCheckboxProps, 'children'> {
  label?: string;
  error?: boolean;
  errorText?: string;
}

export const Checkbox = forwardRef<any, CheckboxProps>(
  ({ 
    className, 
    label,
    error,
    errorText,
    ...props 
  }, ref) => {
    const { tokens } = useTheme();

    return (
      <div className="flex flex-col gap-1">
        <AntCheckbox
          ref={ref}
          className={cn(className)}
          style={{
            color: tokens.text,
          }}
          {...props}
        >
          {label && (
            <span style={{ color: tokens.text, fontSize: '14px' }}>
              {label}
            </span>
          )}
        </AntCheckbox>
        {error && errorText && (
          <p className="text-xs mt-1" style={{ color: tokens.danger }}>
            {errorText}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
