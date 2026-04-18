'use client';

import { forwardRef } from 'react';
import { Input } from 'antd';
import { TextAreaProps as AntTextAreaProps } from 'antd/es/input';
import { useTheme } from '@/lib/theme/use-theme';
import { cn } from '@/lib/utils/cn';

const { TextArea: AntTextArea } = Input;

export interface TextAreaProps extends Omit<AntTextAreaProps, 'size'> {
  error?: boolean;
  label?: string;
  errorText?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const TextArea = forwardRef<any, TextAreaProps>(
  ({ 
    className, 
    error, 
    label, 
    errorText, 
    size = 'md',
    ...props 
  }, ref) => {
    const { tokens } = useTheme();

    const minRowsStyles = {
      sm: 2,
      md: 3,
      lg: 4,
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
        <AntTextArea
          ref={ref}
          className={cn(
            'neumorphic-flat',
            className
          )}
          status={error ? 'error' : undefined}
          autoSize={{ minRows: minRowsStyles[size], maxRows: 8 }}
          style={{
            backgroundColor: tokens.surface,
            borderRadius: '8px',
            border: 'none',
            boxShadow: `4px 4px 8px ${tokens.shadowDark}, -4px -4px 8px ${tokens.shadowLight}`,
            padding: '10px 16px',
            fontSize: '14px',
            resize: 'vertical',
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

TextArea.displayName = 'TextArea';
