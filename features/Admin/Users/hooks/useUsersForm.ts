"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateUser, useUpdateUser } from './users';
import { User, CreateUserInput, UpdateUserInput } from '../types/users.types';
import { DEFAULT_USER } from '../constants/users.constants';
import { userSchema, UserFormData } from '../schemas/users.schema';

type FormMode = 'create' | 'edit';

export function useUsersForm(mode: FormMode, entity?: User, onSuccess?: () => void) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const createMutation = useCreateUser();
  const updateMutation = useUpdateUser();

  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema) as any,
    mode: 'onBlur',
    defaultValues: mode === 'edit' && entity ? {
      name: entity.name,
      email: entity.email,
      phone: entity.phone || '',
      role: entity.role,
      status: entity.status,
      organization_id: entity.organization_id || '',
      branch_id: entity.branch_id || '',
    } : DEFAULT_USER,
  });

  const isPending = createMutation.isPending || updateMutation.isPending;

  const handleSubmit = form.handleSubmit((data) => {
    if (mode === 'create') {
      createMutation.mutate(data as CreateUserInput, {
        onSuccess: () => {
          form.reset(DEFAULT_USER);
          setIsModalOpen(false);
          onSuccess?.();
        },
      });
    } else if (mode === 'edit' && entity) {
      // Remove password fields if empty on update
      const updateData: Partial<UpdateUserInput> = { ...data };
      if (!updateData.password) {
        delete updateData.password;
        delete updateData.password_confirmation;
      }
      
      updateMutation.mutate(
        { id: entity.id, data: updateData },
        {
          onSuccess: () => {
            setIsModalOpen(false);
            onSuccess?.();
          },
        }
      );
    }
  });

  const handleReset = () => {
    if (mode === 'edit' && entity) {
      form.reset({
        name: entity.name,
        email: entity.email,
        phone: entity.phone || '',
        role: entity.role,
        status: entity.status,
        organization_id: entity.organization_id || '',
        branch_id: entity.branch_id || '',
      });
    } else {
      form.reset(DEFAULT_USER);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    handleReset();
  };

  return {
    form,
    isModalOpen,
    isPending,
    handleSubmit,
    handleReset,
    openModal,
    closeModal,
  };
}
