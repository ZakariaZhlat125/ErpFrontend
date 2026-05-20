'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';

export interface RadioOption {
  label: string;
  value: string | number | boolean;
  activeColor?: 'success' | 'danger' | 'primary' | 'warning' | 'info';
}

export interface RadioGroupProps {
  options: RadioOption[];
  value?: string | number | boolean;
  onChange?: (value: string | number | boolean) => void;
  disabled?: boolean;
  label?: string;
  error?: boolean;
  errorText?: string;
  size?: 'sm' | 'md';
  containerClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
}

const colorMap: Record<string, string> = {
  success: 'var(--success)',
  danger:  'var(--danger)',
  primary: 'var(--primary)',
  warning: 'var(--warning)',
  info:    'var(--info)',
};

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      options,
      value,
      onChange,
      disabled = false,
      label,
      error,
      errorText,
      size = 'md',
      containerClassName,
      labelClassName,
      errorClassName,
    },
    ref
  ) => {
    const paddingClass = size === 'sm' ? 'px-3 py-1 text-[11px]' : 'px-4 py-1.5 text-[12px]';

    return (
      <div ref={ref} className={cn('flex flex-col gap-1.5', containerClassName)}>
        {label && (
          <label
            className={cn('text-sm font-medium mb-0.5', labelClassName)}
            style={{ color: 'var(--text)' }}
          >
            {label}
          </label>
        )}

        <div
          className={cn(
            'inline-flex rounded-full overflow-hidden font-medium',
            error ? 'border border-[var(--danger)]' : 'border border-[var(--border)]',
            disabled && 'opacity-50 pointer-events-none'
          )}
        >
          {options.map((option) => {
            const isSelected = option.value === value;
            const accentColor = option.activeColor
              ? colorMap[option.activeColor]
              : colorMap.primary;

            return (
              <button
                key={String(option.value)}
                type="button"
                disabled={disabled || isSelected}
                onClick={() => !isSelected && onChange?.(option.value)}
                className={cn(paddingClass, 'transition-colors')}
                style={
                  isSelected
                    ? { backgroundColor: accentColor, color: '#fff', cursor: 'default' }
                    : {
                        backgroundColor: 'var(--surface)',
                        color: 'var(--text-muted)',
                      }
                }
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                      'var(--surface-hover)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                      'var(--surface)';
                  }
                }}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        {error && errorText && (
          <p
            className={cn('text-xs mt-1', errorClassName)}
            style={{ color: 'var(--danger)' }}
          >
            {errorText}
          </p>
        )}
      </div>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';
