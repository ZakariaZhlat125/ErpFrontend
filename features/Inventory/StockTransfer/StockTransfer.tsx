'use client';

import {
  PlusOutlined,
  SearchOutlined,
  FilterOutlined,
  DownOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  SwapOutlined,
  InboxOutlined,
  CalendarOutlined,
  UserOutlined,
  ShopOutlined,
} from '@ant-design/icons';

const stats = [
  { label: 'Pending', value: '12', bg: 'from-amber-500 to-orange-500', icon: <ClockCircleOutlined />, valueClass: 'text-amber-600' },
  { label: 'In Transit', value: '8', bg: 'from-sky-500 to-cyan-500', icon: <SwapOutlined />, valueClass: 'text-blue-600' },
  { label: 'Completed', value: '156', bg: 'from-emerald-500 to-green-500', icon: <CheckCircleOutlined />, valueClass: 'text-emerald-600' },
  { label: 'Total Items', value: '1,245', bg: 'from-violet-500 to-pink-500', icon: <InboxOutlined />, valueClass: 'text-violet-600' },
];

export function StockTransfer() {
  return (
    <div className="min-h-screen bg-[var(--background)] p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-[var(--text)]">Stock Transfer</h1>
            <p className="mt-1 text-base text-[var(--text-secondary)]">
              Manage stock movements between warehouses
            </p>
          </div>

          <button className="inline-flex h-11 items-center gap-2 rounded-2xl bg-gradient-to-r from-fuchsia-600 to-blue-500 px-5 font-semibold text-white">
            <PlusOutlined />
            New Transfer
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

        <div className="mb-6 rounded-[24px] border border-[var(--border)] bg-[var(--surface)] p-5">
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="flex h-14 flex-1 items-center gap-3 rounded-2xl bg-[#f3f4f6] px-5">
              <SearchOutlined className="text-[var(--text-muted)]" />
              <input placeholder="Search transfers..." className="h-full w-full bg-transparent outline-none" />
            </div>
            <button className="flex h-14 min-w-[130px] items-center justify-between rounded-2xl bg-[#f3f4f6] px-5">
              All Status <DownOutlined className="text-xs" />
            </button>
            <button className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f3f4f6]">
              <FilterOutlined />
            </button>
          </div>
        </div>

        <div className="rounded-[24px] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[0_8px_24px_rgba(15,23,42,0.05)]">
          <div className="mb-5 flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-blue-500 text-2xl text-white">
              <SwapOutlined />
            </div>

            <div className="flex-1">
              <div className="mb-2 flex items-center gap-3">
                <h3 className="font-mono text-[28px] font-extrabold text-[var(--text)]">ST-2026-001</h3>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">completed</span>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-[22px] font-bold text-[var(--text)]">Laptop Computer</p>
                  <p className="text-[var(--text-secondary)]">SKU: PRD-001</p>
                </div>

                <div>
                  <p className="text-sm text-[var(--text-secondary)]">Quantity</p>
                  <p className="text-[28px] font-extrabold text-[var(--text)]">15 pcs</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-5 grid gap-4 rounded-[20px] bg-[#f5f7fb] p-4 md:grid-cols-2">
            <div className="flex items-center gap-3">
              <ShopOutlined className="text-blue-600" />
              <div>
                <p className="text-sm text-[var(--text-secondary)]">From</p>
                <p className="text-xl font-bold text-[var(--text)]">Main Warehouse</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <SwapOutlined className="text-violet-600" />
              <div>
                <p className="text-sm text-[var(--text-secondary)]">To</p>
                <p className="text-xl font-bold text-[var(--text)]">East Coast Depot</p>
              </div>
            </div>
          </div>

          <div className="mb-3 flex flex-wrap gap-6 text-[15px] text-[var(--text-secondary)]">
            <div className="flex items-center gap-2"><UserOutlined /> Sarah Johnson</div>
            <div className="flex items-center gap-2"><CalendarOutlined /> Requested: 16/04/2026</div>
            <div className="flex items-center gap-2"><CheckCircleOutlined /> Transferred: 16/04/2026</div>
          </div>

          <p className="text-[15px] text-[var(--text-secondary)]">Note: Urgent transfer for large order</p>
        </div>
      </div>
    </div>
  );
}