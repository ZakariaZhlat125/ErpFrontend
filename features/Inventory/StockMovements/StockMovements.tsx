'use client';

import {
  SearchOutlined,
  FilterOutlined,
  DownOutlined,
  ArrowDownOutlined,
  ArrowUpOutlined,
  LineChartOutlined,
  InboxOutlined,
  HomeOutlined,
  UserOutlined,
  CalendarOutlined,
} from '@ant-design/icons';

const stats = [
  { label: 'Stock In', value: '+1,245', note: 'This month', bg: 'from-emerald-500 to-green-500', icon: <ArrowDownOutlined />, valueClass: 'text-emerald-600' },
  { label: 'Stock Out', value: '-892', note: 'This month', bg: 'from-pink-500 to-rose-500', icon: <ArrowUpOutlined />, valueClass: 'text-red-600' },
  { label: 'Net Movement', value: '+353', note: '', bg: 'from-sky-500 to-cyan-500', icon: <LineChartOutlined />, valueClass: 'text-blue-600' },
];

const movements = [
  {
    id: 'SM-2026-001',
    type: 'in',
    tag: 'Purchase Order',
    product: 'Laptop Computer',
    sku: 'PRD-001',
    warehouse: 'Main Warehouse',
    person: 'John Smith',
    date: '16/04/2026',
    qty: '+50 pcs',
    qtyClass: 'text-emerald-600',
    note: 'PO-2026-045',
  },
  {
    id: 'SM-2026-002',
    type: 'out',
    tag: 'Sales Order',
    product: 'Wireless Mouse',
    sku: 'PRD-002',
    warehouse: 'Main Warehouse',
    person: 'Sarah Johnson',
    date: '15/04/2026',
    qty: '+25 pcs',
    qtyClass: 'text-red-600',
    note: 'SO-2026-123',
  },
];

export function StockMovements() {
  return (
    <div className="min-h-screen bg-[var(--background)] p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <h1 className="text-4xl font-extrabold text-[var(--text)]">Stock Movements</h1>
          <p className="mt-1 text-base text-[var(--text-secondary)]">
            Track all inventory movements and transactions
          </p>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-[22px] border border-[var(--border)] bg-[var(--surface)] p-6">
              <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${stat.bg} text-xl text-white`}>
                {stat.icon}
              </div>
              <p className="text-[15px] text-[var(--text-secondary)]">{stat.label}</p>
              <p className={`mt-2 text-4xl font-extrabold ${stat.valueClass}`}>{stat.value}</p>
              {stat.note && <p className="mt-1 text-sm text-[var(--text-secondary)]">{stat.note}</p>}
            </div>
          ))}
        </div>

        <div className="mb-6 rounded-[24px] border border-[var(--border)] bg-[var(--surface)] p-5">
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="flex h-14 flex-1 items-center gap-3 rounded-2xl bg-[#f3f4f6] px-5">
              <SearchOutlined className="text-[var(--text-muted)]" />
              <input placeholder="Search movements..." className="h-full w-full bg-transparent outline-none" />
            </div>
            <button className="flex h-14 min-w-[130px] items-center justify-between rounded-2xl bg-[#f3f4f6] px-5">
              All Types <DownOutlined className="text-xs" />
            </button>
            <button className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f3f4f6]">
              <FilterOutlined />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {movements.map((item) => (
            <div key={item.id} className="rounded-[24px] border border-[var(--border)] bg-[var(--surface)] p-6">
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div className="flex items-start gap-4">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl text-white ${item.type === 'in' ? 'bg-gradient-to-br from-emerald-500 to-green-500' : 'bg-gradient-to-br from-pink-500 to-rose-500'}`}>
                    {item.type === 'in' ? <ArrowDownOutlined /> : <ArrowUpOutlined />}
                  </div>

                  <div>
                    <div className="mb-2 flex items-center gap-3">
                      <h3 className="font-mono text-[28px] font-extrabold text-[var(--text)]">{item.id}</h3>
                      <span className={`rounded-full px-3 py-1 text-sm font-semibold ${item.type === 'in' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'}`}>
                        {item.type}
                      </span>
                      <span className="rounded-md bg-violet-100 px-3 py-1 text-sm font-semibold text-violet-700">{item.tag}</span>
                    </div>

                    <div className="grid gap-3 md:grid-cols-4 md:items-center">
                      <div>
                        <p className="text-xl font-bold text-[var(--text)]">{item.product}</p>
                        <p className="text-[var(--text-secondary)]">{item.sku}</p>
                      </div>
                      <div className="flex items-center gap-2 text-[var(--text-secondary)]"><HomeOutlined /> {item.warehouse}</div>
                      <div className="flex items-center gap-2 text-[var(--text-secondary)]"><UserOutlined /> {item.person}</div>
                      <div className="flex items-center gap-2 text-[var(--text-secondary)]"><CalendarOutlined /> {item.date}</div>
                    </div>

                    <p className="mt-4 text-[15px] text-[var(--text-secondary)]">Note: {item.note}</p>
                  </div>
                </div>

                <div className={`text-4xl font-extrabold ${item.qtyClass}`}>{item.qty}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}