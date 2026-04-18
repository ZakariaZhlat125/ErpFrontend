'use client';

import { useState } from 'react';
import { Button, Input, ConfirmModal, Modal, Select } from '@/components/ui';
import { Card } from '@/components/ui/Card';
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  MoreOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  ClockCircleOutlined,
  ApartmentOutlined,
  UsergroupAddOutlined,
  DownOutlined,
  BranchesOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

const branches = [
  {
    id: 1,
    name: 'Downtown Office',
    organization: 'TechCorp Global',
    address: '123 Main St, San Francisco, CA 94105',
    phone: '+1 (555) 100-1001',
    hours: 'Mon-Fri 9AM-6PM',
    manager: 'Sarah Johnson',
    employees: 45,
    status: 'active',
  },
  {
    id: 2,
    name: 'North Branch',
    organization: 'TechCorp Global',
    address: '456 North Ave, San Francisco, CA 94110',
    phone: '+1 (555) 100-1002',
    hours: 'Mon-Fri 8AM-5PM',
    manager: 'Michael Chen',
    employees: 32,
    status: 'active',
  },
  {
    id: 3,
    name: 'Innovation Hub',
    organization: 'Innovation Labs',
    address: '789 Innovation Blvd, New York, NY 10001',
    phone: '+1 (555) 200-2001',
    hours: 'Mon-Sat 10AM-7PM',
    manager: 'Emma Davis',
    employees: 28,
    status: 'active',
  },
  {
    id: 4,
    name: 'East Campus',
    organization: 'Digital Solutions Inc',
    address: '321 East St, Austin, TX 78701',
    phone: '+1 (555) 300-3001',
    hours: 'Mon-Fri 9AM-6PM',
    manager: 'James Wilson',
    employees: 19,
    status: 'maintenance',
  },
];

function getStatusClasses(status: string) {
  switch (status) {
    case 'active':
      return 'bg-emerald-100 text-emerald-700';
    case 'maintenance':
      return 'bg-amber-100 text-amber-700';
    case 'inactive':
      return 'bg-slate-100 text-slate-600';
    default:
      return 'bg-slate-100 text-slate-600';
  }
}

