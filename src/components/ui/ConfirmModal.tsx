'use client';

import { ReactNode } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import {
  ExclamationCircleOutlined,
  WarningOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';

export type ConfirmModalType = 'delete' | 'warning' | 'success' | 'error' | 'info';

export interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  type?: ConfirmModalType;
  title?: string;
  message?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
  icon?: ReactNode;
  customContent?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const modalConfig = {
  delete: {
    icon: <ExclamationCircleOutlined />,
    title: 'Delete Item',
    message: 'Are you sure you want to delete this item?',
    confirmText: 'Delete',
    variant: 'danger' as const,
  },
  warning: {
    icon: <WarningOutlined />,
    title: 'Warning',
    message: 'Please review this action before proceeding.',
    confirmText: 'Proceed',
    variant: 'warning' as const,
  },
  success: {
    icon: <CheckCircleOutlined />,
    title: 'Success',
    message: 'Operation completed successfully.',
    confirmText: 'OK',
    variant: 'primary' as const,
  },
  error: {
    icon: <CloseCircleOutlined />,
    title: 'Error',
    message: 'An error occurred. Please try again.',
    confirmText: 'Retry',
    variant: 'danger' as const,
  },
  info: {
    icon: <InfoCircleOutlined />,
    title: 'Information',
    message: 'Please review the information below.',
    confirmText: 'OK',
    variant: 'primary' as const,
  },
};

const iconColors = {
  delete: 'text-red-500',
  warning: 'text-amber-500',
  success: 'text-emerald-500',
  error: 'text-red-500',
  info: 'text-blue-500',
};

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  type = 'info',
  title,
  message,
  description,
  confirmText,
  cancelText = 'Cancel',
  showCancel = true,
  icon,
  customContent,
  size = 'sm',
}: ConfirmModalProps) {
  const config = modalConfig[type];
  const defaultIcon = icon || config.icon;
  const defaultTitle = title || config.title;
  const defaultMessage = message || config.message;
  const defaultConfirmText = confirmText || config.confirmText;
  const iconColor = iconColors[type];

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  const footer = (
    <div className="flex justify-end gap-3">
      {showCancel && (
        <Button variant="secondary" onClick={onClose}>
          {cancelText}
        </Button>
      )}
      <Button variant={config.variant} onClick={handleConfirm}>
        {defaultConfirmText}
      </Button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title=""
      footer={footer}
      size={size}
      showCloseButton={type !== 'success' && type !== 'error'}
    >
      <div className="flex flex-col items-center text-center">
        <div className={`mb-4 text-5xl ${iconColor}`}>
          {defaultIcon}
        </div>
        
        <h3 className="mb-3 text-2xl font-bold text-[var(--text)]">
          {defaultTitle}
        </h3>
        
        <p className="mb-2 text-base text-[var(--text-secondary)]">
          {defaultMessage}
        </p>
        
        {description && (
          <p className="text-sm text-[var(--text-muted)]">
            {description}
          </p>
        )}
        
        {customContent && (
          <div className="mt-4 w-full">
            {customContent}
          </div>
        )}
      </div>
    </Modal>
  );
}
