'use client';

import { useState } from 'react';
import { Button, Input, ConfirmModal } from '@/components/ui';
import { Card } from '@/components/ui/Card';
import {
  PlusOutlined,
  SearchOutlined,
  FilterOutlined,
  DownOutlined,
  EyeOutlined,
  EditOutlined,
  SendOutlined,
  DownloadOutlined,
  CalendarOutlined,
  UserOutlined,
  FileTextOutlined,
  DollarOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

const summaryCards = [
  { label: 'Total Invoices', value: '156', icon: <FileTextOutlined />, iconBg: 'from-sky-500 to-cyan-500', valueClass: 'text-[var(--text)]' },
  { label: 'Paid', value: '$124,850', icon: <DollarOutlined />, iconBg: 'from-emerald-500 to-green-500', valueClass: 'text-emerald-600' },
  { label: 'Pending', value: '$48,471', icon: <DollarOutlined />, iconBg: 'from-amber-500 to-orange-500', valueClass: 'text-orange-500' },
  { label: 'Overdue', value: '$5,280', icon: <DollarOutlined />, iconBg: 'from-pink-500 to-rose-500', valueClass: 'text-red-600' },
];

const invoices = [
  {
    id: 'INV-2026-001',
    kind: 'sales',
    party: 'Acme Corporation',
    date: '10/04/2026',
    due: '10/05/2026',
    amount: 'USD 15,420.5',
    paid: 'USD 15,420.5',
    status: 'paid',
  },
  {
    id: 'INV-2026-002',
    kind: 'sales',
    party: 'Tech Distributors Inc',
    date: '12/04/2026',
    due: '12/05/2026',
    amount: 'USD 8,750',
    paid: 'USD 5,000',
    status: 'partial',
  },
  {
    id: 'BILL-2026-001',
    kind: 'purchase',
    party: 'Global Suppliers Ltd',
    date: '14/04/2026',
    due: '14/05/2026',
    amount: 'USD 12,340.75',
    paid: 'USD 0',
    status: 'sent',
  },
  {
    id: 'INV-2026-003',
    kind: 'sales',
    party: 'Premium Parts Co',
    date: '20/03/2026',
    due: '20/04/2026',
    amount: 'USD 5,280',
    paid: 'USD 0',
    status: 'overdue',
  },
];

function statusClass(status: string) {
  switch (status) {
    case 'paid':
      return 'bg-emerald-100 text-emerald-700';
    case 'partial':
      return 'bg-amber-100 text-amber-700';
    case 'sent':
      return 'bg-blue-100 text-blue-700';
    case 'overdue':
      return 'bg-red-100 text-red-600';
    default:
      return 'bg-slate-100 text-slate-600';
  }
}

function kindClass(kind: string) {
  return kind === 'sales'
    ? 'bg-blue-100 text-blue-700'
    : 'bg-purple-100 text-purple-700';
}

export  function Invoices() {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<{ id: string; party: string } | null>(null);

  const handleDeleteClick = (invoice: { id: string; party: string }) => {
    setSelectedInvoice(invoice);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    console.log('Deleting invoice:', selectedInvoice);
    // Perform delete action here
    setDeleteModalOpen(false);
    setSelectedInvoice(null);
  };

  return (
    <div className="min-h-screen bg-[var(--background)] p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-[var(--text)]">Invoices</h1>
            <p className="mt-1 text-base text-[var(--text-secondary)]">
              Manage sales and purchase invoices
            </p>
          </div>

          <Button variant="primary">
            <PlusOutlined /> Create Invoice
          </Button>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {summaryCards.map((card) => (
            <Card key={card.label} className="p-6">
              <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${card.iconBg} text-xl text-white`}>
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
              <Input
                placeholder="Search invoices..."
                className="flex-1"
              />
            </div>

            <Button variant="secondary" className="lg:min-w-[120px]">
              All Types <DownOutlined className="text-xs" />
            </Button>

            <Button variant="secondary" className="lg:min-w-[120px]">
              All Status <DownOutlined className="text-xs" />
            </Button>

            <Button variant="ghost" size="sm">
              <FilterOutlined />
            </Button>
          </div>
        </Card>

        <Card className="overflow-hidden">
          <div className="hidden grid-cols-8 border-b border-[var(--border)] bg-[#fafafa] px-6 py-4 text-sm font-semibold uppercase tracking-wide text-[var(--text-secondary)] lg:grid">
            <div>Invoice #</div>
            <div>Party</div>
            <div>Date</div>
            <div>Due Date</div>
            <div>Amount</div>
            <div>Paid</div>
            <div>Status</div>
            <div>Actions</div>
          </div>

          {invoices.map((invoice) => (
            <div
              key={invoice.id}
              className="grid gap-5 border-b border-[var(--border)] px-6 py-5 last:border-b-0 lg:grid-cols-8 lg:items-center"
            >
              <div>
                <p className="font-mono text-[18px] font-bold text-[var(--text)]">{invoice.id}</p>
                <span className={`mt-2 inline-block rounded-md px-2 py-1 text-xs font-bold ${kindClass(invoice.kind)}`}>
                  {invoice.kind}
                </span>
              </div>

              <div className="flex items-center gap-3 text-[var(--text)]">
                <UserOutlined className="text-[var(--text-secondary)]" />
                <span className="font-medium">{invoice.party}</span>
              </div>

              <div className="flex items-center gap-3 text-[var(--text-secondary)]">
                <CalendarOutlined />
                <span>{invoice.date}</span>
              </div>

              <div className="flex items-center gap-3 text-[var(--text-secondary)]">
                <CalendarOutlined />
                <span>{invoice.due}</span>
              </div>

              <div className="text-[20px] font-bold text-[var(--text)]">{invoice.amount}</div>
              <div className="text-[20px] font-bold text-emerald-600">{invoice.paid}</div>

              <div>
                <span className={`rounded-full px-3 py-1 text-sm font-semibold capitalize ${statusClass(invoice.status)}`}>
                  {invoice.status}
                </span>
              </div>

              <div className="flex items-center gap-4 text-lg">
                <Button variant="ghost" size="sm"><EyeOutlined /></Button>
                <Button variant="ghost" size="sm"><EditOutlined /></Button>
                <Button variant="ghost" size="sm"><SendOutlined /></Button>
                <Button variant="ghost" size="sm"><DownloadOutlined /></Button>
                <Button variant="danger" size="sm" onClick={() => handleDeleteClick({ id: invoice.id, party: invoice.party })}><DeleteOutlined /></Button>
              </div>
            </div>
          ))}
        </Card>

        <ConfirmModal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleDeleteConfirm}
          type="delete"
          title="Delete Invoice"
          message={`Are you sure you want to delete invoice ${selectedInvoice?.id} for ${selectedInvoice?.party}?`}
          description="This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
        />
      </div>
    </div>
  );
}