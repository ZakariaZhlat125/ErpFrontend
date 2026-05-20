"use client";
import { useState } from 'react';
import { useUsers as useUsersData, useDeleteUser } from './users';
import { User, UserFilters, UserRole, UserStatus, PaginationMeta } from '../types/users.types';

export function useUsers() {
  const [filters, setFilters] = useState<UserFilters>({ page: 1, per_page: 15 });
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const { data: result, isLoading, error, refetch } = useUsersData(filters);
  const deleteUserMutation = useDeleteUser();

  const users = result?.data || [];
  const pagination = result?.pagination;

  const totalUsers = pagination?.total || 0;
  const activeUsers = users.filter((u: User) => u.status === 'active').length;
  const adminUsers = users.filter((u: User) => u.role === 'admin').length;
  const pendingUsers = users.filter((u: User) => u.status === 'pending').length;
  const suspendedUsers = users.filter((u: User) => u.status === 'suspended').length;

  const handleDelete = () => {
    if (selectedUser) {
      deleteUserMutation.mutate(selectedUser.id, {
        onSuccess: () => {
          setIsDeleteModalOpen(false);
          setSelectedUser(null);
        },
      });
    }
  };

  const openDeleteModal = (user: User) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedUser(null);
    setIsDeleteModalOpen(false);
  };

  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);

  const openEditModal = (user: User) => setEditingUser(user);
  const closeEditModal = () => setEditingUser(null);

  return {
    // Data
    users,
    pagination,
    totalUsers,
    activeUsers,
    adminUsers,
    pendingUsers,
    suspendedUsers,
    selectedUser,
    
    // Loading states
    isLoading,
    isDeleting: deleteUserMutation.isPending,
    
    // Error
    error,
    
    // Filters & pagination
    filters,
    setFilters,
    setPage: (page: number) => setFilters((f) => ({ ...f, page })),
    setPerPage: (per_page: number) => setFilters((f) => ({ ...f, per_page, page: 1 })),
    
    // Modal states
    isDeleteModalOpen,
    isCreateModalOpen,
    editingUser,
    
    // Handlers
    handleDelete,
    openDeleteModal,
    closeDeleteModal,
    setSelectedUser,
    openCreateModal,
    closeCreateModal,
    openEditModal,
    closeEditModal,
    
    // Refetch
    refetch,
  };
}
