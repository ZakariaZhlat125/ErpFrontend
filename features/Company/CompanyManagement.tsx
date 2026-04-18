'use client';

import React, { useState } from 'react';
import { Button, Input, Select, Modal } from '@/components/ui';
import { Card } from '@/components/ui/Card';
import { DataTable } from '@/components/tables/DataTable';
import { useCrud } from '@/lib/hooks/useCrud';
import { useTheme } from '@/lib/theme/use-theme';
import { 
  BuildOutlined, 
  MailOutlined, 
  PhoneOutlined, 
  EnvironmentOutlined,
  GlobalOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  FileTextOutlined,
} from '@ant-design/icons';

interface Company {
  id: string;
  name: string;
  type: 'main' | 'branch';
  email: string;
  phone: string;
  address: string;
  website: string;
  employees: number;
  departments: number;
}

export function CompanyManagement() {
  const { tokens } = useTheme();
  const [formData, setFormData] = useState<Partial<Company>>({});

  const initialData: Company[] = [
    {
      id: '1',
      name: 'Acme Corporation',
      type: 'main',
      email: 'contact@acme.com',
      phone: '+1 234 567 890',
      address: '123 Business Ave, New York, NY',
      website: 'www.acme.com',
      employees: 1234,
      departments: 12,
    },
    {
      id: '2',
      name: 'Tech Solutions Ltd',
      type: 'branch',
      email: 'info@techsolutions.com',
      phone: '+1 987 654 321',
      address: '456 Tech Park, San Francisco, CA',
      website: 'www.techsolutions.com',
      employees: 567,
      departments: 8,
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
  } = useCrud<Company>({
    initialData,
    onCreate: async (item) => {
      console.log('Creating company:', item);
    },
    onUpdate: async (id, item) => {
      console.log('Updating company:', id, item);
    },
    onDelete: async (id) => {
      console.log('Deleting company:', id);
    },
  });

  const columns = [
    {
      key: 'name',
      title: 'Company Name',
      dataIndex: 'name' as keyof Company,
      render: (value: string, record: Company) => (
        <div className="flex items-center gap-3">
          <div 
            className="neumorphic-flat w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ color: record.type === 'main' ? tokens.primary : tokens.success }}
          >
            <BuildOutlined className="text-xl" />
          </div>
          <div>
            <p style={{ color: tokens.text, fontWeight: 600, fontSize: '14px' }}>
              {value}
            </p>
            <p style={{ color: tokens.textSecondary, fontSize: '12px' }}>
              {record.type === 'main' ? 'Main Office' : 'Branch Office'}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: 'email',
      title: 'Email',
      dataIndex: 'email' as keyof Company,
      render: (value: string) => (
        <div className="flex items-center gap-2">
          <MailOutlined style={{ color: tokens.textSecondary, fontSize: '14px' }} />
          <span style={{ color: tokens.text, fontSize: '13px' }}>{value}</span>
        </div>
      ),
    },
    {
      key: 'phone',
      title: 'Phone',
      dataIndex: 'phone' as keyof Company,
      render: (value: string) => (
        <div className="flex items-center gap-2">
          <PhoneOutlined style={{ color: tokens.textSecondary, fontSize: '14px' }} />
          <span style={{ color: tokens.text, fontSize: '13px' }}>{value}</span>
        </div>
      ),
    },
    {
      key: 'address',
      title: 'Address',
      dataIndex: 'address' as keyof Company,
      render: (value: string) => (
        <div className="flex items-center gap-2">
          <EnvironmentOutlined style={{ color: tokens.textSecondary, fontSize: '14px' }} />
          <span style={{ color: tokens.text, fontSize: '13px' }}>{value}</span>
        </div>
      ),
    },
    {
      key: 'employees',
      title: 'Employees',
      dataIndex: 'employees' as keyof Company,
      render: (value: number, record: Company) => (
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span style={{ color: tokens.textSecondary }}>Employees</span>
            <span style={{ color: tokens.text, fontWeight: '500' }}>{value}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span style={{ color: tokens.textSecondary }}>Departments</span>
            <span style={{ color: tokens.text, fontWeight: '500' }}>{record.departments}</span>
          </div>
        </div>
      ),
    },
  ];

  const actions = [
    {
      key: 'edit',
      label: 'Edit',
      icon: <EditOutlined />,
      onClick: (record: Company) => handleEdit(record),
      variant: 'ghost' as const,
    },
    {
      key: 'delete',
      label: 'Delete',
      icon: <DeleteOutlined />,
      onClick: (record: Company) => handleDelete(record.id),
      variant: 'danger' as const,
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: Company = {
      id: isEditMode && selectedItem ? selectedItem.id : Date.now().toString(),
      name: formData.name || '',
      type: formData.type || 'branch',
      email: formData.email || '',
      phone: formData.phone || '',
      address: formData.address || '',
      website: formData.website || '',
      employees: formData.employees || 0,
      departments: formData.departments || 0,
    };

    try {
      await handleSave(newItem);
      setFormData({});
    } catch (err) {
      console.error('Error saving company:', err);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: tokens.text }}>
            Company Management
          </h1>
          <p className="text-sm" style={{ color: tokens.textSecondary }}>
            Manage your company information and branches
          </p>
        </div>
        <Button variant="primary" onClick={handleCreate}>
          <PlusOutlined /> Add Company
        </Button>
      </div>

      <Card className="p-6">
        <DataTable
          data={data}
          columns={columns}
          actions={actions}
          loading={isLoading}
          emptyMessage="No companies found"
        />
      </Card>

      <Card>
        <h2 className="text-lg font-semibold mb-4" style={{ color: tokens.text }}>
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="secondary" className="w-full">
            <BuildOutlined /> Add Branch
          </Button>
          <Button variant="secondary" className="w-full">
            <UserOutlined /> Manage Users
          </Button>
          <Button variant="secondary" className="w-full">
            <FileTextOutlined /> Generate Report
          </Button>
        </div>
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCancel}
        title={isEditMode ? 'Edit Company' : 'Add Company'}
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
            label="Company Name"
            value={formData.name || ''}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter company name"
            required
          />
          <Select
            label="Company Type"
            value={formData.type || ''}
            onChange={(value) => setFormData({ ...formData, type: value as 'main' | 'branch' })}
            options={[
              { value: 'main', label: 'Main Office' },
              { value: 'branch', label: 'Branch Office' },
            ]}
            placeholder="Select company type"
            required
          />
          <Input
            label="Email"
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
          <Input
            label="Address"
            value={formData.address || ''}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            placeholder="Enter address"
            required
          />
          <Input
            label="Website"
            value={formData.website || ''}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            placeholder="Enter website URL"
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Employees"
              type="number"
              value={formData.employees || ''}
              onChange={(e) => setFormData({ ...formData, employees: parseInt(e.target.value) || 0 })}
              placeholder="Number of employees"
            />
            <Input
              label="Departments"
              type="number"
              value={formData.departments || ''}
              onChange={(e) => setFormData({ ...formData, departments: parseInt(e.target.value) || 0 })}
              placeholder="Number of departments"
            />
          </div>
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