export  function Branches() {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<{ id: number; name: string } | null>(null);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState<typeof branches[0] | null>(null);
  const [formData, setFormData] = useState({ name: '', organization: '', address: '', phone: '', hours: '', manager: '', status: 'active' });

  const handleDeleteClick = (branch: { id: number; name: string }) => {
    setSelectedBranch(branch);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    console.log('Deleting branch:', selectedBranch);
    // Perform delete action here
    setDeleteModalOpen(false);
    setSelectedBranch(null);
  };

  const handleAddClick = () => {
    setEditingBranch(null);
    setFormData({ name: '', organization: '', address: '', phone: '', hours: '', manager: '', status: 'active' });
    setFormModalOpen(true);
  };

  const handleEditClick = (branch: typeof branches[0]) => {
    setEditingBranch(branch);
    setFormData({ name: branch.name, organization: branch.organization, address: branch.address, phone: branch.phone, hours: branch.hours, manager: branch.manager, status: branch.status });
    setFormModalOpen(true);
  };

  const handleFormSubmit = () => {
    console.log('Saving branch:', formData);
    // Perform save action here
    setFormModalOpen(false);
    setFormData({ name: '', organization: '', address: '', phone: '', hours: '', manager: '', status: 'active' });
  };

  return (
    <div className="min-h-screen bg-[var(--background)] p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-[var(--text)]">
              Branches
            </h1>
            <p className="mt-1 text-base text-[var(--text-secondary)]">
              Manage all branch locations across organizations
            </p>
          </div>

          <Button variant="primary" onClick={handleAddClick}>
            <PlusOutlined /> Add Branch
          </Button>
        </div>

        <Card className="mb-6 p-5">
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="flex flex-1 items-center gap-3">
              <SearchOutlined className="text-lg text-[var(--text-muted)]" />
              <Input placeholder="Search branches..." className="flex-1" />
            </div>

            <Button variant="secondary" className="min-w-[210px]">
              All Organizations <DownOutlined className="text-xs" />
            </Button>
          </div>
        </Card>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          {branches.map((branch) => (
            <Card key={branch.id} className="p-6 transition hover:-translate-y-0.5">
              <div className="mb-5 flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 text-xl text-white shadow-[0_8px_18px_rgba(249,115,22,0.28)]">
                    <BranchesOutlined />
                  </div>

                  <div>
                    <h3 className="text-[19px] font-extrabold leading-tight text-[var(--text)]">
                      {branch.name}
                    </h3>

                    <div className="mt-1 flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                      <ApartmentOutlined className="text-[13px]" />
                      <span>{branch.organization}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-[18px] text-[#4b5563]">
                  <Button variant="ghost" size="sm" onClick={() => handleEditClick(branch)}><EditOutlined /></Button>
                  <Button variant="ghost" size="sm"><MoreOutlined /></Button>
                  <Button variant="danger" size="sm" onClick={() => handleDeleteClick({ id: branch.id, name: branch.name })}><DeleteOutlined /></Button>
                </div>
              </div>

              <div className="space-y-3 text-[15px] text-[var(--text-secondary)]">
                <div className="flex items-start gap-3">
                  <EnvironmentOutlined className="mt-1 text-[15px]" />
                  <span>{branch.address}</span>
                </div>

                <div className="flex items-start gap-3">
                  <PhoneOutlined className="mt-1 text-[15px]" />
                  <span>{branch.phone}</span>
                </div>

                <div className="flex items-start gap-3">
                  <ClockCircleOutlined className="mt-1 text-[15px]" />
                  <span>{branch.hours}</span>
                </div>
              </div>

              <div className="my-5 h-px bg-[var(--border)]" />

              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="mb-1 text-sm text-[var(--text-secondary)]">
                    Branch Manager
                  </p>
                  <p className="text-xl font-bold text-[var(--text)]">
                    {branch.manager}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center gap-2 rounded-xl bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-700">
                    <UsergroupAddOutlined />
                    {branch.employees}
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium capitalize ${getStatusClasses(
                      branch.status
                    )}`}
                  >
                    {branch.status}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <ConfirmModal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleDeleteConfirm}
          type="delete"
          title="Delete Branch"
          message={`Are you sure you want to delete ${selectedBranch?.name}?`}
          description="This action cannot be undone. All associated employees and data will be affected."
          confirmText="Delete"
          cancelText="Cancel"
        />

        <Modal
          isOpen={formModalOpen}
          onClose={() => setFormModalOpen(false)}
          title={editingBranch ? 'Edit Branch' : 'Add New Branch'}
          footer={
            <div className="flex justify-end gap-3">
              <Button variant="secondary" onClick={() => setFormModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleFormSubmit}>
                {editingBranch ? 'Update' : 'Create'}
              </Button>
            </div>
          }
          size="md"
        >
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-[var(--text)]">Branch Name</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Downtown Office"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-[var(--text)]">Organization</label>
              <Input
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                placeholder="e.g., TechCorp Global"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-[var(--text)]">Address</label>
              <Input
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="e.g., 123 Main St, San Francisco, CA 94105"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-[var(--text)]">Phone</label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="e.g., +1 (555) 100-1001"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-[var(--text)]">Business Hours</label>
              <Input
                value={formData.hours}
                onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                placeholder="e.g., Mon-Fri 9AM-6PM"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-[var(--text)]">Manager</label>
              <Input
                value={formData.manager}
                onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                placeholder="e.g., Sarah Johnson"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-[var(--text)]">Status</label>
              <Select
                value={formData.status}
                onChange={(value) => setFormData({ ...formData, status: value })}
                options={[
                  { label: 'Active', value: 'active' },
                  { label: 'Maintenance', value: 'maintenance' },
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