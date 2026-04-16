'use client';

import { InputHTMLAttributes, forwardRef } from 'react';
import { useTheme } from '@/lib/theme/use-theme';
import { cn } from '@/lib/utils/cn';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  label?: string;
  errorText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, label, errorText, ...props }, ref) => {
    const { tokens } = useTheme();

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label 
            className="text-sm font-medium"
            style={{ color: tokens.text }}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'neumorphic-inset px-4 py-2 rounded-lg w-full',
            'focus:outline-none focus:ring-2',
            'transition-all duration-200',
            error && 'ring-2',
            className
          )}
          style={{
            color: tokens.text,
            backgroundColor: tokens.surface,
            ...(error && { '--tw-ring-color': tokens.danger }),
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
