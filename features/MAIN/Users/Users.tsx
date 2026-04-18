'use client';

import { useState } from 'react';
import { Button, Input, Select, Modal } from '@/components/ui';
import { Card } from '@/components/ui/Card';
import { DataTable } from '@/components/tables/DataTable';
import { useCrud } from '@/lib/hooks/useCrud';
import { useTheme } from '@/lib/theme/use-theme';
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  MailOutlined,
  PhoneOutlined,
  FilterOutlined,
  DownOutlined,
  MoreOutlined,
} from '@ant-design/icons';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'Admin' | 'Manager' | 'Supervisor' | 'User';
  organization: string;
  status: 'active' | 'inactive' | 'pending';
}

export function Users() {
  const { tokens } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState<Partial<User>>({});

  const initialData: User[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah@techcorp.com',
      phone: '+1 (555) 123-4567',
      role: 'Admin',
      organization: 'TechCorp Global',
      status: 'active',
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'm.chen@innovationlabs.com',
      phone: '+1 (555) 234-5678',
      role: 'Manager',
      organization: 'Innovation Labs',
      status: 'active',
    },
    {
      id: '3',
      name: 'Emma Davis',
      email: 'emma.d@digitalsol.com',
      phone: '+1 (555) 345-6789',
      role: 'User',
      organization: 'Digital Solutions',
      status: 'pending',
    },
    {
      id: '4',
      name: 'James Wilson',
      email: 'j.wilson@futuresys.com',
      phone: '+1 (555) 456-7890',
      role: 'Manager',
      organization: 'Future Systems',
      status: 'active',
    },
    {
      id: '5',
      name: 'Lisa Anderson',
      email: 'l.anderson@techcorp.com',
      phone: '+1 (555) 567-8901',
      role: 'User',
      organization: 'TechCorp Global',
      status: 'inactive',
    },
  ];

  const {
    data,
    isLoading,
    error,
    selectedItem,
    isModalOpen,
    isEditMode,
    handleCreate,
    handleEdit,
    handleDelete,
    handleSave,
    handleCancel,
  } = useCrud<User>({
    initialData,
    onCreate: async (item) => {
      console.log('Creating user:', item);
    },
    onUpdate: async (id, item) => {
      console.log('Updating user:', id, item);
    },
    onDelete: async (id) => {
      console.log('Deleting user:', id);
    },
  });

  const filteredData = data.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return { bg: '#d1fae5', text: '#059669' };
      case 'pending':
        return { bg: '#fef3c7', text: '#d97706' };
      case 'inactive':
        return { bg: '#fee2e2', text: '#dc2626' };
      default:
        return { bg: '#f3f4f6', text: '#6b7280' };
    }
  };

  const getRoleColor = (role: string) => {
    const colors: Record<string, string> = {
      'Admin': '#a855f7',
      'Manager': '#0ea5e9',
      'Supervisor': '#f59e0b',
      'User': '#10b981',
    };
    return colors[role] || '#6b7280';
  };

  const columns = [
    {
      key: 'name',
      title: 'User',
      dataIndex: 'name' as keyof User,
      render: (value: string, record: User) => (
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-sm"
            style={{ backgroundColor: '#a855f7', color: 'white' }}
          >
            {record.name.split(' ').map(n => n[0]).join('').toUpperCase()}
          </div>
          <div>
            <p style={{ color: tokens.text, fontWeight: 600, fontSize: '14px' }}>
              {value}
            </p>
            <p style={{ color: tokens.textSecondary, fontSize: '12px', marginTop: '2px' }}>
              {record.email}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: 'contact',
      title: 'Contact',
      dataIndex: undefined,
      render: (_: any, record: User) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <MailOutlined style={{ color: tokens.textSecondary, fontSize: '14px' }} />
            <span style={{ color: tokens.text, fontSize: '13px' }}>{record.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <PhoneOutlined style={{ color: tokens.textSecondary, fontSize: '14px' }} />
            <span style={{ color: tokens.text, fontSize: '13px' }}>{record.phone}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      title: 'Role',
      dataIndex: 'role' as keyof User,
      render: (value: string) => (
        <div className="flex items-center gap-2">
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: getRoleColor(value),
            }}
          />
          <span style={{ color: tokens.text, fontSize: '14px', fontWeight: 500 }}>
            {value}
          </span>
        </div>
      ),
    },
    {
      key: 'organization',
      title: 'Organization',
      dataIndex: 'organization' as keyof User,
      render: (value: string) => (
        <a
          href="#"
          style={{
            color: '#0ea5e9',
            fontSize: '14px',
            textDecoration: 'none',
          }}
        >
          {value}
        </a>
      ),
    },
    {
      key: 'status',
      title: 'Status',
      dataIndex: 'status' as keyof User,
      render: (value: string) => {
        const statusColor = getStatusColor(value);
        return (
          <span
            style={{
              backgroundColor: statusColor.bg,
              color: statusColor.text,
              padding: '4px 10px',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: 600,
              display: 'inline-block',
              textTransform: 'lowercase',
            }}
          >
            {value}
          </span>
        );
      },
    },
  ];

  const actions = [
    {
      key: 'edit',
      label: 'Edit',
      icon: <EditOutlined />,
      onClick: (record: User) => handleEdit(record),
      variant: 'ghost' as const,
    },
    {
      key: 'delete',
      label: 'Delete',
      icon: <DeleteOutlined />,
      onClick: (record: User) => handleDelete(record.id),
      variant: 'danger' as const,
    },
    {
      key: 'more',
      label: 'More',
      icon: <MoreOutlined />,
      onClick: (record: User) => console.log('More options:', record),
      variant: 'ghost' as const,
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: User = {
      id: isEditMode && selectedItem ? selectedItem.id : Date.now().toString(),
      name: formData.name || '',
      email: formData.email || '',
      phone: formData.phone || '',
      role: formData.role || 'User',
      organization: formData.organization || '',
      status: formData.status || 'active',
    };

    try {
      await handleSave(newItem);
      setFormData({});
    } catch (err) {
      console.error('Error saving user:', err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: tokens.text }}>
            Users
          </h1>
          <p className="text-sm mt-1" style={{ color: tokens.textSecondary }}>
            Manage all users across your organization
          </p>
        </div>
        <Button variant="primary" onClick={handleCreate}>
          <PlusOutlined /> Add User
        </Button>
      </div>

      <Card className="p-6">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="flex-1 flex items-center gap-2 px-4 py-3 rounded-lg" style={{ backgroundColor: 'var(--surface-muted)' }}>
            <SearchOutlined style={{ color: tokens.textSecondary }} />
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none"
              style={{ color: tokens.text, fontSize: '14px' }}
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              style={{
                backgroundColor: 'transparent',
                border: `1px solid ${tokens.border}`,
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                color: tokens.text,
                fontSize: '14px',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              All Status
              <DownOutlined style={{ fontSize: '12px' }} />
            </button>
            <button
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                padding: '8px 12px',
                cursor: 'pointer',
                color: tokens.text,
                fontSize: '14px',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <FilterOutlined style={{ fontSize: '14px' }} />
              More Filters
            </button>
          </div>
        </div>

        <DataTable
          data={filteredData}
          columns={columns}
          actions={actions}
          loading={isLoading}
          emptyMessage="No users found"
        />

        <div className="mt-6 flex items-center justify-between" style={{ borderTop: `1px solid ${tokens.border}`, paddingTop: '16px' }}>
          <p style={{ color: tokens.textSecondary, fontSize: '14px' }}>
            Showing 1 to {filteredData.length} of {filteredData.length} users
          </p>
          <div className="flex items-center gap-2">
            <Button variant="ghost" disabled>
              Previous
            </Button>
            <Button variant="primary" disabled>
              Next
            </Button>
          </div>
        </div>
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCancel}
        title={isEditMode ? 'Edit User' : 'Add User'}
        size="lg"
        footer={
          <>
            <Button variant="ghost" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit} isLoading={isLoading}>
              {isEditMode ? 'Update' : 'Create'}
            </Button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            value={formData.name || ''}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter full name"
            required
          />
          <Input
            label="Email"
            type="email"
            value={formData.email || ''}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Enter email address"
            required
          />
          <Input
            label="Phone"
            value={formData.phone || ''}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="Enter phone number"
            required
          />
          <Select
            label="Role"
            value={formData.role || ''}
            onChange={(value) => setFormData({ ...formData, role: value as any })}
            options={[
              { value: 'Admin', label: 'Admin' },
              { value: 'Manager', label: 'Manager' },
              { value: 'Supervisor', label: 'Supervisor' },
              { value: 'User', label: 'User' },
            ]}
            placeholder="Select role"
            required
          />
          <Input
            label="Organization"
            value={formData.organization || ''}
            onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
            placeholder="Enter organization name"
            required
          />
          <Select
            label="Status"
            value={formData.status || ''}
            onChange={(value) => setFormData({ ...formData, status: value as any })}
            options={[
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' },
              { value: 'pending', label: 'Pending' },
            ]}
            placeholder="Select status"
            required
          />
          {error && (
            <p className="text-sm" style={{ color: tokens.danger }}>
              {error}
            </p>
          )}
        </form>
      </Modal>
    </div>
  );
}
