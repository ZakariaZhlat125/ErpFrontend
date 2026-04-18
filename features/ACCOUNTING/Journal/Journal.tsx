'use client';

import { useState } from 'react';
import { Button, Input, ConfirmModal } from '@/components/ui';
import { Card } from '@/components/ui/Card';
import {
  PlusOutlined,
  SearchOutlined,
  FilterOutlined,
  DownOutlined,
  BookOutlined,
  DollarOutlined,
  CalendarOutlined,
  FileTextOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

const stats = [
  { label: 'Total Entries', value: '284', note: 'This year', bg: 'from-sky-500 to-cyan-500', icon: <BookOutlined />, valueClass: 'text-[var(--text)]' },
  { label: 'Total Debits', value: '$1,245,820', note: '', bg: 'from-emerald-500 to-green-500', icon: <DollarOutlined />, valueClass: 'text-emerald-600' },
  { label: 'Total Credits', value: '$1,245,820', note: '', bg: 'from-violet-500 to-pink-500', icon: <DollarOutlined />, valueClass: 'text-violet-600' },
];

const lines = [
  { code: '1110', account: 'Cash', debit: '$15,420.5', credit: '-', debitClass: 'text-emerald-600', creditClass: 'text-[var(--text-secondary)]' },
  { code: '1120', account: 'Accounts Receivable', debit: '-', credit: '$15,420.5', debitClass: 'text-[var(--text-secondary)]', creditClass: 'text-red-600' },
];

export default function Journal() {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<{ id: string; description: string } | null>(null);

  const handleDeleteClick = (entry: { id: string; description: string }) => {
    setSelectedEntry(entry);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    console.log('Deleting journal entry:', selectedEntry);
    // Perform delete action here
    setDeleteModalOpen(false);
    setSelectedEntry(null);
  };

  return (
    <div className="min-h-screen bg-[var(--background)] p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-[var(--text)]">Journal Entries</h1>
            <p className="mt-1 text-base text-[var(--text-secondary)]">
              Record and manage accounting journal entries
            </p>
          </div>

          <Button variant="primary">
            <PlusOutlined /> New Entry
          </Button>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {stats.map((stat) => (
            <Card key={stat.label} className="p-6">
              <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${stat.bg} text-xl text-white`}>
                {stat.icon}
              </div>
              <p className="text-[15px] text-[var(--text-secondary)]">{stat.label}</p>
              <p className={`mt-2 text-4xl font-extrabold ${stat.valueClass}`}>{stat.value}</p>
              {stat.note && <p className="mt-1 text-sm text-[var(--text-secondary)]">{stat.note}</p>}
            </Card>
          ))}
        </div>

        <Card className="mb-6 p-5">
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="flex flex-1 items-center gap-3">
              <SearchOutlined className="text-[var(--text-muted)]" />
              <Input placeholder="Search journal entries..." className="flex-1" />
            </div>
            <Button variant="secondary" className="min-w-[140px]">
              All Status <DownOutlined className="text-xs" />
            </Button>
            <Button variant="ghost" size="sm">
              <FilterOutlined />
            </Button>
          </div>
        </Card>

        <Card className="overflow-hidden">
          <div className="border-b border-[var(--border)] p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-blue-500 text-2xl text-white">
                  <BookOutlined />
                </div>
                <div>
                  <div className="mb-2 flex items-center gap-3">
                    <h3 className="font-mono text-[28px] font-extrabold text-[var(--text)]">JE-2026-001</h3>
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">posted</span>
                  </div>
                  <p className="text-[16px] text-[var(--text-secondary)]">Payment received from Acme Corporation</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-[15px] text-[var(--text-secondary)]">
                <div className="flex items-center gap-2"><CalendarOutlined /> 15/04/2026</div>
                <div className="flex items-center gap-2 text-violet-600"><FileTextOutlined /> PAY-2026-001</div>
              </div>

              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm"><EditOutlined /></Button>
                <Button variant="danger" size="sm" onClick={() => handleDeleteClick({ id: 'JE-2026-001', description: 'Payment received from Acme Corporation' })}><DeleteOutlined /></Button>
              </div>
            </div>
          </div>

          <div className="hidden grid-cols-4 border-b border-[var(--border)] bg-[#fafafa] px-6 py-4 text-sm font-semibold uppercase tracking-wide text-[var(--text-secondary)] md:grid">
            <div>Account Code</div>
            <div>Account Name</div>
            <div>Debit</div>
            <div>Credit</div>
          </div>

          {lines.map((line) => (
            <div key={line.code} className="grid gap-4 border-b border-[var(--border)] px-6 py-5 md:grid-cols-4 md:items-center">
              <div className="font-mono text-[var(--text)]">{line.code}</div>
              <div className="text-xl font-bold text-[var(--text)]">{line.account}</div>
              <div className={`text-[22px] font-extrabold ${line.debitClass}`}>{line.debit}</div>
              <div className={`text-[22px] font-extrabold ${line.creditClass}`}>{line.credit}</div>
            </div>
          ))}
        </Card>

        <ConfirmModal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleDeleteConfirm}
          type="delete"
          title="Delete Journal Entry"
          message={`Are you sure you want to delete journal entry ${selectedEntry?.id}?`}
          description={`Description: ${selectedEntry?.description}`}
          confirmText="Delete"
          cancelText="Cancel"
        />
      </div>
    </div>
  );
}