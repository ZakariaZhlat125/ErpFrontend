'use client';

import { ReactNode } from 'react';
import { Modal as AntModal, ModalProps as AntModalProps } from 'antd';
import { useTheme } from '@/lib/theme/use-theme';

export interface ModalProps extends Omit<AntModalProps, 'width'> {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showCloseButton?: boolean;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  showCloseButton = true,
  ...props
}: ModalProps) {
  const { tokens } = useTheme();

  const sizeWidth = {
    sm: 400,
    md: 600,
    lg: 800,
    xl: 1000,
  };

  return (
    <AntModal
      open={isOpen}
      onCancel={onClose}
      title={title}
      footer={footer}
      width={sizeWidth[size]}
      closable={showCloseButton}
      centered
      className="custom-modal"
      transitionName=""
      maskTransitionName=""
      styles={{
        header: {
          backgroundColor: tokens.surface,
          borderBottom: `1px solid ${tokens.border}`,
          padding: '20px 24px',
          marginBottom: 0,
        },
        body: {
          // backgroundColor: tokens.surface,
          padding: '24px',
        },
        footer: {
          backgroundColor: tokens.surface,
          borderTop: `1px solid ${tokens.border}`,
          borderRadius: '10px',
          padding: '16px 24px',
        },
        mask: {
          backdropFilter: 'blur(4px)',
        },
      }}
      style={{
        borderRadius: '10px',
      }}
      {...props}
    >
      {children}
    </AntModal>
  );
}
