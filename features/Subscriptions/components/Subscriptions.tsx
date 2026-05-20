"use client";

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui';
import { ConfirmModal } from '@/components/ui/ConfirmModal';
import { DataTable, Column, Action } from '@/components/tables/DataTable';
import { 
  CreditCardOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ReloadOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  BankOutlined,
} from '@ant-design/icons';
import { useSubscriptions } from '../hooks/useSubscriptions';
import { SubscriptionsSkeleton } from './Skeletons/SubscriptionsSkeleton';
import { CreateSubscription } from './CreateForm/CreateSubscription';
import { EditSubscription } from './EditForm/EditSubscription';
import { Subscription, SubscriptionStatus } from '../types/subscriptions.types';
import { SUBSCRIPTION_STATUS_OPTIONS, BILLING_CYCLE_OPTIONS } from '../constants/subscriptions.constants';

export function Subscriptions() {
  const {
    subscriptions,
    totalSubscriptions,
    activeSubscriptions,
    pendingSubscriptions,
    cancelledSubscriptions,
    expiredSubscriptions,
    isLoading,
    isDeleting,
    isRenewing,
    isCancelling,
    handleDelete,
    handleRenew,
    handleCancel,
    openRenewModal,
    closeRenewModal,
    pendingRenewSubscription,
    openCancelModal,
    closeCancelModal,
    pendingCancelSubscription,
    openDeleteModal,
    isDeleteModalOpen,
    closeDeleteModal,
    isCreateModalOpen,
    openCreateModal,
    closeCreateModal,
    editingSubscription,
    openEditModal,
    closeEditModal,
    selectedSubscription,
    pagination,
    setPage,
    setPerPage,
    filters,
  } = useSubscriptions();

  const stats = [
    {
      title: 'Total Subscriptions',
      value: totalSubscriptions.toString(),
      icon: <CreditCardOutlined />,
      color: '#0ea5e9',
    },
    {
      title: 'Active',
      value: activeSubscriptions.toString(),
      icon: <CheckCircleOutlined />,
      color: '#10b981',
    },
    {
      title: 'Pending',
      value: pendingSubscriptions.toString(),
      icon: <ClockCircleOutlined />,
      color: '#f59e0b',
    },
    {
      title: 'Cancelled',
      value: cancelledSubscriptions.toString(),
      icon: <CloseCircleOutlined />,
      color: '#ef4444',
    },
    {
      title: 'Expired',
      value: expiredSubscriptions.toString(),
      icon: <ExclamationCircleOutlined />,
      color: '#8b5cf6',
    },
  ];

  const getStatusColor = (status: SubscriptionStatus) => {
    const option = SUBSCRIPTION_STATUS_OPTIONS.find(o => o.value === status);
    return option?.color || '#6b7280';
  };

  const getStatusLabel = (status: SubscriptionStatus) => {
    const option = SUBSCRIPTION_STATUS_OPTIONS.find(o => o.value === status);
    return option?.label || status;
  };

  const columns: Column<Subscription>[] = [
    {
      key: 'organization',
      title: 'Organization',
      render: (_: any, subscription: Subscription) => (
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
            <BankOutlined className="text-info" />
          </div>
          <div>
            <p className="text-[14px] font-semibold text-text">{subscription.organization_name}</p>
            <p className="text-[12px] text-text-muted">ID: {subscription.organization_id}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'plan_name',
      title: 'Plan',
      dataIndex: 'plan_name',
      render: (value: string) => (
        <span className="text-[14px] font-medium text-text">{value}</span>
      ),
    },
    {
      key: 'status',
      title: 'Status',
      dataIndex: 'status',
      render: (value: SubscriptionStatus) => (
        <span 
          className="inline-flex items-center px-2 py-1 rounded-full text-[11px] font-medium"
          style={{ 
            backgroundColor: `${getStatusColor(value)}20`, 
            color: getStatusColor(value) 
          }}
        >
          {getStatusLabel(value)}
        </span>
      ),
    },
    {
      key: 'billing_cycle',
      title: 'Billing',
      dataIndex: 'billing_cycle',
      render: (value: string) => (
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-[11px] font-medium ${
          value === 'yearly' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
        }`}>
          {value}
        </span>
      ),
    },
    {
      key: 'price',
      title: 'Price',
      dataIndex: 'price',
      render: (value: number) => (
        <span className="text-[14px] font-semibold text-text">${value}</span>
      ),
    },
    {
      key: 'start_date',
      title: 'Start Date',
      dataIndex: 'start_date',
      render: (value: string) => (
        <span className="text-[13px] text-text">{value}</span>
      ),
    },
    {
      key: 'end_date',
      title: 'End Date',
      dataIndex: 'end_date',
      render: (value: string) => (
        <span className="text-[13px] text-text">{value}</span>
      ),
    },
    {
      key: 'auto_renew',
      title: 'Auto Renew',
      dataIndex: 'auto_renew',
      render: (value: boolean) => (
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-[11px] font-medium ${
          value ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
        }`}>
          {value ? 'Yes' : 'No'}
        </span>
      ),
    },
  ];

  const actions: Action<Subscription>[] = [
    {
      key: 'edit',
      label: 'Edit',
      icon: <EditOutlined />,
      variant: 'ghost',
      onClick: (subscription) => openEditModal(subscription),
    },
    {
      key: 'renew',
      label: 'Renew',
      icon: <ReloadOutlined />,
      variant: 'ghost',
      onClick: (subscription) => openRenewModal(subscription),
      disabled: (subscription) => subscription.status === 'cancelled' || subscription.status === 'expired',
    },
    {
      key: 'cancel',
      label: 'Cancel',
      icon: <CloseCircleOutlined />,
      variant: 'ghost',
      onClick: (subscription) => openCancelModal(subscription),
      disabled: (subscription) => subscription.status === 'cancelled' || subscription.status === 'expired',
    },
    {
      key: 'delete',
      label: 'Delete',
      icon: <DeleteOutlined />,
      variant: 'ghost',
      onClick: (subscription) => openDeleteModal(subscription),
      disabled: () => isDeleting,
    },
  ];

  if (isLoading) {
    return <SubscriptionsSkeleton />;
  }

  return (
    <>
    <div className="min-h-screen p-3 md:p-4 bg-background">
      {/* Header */}
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-[20px] font-bold leading-tight md:text-[22px] text-text">
            Organization Subscriptions
          </h1>
          <p className="mt-1 text-[13px] text-text-muted">
            Manage organization subscriptions and billing
          </p>
        </div>
        <Button variant="primary" onClick={openCreateModal}>
          <PlusOutlined /> Add Subscription
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[13px] text-text-muted">{stat.title}</p>
                <h3 className="text-[24px] font-bold mt-2 text-text">{stat.value}</h3>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
                <span style={{ fontSize: 20 }}>{stat.icon}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Subscriptions Table */}
      <Card className="p-5">
        <DataTable<Subscription>
          data={subscriptions}
          columns={columns}
          actions={actions}
          loading={isLoading}
          idField="id"
          emptyMessage="No subscriptions found"
          actionsColumnTitle="Actions"
          actionsColumnWidth={180}
          pagination={{
            pageSize: filters.per_page ?? 15,
            current: pagination?.current_page ?? 1,
            total: pagination?.total ?? 0,
            showSizeChanger: true,
            showTotal: true,
            pageSizeOptions: [10, 15, 25, 50],
          }}
          onChange={(antPagination) => {
            if (antPagination.current) setPage(antPagination.current);
            if (antPagination.pageSize) setPerPage(antPagination.pageSize);
          }}
        />
      </Card>
    </div>

      {/* Create Subscription Modal */}
      <CreateSubscription
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
      />

      {/* Edit Subscription Modal */}
      <EditSubscription
        isOpen={!!editingSubscription}
        onClose={closeEditModal}
        subscription={editingSubscription}
      />

      {/* Renew Subscription Modal */}
      <ConfirmModal
        isOpen={!!pendingRenewSubscription}
        onClose={closeRenewModal}
        onConfirm={handleRenew}
        type="success"
        title="Renew Subscription"
        message={`Renew subscription for "${pendingRenewSubscription?.organization_name}"?`}
        description={`This will extend the subscription period for the organization.`}
        confirmText="Renew"
      />

      {/* Cancel Subscription Modal */}
      <ConfirmModal
        isOpen={!!pendingCancelSubscription}
        onClose={closeCancelModal}
        onConfirm={handleCancel}
        type="warning"
        title="Cancel Subscription"
        message={`Cancel subscription for "${pendingCancelSubscription?.organization_name}"?`}
        description={`This will cancel the subscription. This action cannot be undone.`}
        confirmText="Cancel Subscription"
      />

      {/* Delete Confirm Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        type="delete"
        title="Delete Subscription"
        message="Are you sure you want to delete this subscription?"
        description="This action cannot be undone."
        confirmText="Delete"
      />
    </>
  );
}
