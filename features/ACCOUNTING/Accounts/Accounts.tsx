
'use client';

import { useState } from 'react';
import { Button, ConfirmModal, Modal, Input, Select } from '@/components/ui';
import { Card } from '@/components/ui/Card';
import {
  PlusOutlined,
  DollarOutlined,
  EditOutlined,
  DeleteOutlined,
  BellOutlined,
  CaretDownOutlined,
  CaretRightOutlined,
} from '@ant-design/icons';

const topCards = [
  { label: 'Assets', value: '$250,000', bg: 'from-sky-500 to-cyan-500' },
  { label: 'Liabilities', value: '$100,000', bg: 'from-pink-500 to-rose-500' },
  { label: 'Equity', value: '$150,000', bg: 'from-violet-500 to-indigo-500' },
  { label: 'Revenue', value: '$500,000', bg: 'from-emerald-500 to-green-500' },
  { label: 'Expenses', value: '$300,000', bg: 'from-amber-500 to-orange-500' },
];

const accounts = [
  { code: '1000', name: 'Assets', type: 'asset', value: 'USD 250,000', level: 0, expanded: true, color: 'sky' },
  { code: '1100', name: 'Current Assets', type: 'asset', value: 'USD 150,000', level: 1, expanded: true, color: 'sky' },
  { code: '1110', name: 'Cash', type: 'asset', value: 'USD 50,000', level: 2, expanded: false, color: 'sky' },
  { code: '1120', name: 'Accounts Receivable', type: 'asset', value: 'USD 75,000', level: 2, expanded: false, color: 'sky' },
  { code: '1130', name: 'Inventory', type: 'asset', value: 'USD 25,000', level: 2, expanded: false, color: 'sky' },
  { code: '1200', name: 'Fixed Assets', type: 'asset', value: 'USD 100,000', level: 1, expanded: false, color: 'sky' },
  { code: '2000', name: 'Liabilities', type: 'liability', value: 'USD 100,000', level: 0, expanded: true, color: 'pink' },
  { code: '2100', name: 'Current Liabilities', type: 'liability', value: 'USD 60,000', level: 1, expanded: false, color: 'pink' },
];

function tagClass(type: string) {
  return type === 'asset'
    ? 'bg-blue-100 text-blue-700'
    : 'bg-red-100 text-red-600';
}

function amountClass(type: string) {
  return type === 'liability' ? 'text-red-600' : 'text-emerald-600';
}

function iconBg(color: string) {
  if (color === 'pink') return 'from-pink-500 to-rose-500';
  return 'from-sky-500 to-cyan-500';
}

export function Accounts() {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<{ code: string; name: string } | null>(null);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<typeof accounts[0] | null>(null);
  const [formData, setFormData] = useState({ code: '', name: '', type: 'asset', value: '' });

  const handleDeleteClick = (account: { code: string; name: string }) => {
    setSelectedAccount(account);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    console.log('Deleting account:', selectedAccount);
    // Perform delete action here
    setDeleteModalOpen(false);
    setSelectedAccount(null);
  };

  const handleAddClick = () => {
    setEditingAccount(null);
    setFormData({ code: '', name: '', type: 'asset', value: '' });
    setFormModalOpen(true);
  };

  const handleEditClick = (account: typeof accounts[0]) => {
    setEditingAccount(account);
    setFormData({ code: account.code, name: account.name, type: account.type, value: account.value });
    setFormModalOpen(true);
  };

  const handleFormSubmit = () => {
    console.log('Saving account:', formData);
    // Perform save action here
    setFormModalOpen(false);
    setFormData({ code: '', name: '', type: 'asset', value: '' });
  };

  return (
    <div className="min-h-screen bg-[var(--background)] p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-[var(--text)]">Accounts Tree</h1>
            <p className="mt-1 text-base text-[var(--text-secondary)]">
              Hierarchical chart of accounts structure
            </p>
          </div>

          <Button variant="primary" onClick={handleAddClick}>
            <PlusOutlined /> Add Account
          </Button>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
          {topCards.map((card) => (
            <Card key={card.label} className="p-5">
              <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${card.bg} text-xl text-white`}>
                <DollarOutlined />
              </div>
              <p className="text-[15px] text-[var(--text-secondary)]">{card.label}</p>
              <p className="mt-2 text-3xl font-extrabold text-[var(--text)]">{card.value}</p>
            </Card>
          ))}
        </div>

        <Card className="overflow-hidden">
          <div className="flex items-center gap-3 border-b border-[var(--border)] px-6 py-5">
            <BellOutlined className="text-lg text-fuchsia-600" />
            <h2 className="text-[32px] font-extrabold text-[var(--text)]">Chart of Accounts</h2>
          </div>

          {accounts.map((account, index) => (
            <div
              key={`${account.code}-${index}`}
              className="flex items-center justify-between border-b border-[var(--border)] px-6 py-4 last:border-b-0"
            >
              <div
                className="flex items-center gap-4"
                style={{ paddingLeft: `${account.level * 28}px` }}
              >
                <Button variant="ghost" size="sm">
                  {account.expanded ? <CaretDownOutlined /> : <CaretRightOutlined />}
                </Button>

                <div className={`flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br ${iconBg(account.color)} text-white`}>
                  <DollarOutlined />
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-[18px] text-[var(--text-secondary)]">{account.code}</span>
                  <span className="text-[18px] font-extrabold text-[var(--text)]">{account.name}</span>
                  <span className={`rounded-md px-2 py-1 text-xs font-bold ${tagClass(account.type)}`}>
                    {account.type}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <span className={`text-[18px] font-extrabold ${amountClass(account.type)}`}>
                  {account.value}
                </span>

                <div className="flex items-center gap-4 text-lg">
                  <Button variant="ghost" size="sm" onClick={() => handleEditClick(account)}><EditOutlined /></Button>
                  <Button variant="danger" size="sm" onClick={() => handleDeleteClick({ code: account.code, name: account.name })}><DeleteOutlined /></Button>
                </div>
              </div>
            </div>
          ))}
        </Card>

        <ConfirmModal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleDeleteConfirm}
          type="delete"
          title="Delete Account"
          message={`Are you sure you want to delete account ${selectedAccount?.code} - ${selectedAccount?.name}?`}
          description="This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
        />

        <Modal
          isOpen={formModalOpen}
          onClose={() => setFormModalOpen(false)}
          title={editingAccount ? 'Edit Account' : 'Add New Account'}
          footer={
            <div className="flex justify-end gap-3">
              <Button variant="secondary" onClick={() => setFormModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleFormSubmit}>
                {editingAccount ? 'Update' : 'Create'}
              </Button>
            </div>
          }
          size="md"
        >
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-[var(--text)]">Account Code</label>
              <Input
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                placeholder="e.g., 1000"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-[var(--text)]">Account Name</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Cash"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-[var(--text)]">Account Type</label>
              <Select
                value={formData.type}
                onChange={(value) => setFormData({ ...formData, type: value })}
                options={[
                  { label: 'Asset', value: 'asset' },
                  { label: 'Liability', value: 'liability' },
                  { label: 'Equity', value: 'equity' },
                  { label: 'Revenue', value: 'revenue' },
                  { label: 'Expense', value: 'expense' },
                ]}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-[var(--text)]">Initial Value</label>
              <Input
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                placeholder="e.g., USD 50,000"
              />
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}