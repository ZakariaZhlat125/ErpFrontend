"use client";

import { useTranslations } from 'next-intl';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui';
import { ConfirmModal } from '@/components/ui/ConfirmModal';
import { DataTable, Column, Action } from '@/components/tables/DataTable';
import { RadioGroup } from '@/components/ui/RadioGroup';
import { 
  DollarOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  StarOutlined,
} from '@ant-design/icons';
import { usePlans } from '../hooks/usePlans';
import { PlanSkeleton } from './Skeletons/PlanSkeleton';
import { CreatePlan } from './CreateForm/CreatePlan';
import { EditPlan } from './EditForm/EditPlan';
import { Plan } from '../types/plans.types';

export function Plans() {
  const t = useTranslations('plans');
  const {
    plans,
    totalPlans,
    activePlans,
    popularPlans,
    inactivePlans,
    isLoading,
    isDeleting,
    isTogglingActive,
    isTogglingPopular,
    handleDelete,
    handleToggleActive,
    handleTogglePopular,
    openToggleActiveModal,
    closeToggleActiveModal,
    pendingTogglePlan,
    openDeleteModal,
    isDeleteModalOpen,
    closeDeleteModal,
    isCreateModalOpen,
    openCreateModal,
    closeCreateModal,
    editingPlan,
    openEditModal,
    closeEditModal,
    pagination,
    setPage,
    setPerPage,
    filters,
  } = usePlans();

  const stats = [
    {
      title: t('stats.totalPlans'),
      value: totalPlans.toString(),
      icon: <DollarOutlined />,
      color: '#0ea5e9',
    },
    {
      title: t('stats.activePlans'),
      value: activePlans.toString(),
      icon: <CheckCircleOutlined />,
      color: '#10b981',
    },
    {
      title: t('stats.popularPlans'),
      value: popularPlans.toString(),
      icon: <StarOutlined />,
      color: '#f59e0b',
    },
    {
      title: t('stats.inactivePlans'),
      value: inactivePlans.toString(),
      icon: <CloseCircleOutlined />,
      color: '#ef4444',
    },
  ];

  const columns: Column<Plan>[] = [
    {
      key: 'name',
      title: t('table.plan'),
      dataIndex: 'name',
      render: (_: any, plan: Plan) => (
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
            <DollarOutlined className="text-info" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-[14px] font-semibold text-text">{plan.name}</p>
              {plan.is_popular && <StarOutlined style={{ color: '#f59e0b', fontSize: 14 }} />}
            </div>
            <p className="text-[12px] text-text-muted">{plan.description}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'price',
      title: t('table.price'),
      dataIndex: 'price',
      sortable: true,
      render: (value: number) => (
        <span className="text-[14px] font-semibold text-text">${value}</span>
      ),
    },
    {
      key: 'billing_cycle',
      title: t('table.billing'),
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
      key: 'max_users',
      title: t('table.users'),
      dataIndex: 'max_users',
      sortable: true,
      render: (value: number) => (
        <span className="text-[14px] text-text">{value}</span>
      ),
    },
    {
      key: 'max_branches',
      title: t('table.branches'),
      dataIndex: 'max_branches',
      sortable: true,
      render: (value: number) => (
        <span className="text-[14px] text-text">{value}</span>
      ),
    },
    {
      key: 'is_active',
      title: t('table.status'),
      dataIndex: 'is_active',
      render: (_: any, plan: Plan) => (
        <RadioGroup
          size="sm"
          value={plan.is_active}
          onChange={(val) => openToggleActiveModal(plan)}
          disabled={isTogglingActive}
          options={[
            { label: t('status.active'),   value: true,  activeColor: 'success' },
            { label: t('status.inactive'), value: false, activeColor: 'danger'  },
          ]}
        />
      ),
    },
    {
      key: 'is_popular',
      title: t('table.popular'),
      dataIndex: 'is_popular',
      render: (_: any, plan: Plan) => (
        <button onClick={() => handleTogglePopular(plan)} disabled={isTogglingPopular}>
          {plan.is_popular
            ? <StarOutlined style={{ color: '#f59e0b', fontSize: 16 }} />
            : <span className="text-[12px] text-text-muted">-</span>
          }
        </button>
      ),
    },
  ];

  const actions: Action<Plan>[] = [
    {
      key: 'edit',
      label: t('editPlan'),
      icon: <EditOutlined />,
      variant: 'ghost',
      onClick: (plan) => openEditModal(plan),
    },
    {
      key: 'delete',
      label: t('deletePlan'),
      icon: <DeleteOutlined />,
      variant: 'ghost',
      onClick: (plan) => openDeleteModal(plan),
      disabled: () => isDeleting,
    },
  ];

  if (isLoading) {
    return <PlanSkeleton />;
  }

  
  return (
    <>
    <div className="min-h-screen p-3 md:p-4 bg-background">
      {/* Header */}
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-[20px] font-bold leading-tight md:text-[22px] text-text">
            {t('title')}
          </h1>
          <p className="mt-1 text-[13px] text-text-muted">
            {t('description')}
          </p>
        </div>
        <Button variant="primary" onClick={openCreateModal}>
          <PlusOutlined /> {t('addPlan')}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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

      {/* Plans Table */}
      <Card className="p-5">
        <DataTable<Plan>
          data={plans}
          columns={columns}
          actions={actions}
          loading={isLoading}
          idField="id"
          emptyMessage={t('emptyMessage') || 'No plans found'}
          actionsColumnTitle={t('table.actions')}
          actionsColumnWidth={120}
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

      {/* Create Plan Modal */}
      <CreatePlan
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
      />

      {/* Edit Plan Modal */}
      <EditPlan
        isOpen={!!editingPlan}
        onClose={closeEditModal}
        plan={editingPlan}
      />

      {/* Toggle Active Confirm Modal */}
      <ConfirmModal
        isOpen={!!pendingTogglePlan}
        onClose={closeToggleActiveModal}
        onConfirm={handleToggleActive}
        type={pendingTogglePlan?.is_active ? 'warning' : 'success'}
        title={pendingTogglePlan?.is_active ? t('deactivatePlan') : t('activatePlan')}
        message={t('toggleConfirmMessage', { action: pendingTogglePlan?.is_active ? t('deactivate') : t('activate'), name: pendingTogglePlan?.name ?? '' })}
        description={pendingTogglePlan?.is_active ? t('deactivateDescription') : t('activateDescription')}
        confirmText={pendingTogglePlan?.is_active ? t('deactivate') : t('activate')}
      />

      {/* Delete Confirm Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        type="delete"
        title={t('deletePlan')}
        message={t('messages.deleteConfirm')}
        description={t('deleteDescription')}
        confirmText={t('delete')}
      />
    </>
  );
}
