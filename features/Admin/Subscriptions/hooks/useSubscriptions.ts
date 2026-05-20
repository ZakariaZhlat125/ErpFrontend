"use client";
import { useState } from 'react';
import { 
  useSubscriptions as useSubscriptionsData, 
  useDeleteSubscription, 
  useChangeSubscriptionStatus,
  useRenewSubscription,
  useCancelSubscription,
} from './subscriptions';
import { Subscription, SubscriptionFilters, SubscriptionStatus, PaginationMeta } from '../types/subscriptions.types';

export function useSubscriptions() {
  const [filters, setFilters] = useState<SubscriptionFilters>({ page: 1, per_page: 15 });
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingSubscription, setEditingSubscription] = useState<Subscription | null>(null);
  const [pendingStatusSubscription, setPendingStatusSubscription] = useState<Subscription | null>(null);
  const [pendingRenewSubscription, setPendingRenewSubscription] = useState<Subscription | null>(null);
  const [pendingCancelSubscription, setPendingCancelSubscription] = useState<Subscription | null>(null);
  const [newStatus, setNewStatus] = useState<SubscriptionStatus>('active');

  const { data: result, isLoading, error, refetch } = useSubscriptionsData(filters);
  const deleteSubscriptionMutation = useDeleteSubscription();
  const changeStatusMutation = useChangeSubscriptionStatus();
  const renewSubscriptionMutation = useRenewSubscription();
  const cancelSubscriptionMutation = useCancelSubscription();

  const subscriptions = result?.data || [];
  const pagination = result?.pagination;

  const totalSubscriptions = pagination?.total || 0;
  const activeSubscriptions = subscriptions.filter((s: Subscription) => s.status === 'active').length;
  const pendingSubscriptions = subscriptions.filter((s: Subscription) => s.status === 'pending').length;
  const cancelledSubscriptions = subscriptions.filter((s: Subscription) => s.status === 'cancelled').length;
  const expiredSubscriptions = subscriptions.filter((s: Subscription) => s.status === 'expired').length;

  const handleDelete = () => {
    if (selectedSubscription) {
      deleteSubscriptionMutation.mutate(selectedSubscription.id, {
        onSuccess: () => {
          setIsDeleteModalOpen(false);
          setSelectedSubscription(null);
        },
      });
    }
  };

  const openChangeStatusModal = (subscription: Subscription, status: SubscriptionStatus) => {
    setPendingStatusSubscription(subscription);
    setNewStatus(status);
  };

  const closeChangeStatusModal = () => {
    setPendingStatusSubscription(null);
    setNewStatus('active');
  };

  const handleChangeStatus = () => {
    if (!pendingStatusSubscription) return;
    changeStatusMutation.mutate(
      { id: pendingStatusSubscription.id, data: { status: newStatus } },
      {
        onSuccess: () => {
          setPendingStatusSubscription(null);
          setNewStatus('active');
          refetch();
        },
      }
    );
  };

  const openRenewModal = (subscription: Subscription) => setPendingRenewSubscription(subscription);
  const closeRenewModal = () => setPendingRenewSubscription(null);

  const handleRenew = () => {
    if (!pendingRenewSubscription) return;
    renewSubscriptionMutation.mutate(
      { id: pendingRenewSubscription.id },
      {
        onSuccess: () => {
          setPendingRenewSubscription(null);
          refetch();
        },
      }
    );
  };

  const openCancelModal = (subscription: Subscription) => setPendingCancelSubscription(subscription);
  const closeCancelModal = () => setPendingCancelSubscription(null);

  const handleCancel = () => {
    if (!pendingCancelSubscription) return;
    cancelSubscriptionMutation.mutate(
      { id: pendingCancelSubscription.id, data: { reason: 'Cancelled by admin' } },
      {
        onSuccess: () => {
          setPendingCancelSubscription(null);
          refetch();
        },
      }
    );
  };

  const openDeleteModal = (subscription: Subscription) => {
    setSelectedSubscription(subscription);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedSubscription(null);
    setIsDeleteModalOpen(false);
  };

  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);

  const openEditModal = (subscription: Subscription) => setEditingSubscription(subscription);
  const closeEditModal = () => setEditingSubscription(null);

  return {
    // Data
    subscriptions,
    pagination,
    totalSubscriptions,
    activeSubscriptions,
    pendingSubscriptions,
    cancelledSubscriptions,
    expiredSubscriptions,
    selectedSubscription,
    
    // Loading states
    isLoading,
    isDeleting: deleteSubscriptionMutation.isPending,
    isChangingStatus: changeStatusMutation.isPending,
    isRenewing: renewSubscriptionMutation.isPending,
    isCancelling: cancelSubscriptionMutation.isPending,
    
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
    editingSubscription,
    pendingStatusSubscription,
    pendingRenewSubscription,
    pendingCancelSubscription,
    newStatus,
    
    // Handlers
    handleDelete,
    handleChangeStatus,
    handleRenew,
    handleCancel,
    openChangeStatusModal,
    closeChangeStatusModal,
    openRenewModal,
    closeRenewModal,
    openCancelModal,
    closeCancelModal,
    openDeleteModal,
    closeDeleteModal,
    setSelectedSubscription,
    openCreateModal,
    closeCreateModal,
    openEditModal,
    closeEditModal,
    
    // Refetch
    refetch,
  };
}
