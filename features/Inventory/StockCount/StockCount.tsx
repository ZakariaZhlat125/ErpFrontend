'use client';

import {
  PlusOutlined,
  SearchOutlined,
  FilterOutlined,
  DownOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  FileTextOutlined,
  CalendarOutlined,
  UserOutlined,
  HomeOutlined,
  InboxOutlined,
} from '@ant-design/icons';

const stats = [
  { label: 'Draft', value: '3', icon: <FileTextOutlined />, bg: 'from-slate-500 to-slate-700', valueClass: 'text-[var(--text)]' },
  { label: 'In Progress', value: '5', icon: <ClockCircleOutlined />, bg: 'from-amber-500 to-orange-500', valueClass: 'text-amber-600' },
  { label: 'Completed', value: '12', icon: <CheckCircleOutlined />, bg: 'from-sky-500 to-blue-500', valueClass: 'text-blue-600' },
  { label: 'Approved', value: '48', icon: <CheckCircleOutlined />, bg: 'from-emerald-500 to-green-500', valueClass: 'text-emerald-600' },
];

const items = [
  { product: 'Laptop Computer', sku: 'PRD-001', systemQty: '45 pcs', countedQty: '45 pcs', diff: '0 pcs', diffClass: 'text-emerald-600' },
  { product: 'Wireless Mouse', sku: 'PRD-002', systemQty: '150 pcs', countedQty: '148 pcs', diff: '-2 pcs', diffClass: 'text-red-600' },
  { product: 'Office Desk', sku: 'PRD-003', systemQty: '8 pcs', countedQty: '10 pcs', diff: '+2 pcs', diffClass: 'text-blue-600' },
];

export function StockCount() {
  return (
    <div className="min-h-screen bg-[var(--background)] p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-[var(--text)]">Stock Count</h1>
            <p className="mt-1 text-base text-[var(--text-secondary)]">
              Perform physical inventory counts and reconciliation
            </p>
          </div>

          <button className="inline-flex h-11 items-center gap-2 rounded-2xl bg-gradient-to-r from-fuchsia-600 to-blue-500 px-5 font-semibold text-white shadow-[0_8px_20px_rgba(99,102,241,0.28)]">
            <PlusOutlined />
            New Count
          </button>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-[22px] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[0_8px_24px_rgba(15,23,42,0.05)]">
              <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${stat.bg} text-xl text-white`}>
                {stat.icon}
              </div>
              <p className="text-[15px] text-[var(--text-secondary)]">{stat.label}</p>
              <p className={`mt-2 text-4xl font-extrabold ${stat.valueClass}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="mb-6 rounded-[24px] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[0_8px_24px_rgba(15,23,42,0.05)]">
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="flex h-14 flex-1 items-center gap-3 rounded-2xl bg-[#f3f4f6] px-5">
              <SearchOutlined className="text-[var(--text-muted)]" />
              <input placeholder="Search stock counts..." className="h-full w-full bg-transparent outline-none placeholder:text-[var(--text-muted)]" />
            </div>

            <button className="flex h-14 min-w-[140px] items-center justify-between rounded-2xl bg-[#f3f4f6] px-5 font-medium text-[var(--text)]">
              All Status <DownOutlined className="text-xs" />
            </button>

            <button className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f3f4f6] text-lg text-[var(--text-secondary)]">
              <FilterOutlined />
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-[24px] border border-[var(--border)] bg-[var(--surface)] shadow-[0_8px_24px_rgba(15,23,42,0.05)]">
          <div className="border-b border-[var(--border)] p-6">
            <div className="mb-3 flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-blue-500 text-2xl text-white">
                  <FileTextOutlined />
                </div>

                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-mono text-[28px] font-extrabold text-[var(--text)]">SC-2026-001</h3>
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">completed</span>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-6 text-[15px] text-[var(--text-secondary)]">
                    <div className="flex items-center gap-2"><HomeOutlined /> Main Warehouse</div>
                    <div className="flex items-center gap-2"><UserOutlined /> John Smith</div>
                    <div className="flex items-center gap-2"><CalendarOutlined /> 16/04/2026</div>
                  </div>
                </div>
              </div>

              <button className="rounded-2xl bg-emerald-600 px-5 py-2 font-semibold text-white">Approve</button>
            </div>

            <p className="text-[15px] text-[var(--text-secondary)]">Note: Quarterly stock count</p>
          </div>

          <div className="hidden grid-cols-5 border-b border-[var(--border)] bg-[#fafafa] px-6 py-4 text-sm font-semibold uppercase tracking-wide text-[var(--text-secondary)] md:grid">
            <div>Product</div>
            <div>SKU</div>
            <div>System Qty</div>
            <div>Counted Qty</div>
            <div>Difference</div>
          </div>

          {items.map((item) => (
            <div key={item.sku} className="grid gap-4 border-b border-[var(--border)] px-6 py-5 last:border-b-0 md:grid-cols-5 md:items-center">
              <div className="flex items-center gap-3 font-semibold text-[var(--text)]">
                <InboxOutlined className="text-[var(--text-muted)]" />
                {item.product}
              </div>
              <div className="text-[var(--text-secondary)]">{item.sku}</div>
              <div className="text-[18px] text-[var(--text)]">{item.systemQty}</div>
              <div className="text-[18px] text-[var(--text)]">{item.countedQty}</div>
              <div className={`text-[22px] font-extrabold ${item.diffClass}`}>{item.diff}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}