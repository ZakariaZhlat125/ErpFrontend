'use client';

import { useState } from 'react';
import { Button, Input, ConfirmModal, Modal, Select } from '@/components/ui';
import { Card } from '@/components/ui/Card';
import {
  PlusOutlined,
  SearchOutlined,
  DownOutlined,
  FilterOutlined,
  EditOutlined,
  MoreOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  UserOutlined,
  ShopOutlined,
  DollarOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

const statCards = [
  { label: 'Customers', value: '45', bg: 'from-sky-500 to-cyan-500', icon: <UserOutlined />, valueClass: 'text-[var(--text)]' },
  { label: 'Suppliers', value: '28', bg: 'from-orange-500 to-red-500', icon: <ShopOutlined />, valueClass: 'text-[var(--text)]' },
  { label: 'Receivables', value: '$45,280', bg: 'from-emerald-500 to-green-500', icon: <DollarOutlined />, valueClass: 'text-emerald-600' },
  { label: 'Payables', value: '$21,250', bg: 'from-fuchsia-500 to-pink-500', icon: <DollarOutlined />, valueClass: 'text-red-600' },
];

const parties = [
  {
    id: 1,
    name: 'Acme Corporation',
    type: 'customer',
    email: 'contact@acme.com',
    phone: '+1 (555) 100-1000',
    address: '123 Business St, New York, NY 10001',
    taxId: 'TAX-001-2026',
    balance: '+USD 15,420.5',
    balanceClass: 'text-emerald-600',
    status: 'active',
    iconBg: 'from-sky-500 to-cyan-500',
  },
  {
    id: 2,
    name: 'Global Suppliers Ltd',
    type: 'supplier',
    email: 'sales@globalsuppliers.com',
    phone: '+1 (555) 200-2000',
    address: '456 Supply Ave, Los Angeles, CA 90001',
    taxId: 'TAX-002-2026',
    balance: 'USD 8,750',
    balanceClass: 'text-red-600',
    status: 'active',
    iconBg: 'from-orange-500 to-red-500',
  },
];

function typeClass(type: string) {
  return type === 'customer'
    ? 'bg-blue-100 text-blue-700'
    : 'bg-orange-100 text-orange-700';
}

export function Parties() {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedParty, setSelectedParty] = useState<{ id: number; name: string } | null>(null);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editingParty, setEditingParty] = useState<typeof parties[0] | null>(null);
  const [formData, setFormData] = useState({ name: '', type: 'customer', email: '', phone: '', address: '', taxId: '' });

  const handleDeleteClick = (party: { id: number; name: string }) => {
    setSelectedParty(party);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    console.log('Deleting party:', selectedParty);
    // Perform delete action here
    setDeleteModalOpen(false);
    setSelectedParty(null);
  };

  const handleAddClick = () => {
    setEditingParty(null);
    setFormData({ name: '', type: 'customer', email: '', phone: '', address: '', taxId: '' });
    setFormModalOpen(true);
  };

  const handleEditClick = (party: typeof parties[0]) => {
    setEditingParty(party);
    setFormData({ name: party.name, type: party.type, email: party.email, phone: party.phone, address: party.address, taxId: party.taxId });
    setFormModalOpen(true);
  };

  const handleFormSubmit = () => {
    console.log('Saving party:', formData);
    // Perform save action here
    setFormModalOpen(false);
    setFormData({ name: '', type: 'customer', email: '', phone: '', address: '', taxId: '' });
  };

  return (
    <div className="min-h-screen bg-[var(--background)] p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-[var(--text)]">Parties</h1>
            <p className="mt-1 text-base text-[var(--text-secondary)]">
              Manage customers, suppliers, and business partners
            </p>
          </div>

          <Button variant="primary" onClick={handleAddClick}>
            <PlusOutlined /> Add Party
          </Button>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {statCards.map((card) => (
            <Card key={card.label} className="p-6">
              <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${card.bg} text-xl text-white`}>
                {card.icon}
              </div>
              <p className="text-[15px] text-[var(--text-secondary)]">{card.label}</p>
              <p className={`mt-2 text-4xl font-extrabold ${card.valueClass}`}>{card.value}</p>
            </Card>
          ))}
        </div>

        <Card className="mb-6 p-5">
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="flex flex-1 items-center gap-3">
              <SearchOutlined className="text-[var(--text-muted)]" />
              <Input placeholder="Search parties..." className="flex-1" />
            </div>

            <Button variant="secondary" className="min-w-[130px]">
              All Types <DownOutlined className="text-xs" />
            </Button>

            <Button variant="secondary">
              <FilterOutlined /> More Filters
            </Button>
          </div>
        </Card>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          {parties.map((party) => (
            <Card key={party.id} className="p-6">
              <div className="mb-5 flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${party.iconBg} text-xl text-white`}>
                    <UserOutlined />
                  </div>

                  <div>
                    <h3 className="text-[20px] font-extrabold text-[var(--text)]">{party.name}</h3>
                    <span className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-bold capitalize ${typeClass(party.type)}`}>
                      {party.type}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-lg text-[var(--text-secondary)]">
                  <Button variant="ghost" size="sm" onClick={() => handleEditClick(party)}><EditOutlined /></Button>
                  <Button variant="ghost" size="sm"><MoreOutlined /></Button>
                  <Button variant="danger" size="sm" onClick={() => handleDeleteClick({ id: party.id, name: party.name })}><DeleteOutlined /></Button>
                </div>
              </div>

              <div className="space-y-3 text-[15px] text-[var(--text-secondary)]">
                <div className="flex items-start gap-3">
                  <MailOutlined className="mt-1" />
                  <span>{party.email}</span>
                </div>
                <div className="flex items-start gap-3">
                  <PhoneOutlined className="mt-1" />
                  <span>{party.phone}</span>
                </div>
                <div className="flex items-start gap-3">
                  <EnvironmentOutlined className="mt-1" />
                  <span>{party.address}</span>
                </div>
              </div>

              <div className="my-5 h-px bg-[var(--border)]" />

              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm text-[var(--text-secondary)]">Tax ID</p>
                  <p className="mt-1 text-lg font-extrabold text-[var(--text)]">{party.taxId}</p>
                </div>

                <div className="text-center">
                  <p className="text-sm text-[var(--text-secondary)]">Balance</p>
                  <p className={`mt-1 text-[20px] font-extrabold ${party.balanceClass}`}>{party.balance}</p>
                </div>

                <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">
                  {party.status}
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
          title="Delete Party"
          message={`Are you sure you want to delete ${selectedParty?.name}?`}
          description="This action cannot be undone. All associated invoices and transactions will be affected."
          confirmText="Delete"
          cancelText="Cancel"
        />

        <Modal
          isOpen={formModalOpen}
          onClose={() => setFormModalOpen(false)}
          title={editingParty ? 'Edit Party' : 'Add New Party'}
          footer={
            <div className="flex justify-end gap-3">
              <Button variant="secondary" onClick={() => setFormModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleFormSubmit}>
                {editingParty ? 'Update' : 'Create'}
              </Button>
            </div>
          }
          size="md"
        >
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-[var(--text)]">Party Name</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Acme Corporation"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-[var(--text)]">Party Type</label>
              <Select
                value={formData.type}
                onChange={(value) => setFormData({ ...formData, type: value })}
                options={[
                  { label: 'Customer', value: 'customer' },
                  { label: 'Supplier', value: 'supplier' },
                ]}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-[var(--text)]">Email</label>
              <Input
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="e.g., contact@acme.com"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-[var(--text)]">Phone</label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="e.g., +1 (555) 100-1000"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-[var(--text)]">Address</label>
              <Input
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="e.g., 123 Business St, New York, NY 10001"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-[var(--text)]">Tax ID</label>
              <Input
                value={formData.taxId}
                onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
                placeholder="e.g., TAX-001-2026"
              />
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}