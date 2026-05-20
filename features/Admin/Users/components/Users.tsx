"use client";

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui';
import { ConfirmModal } from '@/components/ui/ConfirmModal';
import { DataTable, Column, Action } from '@/components/tables/DataTable';
import { 
  UserOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
  SafetyCertificateOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { useUsers } from '../hooks/useUsers';
import { UsersSkeleton } from './Skeletons/UsersSkeleton';
import { CreateUser } from './CreateForm/CreateUser';
import { EditUser } from './EditForm/EditUser';
import { User, UserRole, UserStatus } from '../types/users.types';
import { USER_ROLE_OPTIONS, USER_STATUS_OPTIONS } from '../constants/users.constants';

export function Users() {
  const {
    users,
    totalUsers,
    activeUsers,
    adminUsers,
    pendingUsers,
    suspendedUsers,
    isLoading,
    isDeleting,
    handleDelete,
    openDeleteModal,
    isDeleteModalOpen,
    closeDeleteModal,
    isCreateModalOpen,
    openCreateModal,
    closeCreateModal,
    editingUser,
    openEditModal,
    closeEditModal,
    selectedUser,
    pagination,
    setPage,
    setPerPage,
    filters,
  } = useUsers();

  const stats = [
    {
      title: 'Total Users',
      value: totalUsers.toString(),
      icon: <TeamOutlined />,
      color: '#0ea5e9',
    },
    {
      title: 'Active',
      value: activeUsers.toString(),
      icon: <CheckCircleOutlined />,
      color: '#10b981',
    },
    {
      title: 'Admins',
      value: adminUsers.toString(),
      icon: <SafetyCertificateOutlined />,
      color: '#ef4444',
    },
    {
      title: 'Pending',
      value: pendingUsers.toString(),
      icon: <ClockCircleOutlined />,
      color: '#f59e0b',
    },
    {
      title: 'Suspended',
      value: suspendedUsers.toString(),
      icon: <CloseCircleOutlined />,
      color: '#8b5cf6',
    },
  ];

  const getRoleColor = (role: UserRole) => {
    const option = USER_ROLE_OPTIONS.find(o => o.value === role);
    return option?.color || '#6b7280';
  };

  const getRoleLabel = (role: UserRole) => {
    const option = USER_ROLE_OPTIONS.find(o => o.value === role);
    return option?.label || role;
  };

  const getStatusColor = (status: UserStatus) => {
    const option = USER_STATUS_OPTIONS.find(o => o.value === status);
    return option?.color || '#6b7280';
  };

  const getStatusLabel = (status: UserStatus) => {
    const option = USER_STATUS_OPTIONS.find(o => o.value === status);
    return option?.label || status;
  };

  const columns: Column<User>[] = [
    {
      key: 'user',
      title: 'User',
      render: (_: any, user: User) => (
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
            <UserOutlined className="text-info" />
          </div>
          <div>
            <p className="text-[14px] font-semibold text-text">{user.name}</p>
            <p className="text-[12px] text-text-muted">{user.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      title: 'Role',
      dataIndex: 'role',
      render: (value: UserRole) => (
        <span 
          className="inline-flex items-center px-2 py-1 rounded-full text-[11px] font-medium"
          style={{ 
            backgroundColor: `${getRoleColor(value)}20`, 
            color: getRoleColor(value) 
          }}
        >
          {getRoleLabel(value)}
        </span>
      ),
    },
    {
      key: 'status',
      title: 'Status',
      dataIndex: 'status',
      render: (value: UserStatus) => (
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
      key: 'phone',
      title: 'Phone',
      dataIndex: 'phone',
      render: (value: string) => (
        <span className="text-[13px] text-text">{value || '-'}</span>
      ),
    },
    {
      key: 'organization',
      title: 'Organization',
      render: (_: any, user: User) => (
        <span className="text-[13px] text-text">{user.organization_name || '-'}</span>
      ),
    },
    {
      key: 'last_login',
      title: 'Last Login',
      dataIndex: 'last_login_at',
      render: (value: string) => (
        <span className="text-[13px] text-text">{value ? new Date(value).toLocaleDateString() : 'Never'}</span>
      ),
    },
    {
      key: 'email_verified',
      title: 'Verified',
      dataIndex: 'email_verified_at',
      render: (value: string) => (
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-[11px] font-medium ${
          value ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
        }`}>
          {value ? 'Yes' : 'No'}
        </span>
      ),
    },
  ];

  const actions: Action<User>[] = [
    {
      key: 'edit',
      label: 'Edit',
      icon: <EditOutlined />,
      variant: 'ghost',
      onClick: (user) => openEditModal(user),
    },
    {
      key: 'delete',
      label: 'Delete',
      icon: <DeleteOutlined />,
      variant: 'ghost',
      onClick: (user) => openDeleteModal(user),
      disabled: () => isDeleting,
    },
  ];

  if (isLoading) {
    return <UsersSkeleton />;
  }

  return (
    <>
    <div className="min-h-screen p-3 md:p-4 bg-background">
      {/* Header */}
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-[20px] font-bold leading-tight md:text-[22px] text-text">
            Users Management
          </h1>
          <p className="mt-1 text-[13px] text-text-muted">
            Manage system users and their roles
          </p>
        </div>
        <Button variant="primary" onClick={openCreateModal}>
          <PlusOutlined /> Add User
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

      {/* Users Table */}
      <Card className="p-5">
        <DataTable<User>
          data={users}
          columns={columns}
          actions={actions}
          loading={isLoading}
          idField="id"
          emptyMessage="No users found"
          actionsColumnTitle="Actions"
          actionsColumnWidth={140}
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

      {/* Create User Modal */}
      <CreateUser
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
      />

      {/* Edit User Modal */}
      <EditUser
        isOpen={!!editingUser}
        onClose={closeEditModal}
        user={editingUser}
      />

      {/* Delete Confirm Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        type="delete"
        title="Delete User"
        message="Are you sure you want to delete this user?"
        description="This action cannot be undone. All user data will be permanently removed."
        confirmText="Delete"
      />
    </>
  );
}
