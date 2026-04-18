'use client';

import { useState } from 'react';
import { Button, Input, ConfirmModal } from '@/components/ui';
import { Card } from '@/components/ui/Card';
import {
  PlusOutlined,
  SearchOutlined,
  FilterOutlined,
  DownOutlined,
  DollarOutlined,
  CreditCardOutlined,
  ClockCircleOutlined,
  SwapOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  DownloadOutlined,
  UserOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

const stats = [
  { label: 'Received', value: '$32,420', note: 'This month', bg: 'from-emerald-500 to-green-500', icon: <DollarOutlined />, valueClass: 'text-emerald-600' },
  { label: 'Paid', value: '$11,950', note: '', bg: 'from-pink-500 to-rose-500', icon: <DollarOutlined />, valueClass: 'text-red-600' },
  { label: 'Pending', value: '$5,000', note: '', bg: 'from-amber-500 to-orange-500', icon: <ClockCircleOutlined />, valueClass: 'text-orange-600' },
  { label: 'Net Flow', value: '+$20,470', note: '', bg: 'from-sky-500 to-cyan-500', icon: <CreditCardOutlined />, valueClass: 'text-blue-600' },
];

const payments = [
  {
    id: 'PAY-2026-001',
    type: 'received',
    method: 'bank',
    party: 'Acme Corporation',
    date: '15/04/2026',
    ref: 'INV-2026-001',
    amount: '+USD 15,420.5',
    amountClass: 'text-emerald-600',
    iconBg: 'from-emerald-500 to-green-500',
  },
  {
    id: 'PAY-2026-002',
    type: 'paid',
    method: 'bank',
    party: 'Global Suppliers Ltd',
    date: '14/04/2026',
    ref: 'BILL-2026-001',
    amount: '-USD 8,750',
    amountClass: 'text-red-600',
    iconBg: 'from-pink-500 to-rose-500',
  },
];

export default function Payments() {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<{ id: string; party: string } | null>(null);

  const handleDeleteClick = (payment: { id: string; party: string }) => {
    setSelectedPayment(payment);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    console.log('Deleting payment:', selectedPayment);
    // Perform delete action here
    setDeleteModalOpen(false);
    setSelectedPayment(null);
  };

  return (
    <div className="min-h-screen bg-[var(--background)] p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-[var(--text)]">Payments</h1>
            <p className="mt-1 text-base text-[var(--text-secondary)]">
              Track all incoming and outgoing payments
            </p>
          </div>

          <Button variant="primary">
            <PlusOutlined /> Record Payment
          </Button>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
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
              <Input placeholder="Search payments..." className="flex-1" />
            </div>
            <Button variant="secondary" className="min-w-[120px]">All Types <DownOutlined className="text-xs" /></Button>
            <Button variant="secondary" className="min-w-[130px]">All Status <DownOutlined className="text-xs" /></Button>
            <Button variant="ghost" size="sm"><FilterOutlined /></Button>
          </div>
        </Card>

        <div className="space-y-4">
          {payments.map((payment) => (
            <Card key={payment.id} className="p-6">
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div className="flex items-start gap-4">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${payment.iconBg} text-2xl text-white`}>
                    <CreditCardOutlined />
                  </div>

                  <div>
                    <div className="mb-2 flex items-center gap-3">
                      <h3 className="font-mono text-[28px] font-extrabold text-[var(--text)]">{payment.id}</h3>
                      <span className={`rounded-full px-3 py-1 text-sm font-semibold ${payment.type === 'received' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'}`}>
                        {payment.type}
                      </span>
                      <span className="rounded-md bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">{payment.method}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-6 text-[15px] text-[var(--text-secondary)]">
                      <div className="flex items-center gap-2"><UserOutlined /> {payment.party}</div>
                      <div className="flex items-center gap-2"><CalendarOutlined /> {payment.date}</div>
                      <div className="flex items-center gap-2 text-violet-600"><SwapOutlined /> {payment.ref}</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  <div className={`text-4xl font-extrabold ${payment.amountClass}`}>{payment.amount}</div>
                  <Button variant="ghost" size="sm" className="text-emerald-600"><CheckCircleOutlined /></Button>
                  <Button variant="ghost" size="sm"><DownloadOutlined /></Button>
                  <Button variant="danger" size="sm" onClick={() => handleDeleteClick({ id: payment.id, party: payment.party })}><DeleteOutlined /></Button>
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
          title="Delete Payment"
          message={`Are you sure you want to delete payment ${selectedPayment?.id} from ${selectedPayment?.party}?`}
          description="This action cannot be undone. The payment record will be permanently removed."
          confirmText="Delete"
          cancelText="Cancel"
        />
      </div>
    </div>
  );
}