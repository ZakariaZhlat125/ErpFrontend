"use client";

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui';
import { ConfirmModal } from '@/components/ui/ConfirmModal';
import { DataTable, Column, Action } from '@/components/tables/DataTable';
import { 
  DollarOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  StarOutlined,
  SwapOutlined,
} from '@ant-design/icons';
import { useCurrencies } from '../hooks/useCurrencies';
import { CurrencySkeleton } from './Skeletons/CurrencySkeleton';
import { CreateCurrency } from './CreateForm/CreateCurrency';
import { EditCurrency } from './EditForm/EditCurrency';
import { Currency } from '../types/currency.types';
import { STATUS_OPTIONS } from '../constants/currency.constants';
import { useTranslations } from 'next-intl';
import { UpdateRateModal } from './UpdateRateModal';

export function Currencies() {
  const t = useTranslations("currencies");
  const {
    currencies,
    totalCurrencies,
    activeCurrencies,
    baseCurrencies,
    inactiveCurrencies,
    isLoading,
    isDeleting,
    isSettingBase,
    isTogglingActive,
    handleDelete,
    openDeleteModal,
    isDeleteModalOpen,
    closeDeleteModal,
    isCreateModalOpen,
    openCreateModal,
    closeCreateModal,
    editingCurrency,
    openEditModal,
    closeEditModal,
    selectedCurrency,
    setSelectedCurrency,
    isRateModalOpen,
    openRateModal,
    closeRateModal,
    rateCurrency,
    handleSetBase,
    handleToggleActive,
    pagination,
    setPage,
    setPerPage,
    filters,
  } = useCurrencies();

  const stats = [
    {
      title: t('stats.totalCurrencies'),
      value: totalCurrencies.toString(),
      icon: <DollarOutlined />,
      color: '#0ea5e9',
    },
    {
      title: t('stats.active'),
      value: activeCurrencies.toString(),
      icon: <CheckCircleOutlined />,
      color: '#10b981',
    },
    {
      title: t('stats.baseCurrency'),
      value: baseCurrencies.toString(),
      icon: <StarOutlined />,
      color: '#f59e0b',
    },
    {
      title: t('stats.inactive'),
      value: inactiveCurrencies.toString(),
      icon: <CloseCircleOutlined />,
      color: '#6b7280',
    },
  ];

  const getStatusColor = (isActive: boolean) => {
    const option = STATUS_OPTIONS.find(o => o.value === isActive);
    return option?.color || '#6b7280';
  };

  const getStatusLabel = (isActive: boolean) => {
    const option = STATUS_OPTIONS.find(o => o.value === isActive);
    return option?.label || (isActive ? 'Active' : 'Inactive');
  };

  const columns: Column<Currency>[] = [
    {
      key: 'currency',
      title: t('table.currency'),
      render: (_: any, currency: Currency) => (
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
            <DollarOutlined className="text-info" />
          </div>
          <div>
            <p className="text-[14px] font-semibold text-text">
              {currency.name} {currency.is_base && <StarOutlined className="text-warning ml-1" />}
            </p>
            <p className="text-[12px] text-text-muted">{currency.code}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'symbol',
      title: t('table.symbol'),
      dataIndex: 'symbol',
      render: (value: string) => (
        <span className="text-[13px] text-text font-medium">{value}</span>
      ),
    },
    {
      key: 'exchange_rate',
      title: t('table.exchangeRate'),
      dataIndex: 'exchange_rate',
      render: (value: number, currency: Currency) => (
        <div className="flex items-center gap-2">
          <span className="text-[13px] text-text">{parseFloat(String(value)).toFixed(6)}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => openRateModal(currency)}
            className="px-2 py-1"
          >
            <SwapOutlined />
          </Button>
        </div>
      ),
    },
    {
      key: 'decimal_places',
      title: t('table.decimalPlaces'),
      dataIndex: 'decimal_places',
      render: (value: number) => (
        <span className="text-[13px] text-text">{value}</span>
      ),
    },
    {
      key: 'separators',
      title: t('table.separators'),
      render: (_: any, currency: Currency) => (
        <span className="text-[13px] text-text">
          {currency.decimal_separator} / {currency.thousands_separator}
        </span>
      ),
    },
    {
      key: 'status',
      title: t('table.status'),
      dataIndex: 'is_active',
      render: (value: boolean) => (
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
      key: 'base',
      title: t('table.base'),
      dataIndex: 'is_base',
      render: (value: boolean, currency: Currency) => (
        <Button
          variant={value ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => handleSetBase(currency)}
          disabled={value || isSettingBase}
          isLoading={isSettingBase && selectedCurrency?.id === currency.id}
        >
          {value ? t('actions.base') : t('actions.setBase')}
        </Button>
      ),
    },
  ];

  const actions: Action<Currency>[] = [
    {
      key: 'edit',
      label: t('actions.edit'),
      icon: <EditOutlined />,
      variant: 'ghost',
      onClick: (currency) => openEditModal(currency),
    },
    {
      key: 'toggle',
      label: t('actions.toggle'),
      icon: <SwapOutlined />,
      variant: 'ghost',
      onClick: (currency) => handleToggleActive(currency),
      disabled: () => isTogglingActive,
    },
    {
      key: 'delete',
      label: t('actions.delete'),
      icon: <DeleteOutlined />,
      variant: 'ghost',
      onClick: (currency) => openDeleteModal(currency),
      disabled: (currency) => currency.is_base || isDeleting,
    },
  ];

  if (isLoading) {
    return <CurrencySkeleton />;
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
            <PlusOutlined /> {t('addCurrency')}
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

        {/* Currencies Table */}
        <Card className="p-5">
          <DataTable<Currency>
            data={currencies}
            columns={columns}
            actions={actions}
            loading={isLoading}
            idField="id"
            emptyMessage={t('emptyMessage')}
            actionsColumnTitle={t('table.actions')}
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

      {/* Create Currency Modal */}
      <CreateCurrency
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
      />

      {/* Edit Currency Modal */}
      <EditCurrency
        isOpen={!!editingCurrency}
        onClose={closeEditModal}
        currency={editingCurrency}
      />

      {/* Update Rate Modal */}
      <UpdateRateModal
        isOpen={isRateModalOpen}
        onClose={closeRateModal}
        rateCurrency={rateCurrency}
      />

      {/* Delete Confirm Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        type="delete"
        title={t('deleteModalTitle')}
        message={t('deleteConfirmMessage')}
        description={t('deleteConfirmDescription')}
        confirmText={t('actions.delete')}
      />
    </>
  );
}
