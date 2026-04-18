'use client';

import { forwardRef } from 'react';
import { Switch as AntSwitch, SwitchProps as AntSwitchProps } from 'antd';
import { useTheme } from '@/lib/theme/use-theme';
import { cn } from '@/lib/utils/cn';

export interface SwitchProps extends AntSwitchProps {
  label?: string;
}

export const Switch = forwardRef<any, SwitchProps>(
  ({ 
    className, 
    label,
    ...props 
  }, ref) => {
    const { tokens } = useTheme();

    return (
      <div className="flex items-center gap-3">
        <AntSwitch
          ref={ref}
          className={cn(className)}
          style={{
            backgroundColor: props.checked ? tokens.primary : tokens.border,
          }}
          {...props}
        />
        {label && (
          <label 
            className="text-sm font-medium cursor-pointer"
            style={{ color: tokens.text }}
            onClick={() => props.onChange?.(!props.checked, {} as any)}
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);

Switch.displayName = 'Switch';
