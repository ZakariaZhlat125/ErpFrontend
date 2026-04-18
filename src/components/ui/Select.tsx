'use client';

import { forwardRef } from 'react';
import { Select as AntSelect, SelectProps as AntSelectProps } from 'antd';
import { useTheme } from '@/lib/theme/use-theme';
import { cn } from '@/lib/utils/cn';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<AntSelectProps, 'size' | 'options'> {
  error?: boolean;
  label?: string;
  errorText?: string;
  options: SelectOption[];
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
  required?: boolean;
}

export const Select = forwardRef<any, SelectProps>(
  ({ 
    className, 
    error, 
    label, 
    errorText, 
    options, 
    placeholder,
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

    const antOptions = options.map((option) => ({
      value: option.value,
      label: option.label,
      disabled: option.disabled,
    }));

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
        <AntSelect
          ref={ref}
          className={cn(
            'neumorphic-flat custom-select',
            className
          )}
          placeholder={placeholder}
          options={antOptions}
          size={antdSize[size]}
          status={error ? 'error' : undefined}
          style={{
            width: '100%',
            height: heightStyles[size],
          }}
          popupClassName="custom-select-dropdown"
          {...props}
        />
        {error && errorText && (
          <p className="text-xs mt-1" style={{ color: tokens.danger }}>
            {errorText}
          </p>
        )}
        <style jsx global>{`
          .custom-select .ant-select-selector {
            background-color: ${tokens.surface} !important;
            border-radius: 8px !important;
            border: none !important;
            box-shadow: 4px 4px 8px ${tokens.shadowDark}, -4px -4px 8px ${tokens.shadowLight} !important;
            height: ${heightStyles[size]} !important;
            padding: 10px 16px !important;
            font-size: 14px !important;
          }
          .custom-select .ant-select-selection-item,
          .custom-select .ant-select-selection-placeholder {
            line-height: ${heightStyles[size]} !important;
            padding: 0 !important;
          }
        `}</style>
      </div>
    );
  }
);

Select.displayName = 'Select';
