'use client';

import {
  DownloadOutlined,
  SearchOutlined,
  FilterOutlined,
  DownOutlined,
  InboxOutlined,
  DollarOutlined,
  WarningOutlined,
  RiseOutlined,
  ShopOutlined,
} from '@ant-design/icons';

const stats = [
  { label: 'Total Items', value: '5', bg: 'from-sky-500 to-cyan-500', icon: <InboxOutlined />, valueClass: 'text-[var(--text)]' },
  { label: 'Total Value', value: '$43,909.55', bg: 'from-violet-500 to-pink-500', icon: <DollarOutlined />, valueClass: 'text-violet-600' },
  { label: 'Low Stock', value: '2', bg: 'from-orange-500 to-red-500', icon: <WarningOutlined />, valueClass: 'text-orange-600' },
  { label: 'In Stock', value: '3', bg: 'from-emerald-500 to-green-500', icon: <RiseOutlined />, valueClass: 'text-emerald-600' },
];

const rows = [
  { product: 'Laptop Computer', sku: 'PRD-001', warehouse: 'Main Warehouse', qty: '25 pcs', value: 'USD 22,499.75', status: 'In Stock', statusClass: 'bg-emerald-100 text-emerald-700', updated: '16/04/2026' },
  { product: 'Laptop Computer', sku: 'PRD-001', warehouse: 'East Coast Depot', qty: '20 pcs', value: 'USD 17,999.8', status: 'In Stock', statusClass: 'bg-emerald-100 text-emerald-700', updated: '15/04/2026' },
  { product: 'Wireless Mouse', sku: 'PRD-002', warehouse: 'Main Warehouse', qty: '100 pcs', value: 'USD 1,500', status: 'In Stock', statusClass: 'bg-emerald-100 text-emerald-700', updated: '16/04/2026' },
  { product: 'Office Desk', sku: 'PRD-003', warehouse: 'Central Hub', qty: '5 pcs', value: 'USD 1,250', status: 'Low Stock', statusClass: 'bg-orange-100 text-orange-700', updated: '14/04/2026' },
];

export function StockBalances() {
  return (
    <div className="min-h-screen bg-[var(--background)] p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-[var(--text)]">Stock Balances</h1>
            <p className="mt-1 text-base text-[var(--text-secondary)]">
              View current inventory levels across all warehouses
            </p>
          </div>

          <button className="inline-flex h-11 items-center gap-2 rounded-2xl bg-gradient-to-r from-fuchsia-600 to-blue-500 px-5 font-semibold text-white">
            <DownloadOutlined />
            Export Report
          </button>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-[22px] border border-[var(--border)] bg-[var(--surface)] p-6">
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
              <input placeholder="Search products..." className="h-full w-full bg-transparent outline-none" />
            </div>
            <button className="flex h-14 min-w-[175px] items-center justify-between rounded-2xl bg-[#f3f4f6] px-5">
              All Warehouses <DownOutlined className="text-xs" />
            </button>
            <button className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f3f4f6]">
              <FilterOutlined />
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-[24px] border border-[var(--border)] bg-[var(--surface)]">
          <div className="hidden grid-cols-6 border-b border-[var(--border)] bg-[#fafafa] px-6 py-4 text-sm font-semibold uppercase tracking-wide text-[var(--text-secondary)] md:grid">
            <div>Product</div>
            <div>SKU</div>
            <div>Warehouse</div>
            <div>Quantity</div>
            <div>Value</div>
            <div>Status</div>
          </div>

          {rows.map((row) => (
            <div key={`${row.product}-${row.warehouse}`} className="grid gap-4 border-b border-[var(--border)] px-6 py-5 last:border-b-0 md:grid-cols-7 md:items-center">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-blue-500 text-white">
                  <InboxOutlined />
                </div>
                <span className="text-xl font-bold text-[var(--text)]">{row.product}</span>
              </div>
              <div className="text-[var(--text-secondary)]">{row.sku}</div>
              <div className="flex items-center gap-2 text-[var(--text)]"><ShopOutlined className="text-[var(--text-muted)]" /> {row.warehouse}</div>
              <div className={`text-[22px] font-extrabold ${row.status === 'Low Stock' ? 'text-orange-600' : 'text-[var(--text)]'}`}>{row.qty}</div>
              <div className="text-[22px] font-extrabold text-[var(--text)]">{row.value}</div>
              <div><span className={`rounded-full px-3 py-1 text-sm font-semibold ${row.statusClass}`}>{row.status}</span></div>
              <div className="text-[var(--text-secondary)]">{row.updated}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}