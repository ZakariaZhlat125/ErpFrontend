

'use client';

import { useState } from 'react';
import { Button, Input, ConfirmModal, Modal, Select } from '@/components/ui';
import { Card } from '@/components/ui/Card';
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  MoreOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  TeamOutlined,
  ApartmentOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

const organizations = [
  {
    id: 1,
    initials: 'TG',
    name: 'TechCorp Global',
    email: 'contact@techcorp.com',
    phone: '+1 (555) 100-2000',
    address: '123 Tech Street, San Francisco, CA 94105',
    users: 324,
    branches: 12,
    status: 'active',
  },
  {
    id: 2,
    initials: 'IL',
    name: 'Innovation Labs',
    email: 'hello@innovationlabs.com',
    phone: '+1 (555) 200-3000',
    address: '456 Innovation Ave, New York, NY 10001',
    users: 156,
    branches: 5,
    status: 'active',
  },
  {
    id: 3,
    initials: 'DS',
    name: 'Digital Solutions Inc',
    email: 'info@digitalsolutions.com',
    phone: '+1 (555) 300-4000',
    address: '789 Digital Blvd, Austin, TX 78701',
    users: 89,
    branches: 3,
    status: 'pending',
  },
  {
    id: 4,
    initials: 'FS',
    name: 'Future Systems',
    email: 'contact@futuresystems.com',
    phone: '+1 (555) 400-5000',
    address: '321 Future Lane, Seattle, WA 98101',
    users: 201,
    branches: 8,
    status: 'active',
  },
  {
    id: 5,
    initials: 'CD',
    name: 'Cloud Dynamics',
    email: 'support@clouddynamics.com',
    phone: '+1 (555) 500-6000',
    address: '654 Cloud Street, Denver, CO 80202',
    users: 142,
    branches: 6,
    status: 'inactive',
  },
];

function statusClasses(status: string) {
  switch (status) {
    case 'active':
      return 'bg-emerald-100 text-emerald-700';
    case 'pending':
      return 'bg-amber-100 text-amber-700';
    case 'inactive':
      return 'bg-slate-100 text-slate-600';
    default:
      return 'bg-slate-100 text-slate-600';
  }
}

export function Organizations() {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<{ id: number; name: string } | null>(null);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editingOrg, setEditingOrg] = useState<typeof organizations[0] | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '', status: 'active' });

  const handleDeleteClick = (org: { id: number; name: string }) => {
    setSelectedOrg(org);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    console.log('Deleting organization:', selectedOrg);
    // Perform delete action here
    setDeleteModalOpen(false);
    setSelectedOrg(null);
  };

  const handleAddClick = () => {
    setEditingOrg(null);
    setFormData({ name: '', email: '', phone: '', address: '', status: 'active' });
    setFormModalOpen(true);
  };

  const handleEditClick = (org: typeof organizations[0]) => {
    setEditingOrg(org);
    setFormData({ name: org.name, email: org.email, phone: org.phone, address: org.address, status: org.status });
    setFormModalOpen(true);
  };

  const handleFormSubmit = () => {
    console.log('Saving organization:', formData);
    // Perform save action here
    setFormModalOpen(false);
    setFormData({ name: '', email: '', phone: '', address: '', status: 'active' });
  };

  return (
    <div className="min-h-screen bg-[var(--background)] p-6 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-[var(--text)]">
              Organizations
            </h1>
            <p className="mt-1 text-base text-[var(--text-secondary)]">
              Manage all organizations in your system
            </p>
          </div>

          <Button variant="primary" onClick={handleAddClick}>
            <PlusOutlined /> Add Organization
          </Button>
        </div>

        <Card className="mb-6 p-5">
          <div className="flex items-center gap-3">
            <SearchOutlined className="text-lg text-[var(--text-muted)]" />
            <Input
              placeholder="Search organizations..."
              className="flex-1"
            />
          </div>
        </Card>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {organizations.map((org) => (
            <Card
              key={org.id}
              className="p-6 transition hover:-translate-y-0.5"
            >
              <div className="mb-5 flex items-start justify-between">
                <div className="flex h-16 w-16 items-center justify-center rounded-[18px] bg-gradient-to-br from-fuchsia-500 to-blue-500 text-3xl font-bold text-white shadow-lg shadow-fuchsia-200">
                  {org.initials}
                </div>

                <div className="flex items-center gap-4 text-[18px] text-[#4b5563]">
                  <Button variant="ghost" size="sm" onClick={() => handleEditClick(org)}>
                    <EditOutlined />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreOutlined />
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDeleteClick({ id: org.id, name: org.name })}>
                    <DeleteOutlined />
                  </Button>
                </div>
              </div>

              <h3 className="mb-4 text-[34px] font-extrabold leading-tight tracking-tight text-[var(--text)]">
                {org.name}
              </h3>

              <div className="space-y-3 text-[15px] text-[var(--text-secondary)]">
                <div className="flex items-start gap-3">
                  <MailOutlined className="mt-1 text-[16px]" />
                  <span>{org.email}</span>
                </div>

                <div className="flex items-start gap-3">
                  <PhoneOutlined className="mt-1 text-[16px]" />
                  <span>{org.phone}</span>
                </div>

                <div className="flex items-start gap-3">
                  <EnvironmentOutlined className="mt-1 text-[16px]" />
                  <span>{org.address}</span>
                </div>
              </div>

              <div className="my-5 h-px bg-[var(--border)]" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6 text-[15px] font-semibold text-[var(--text-secondary)]">
                  <div className="flex items-center gap-2">
                    <TeamOutlined />
                    <span>{org.users}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <ApartmentOutlined />
                    <span>{org.branches}</span>
                  </div>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium capitalize ${statusClasses(
                    org.status
                  )}`}
                >
                  {org.status}
                </span>
              </div>
            </Card>
          ))}
        </div>

        <ConfirmModal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleDeleteConfirm}
          type="delete"
          title="Delete Organization"
          message={`Are you sure you want to delete ${selectedOrg?.name}?`}
          description="This action cannot be undone. All associated branches and users will be affected."
          confirmText="Delete"
          cancelText="Cancel"
        />

        <Modal
          isOpen={formModalOpen}
          onClose={() => setFormModalOpen(false)}
          title={editingOrg ? 'Edit Organization' : 'Add New Organization'}
          footer={
            <div className="flex justify-end gap-3">
              <Button variant="secondary" onClick={() => setFormModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleFormSubmit}>
                {editingOrg ? 'Update' : 'Create'}
              </Button>
            </div>
          }
          size="md"
        >
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-[var(--text)]">Organization Name</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., TechCorp Global"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-[var(--text)]">Email</label>
              <Input
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="e.g., contact@techcorp.com"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-[var(--text)]">Phone</label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="e.g., +1 (555) 100-2000"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-[var(--text)]">Address</label>
              <Input
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="e.g., 123 Tech Street, San Francisco, CA 94105"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-[var(--text)]">Status</label>
              <Select
                value={formData.status}
                onChange={(value) => setFormData({ ...formData, status: value })}
                options={[
                  { label: 'Active', value: 'active' },
                  { label: 'Pending', value: 'pending' },
                  { label: 'Inactive', value: 'inactive' },
                ]}
              />
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}