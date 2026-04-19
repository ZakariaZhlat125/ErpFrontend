'use client';

import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  MoreOutlined,
  HomeOutlined,
  EnvironmentOutlined,
  UserOutlined,
  PhoneOutlined,
  InboxOutlined,
} from '@ant-design/icons';

const stats = [
  { label: 'Total Warehouses', value: '12', bg: 'from-sky-500 to-cyan-500', icon: <HomeOutlined />, valueClass: 'text-[var(--text)]' },
  { label: 'Total Capacity', value: '36,000', bg: 'from-emerald-500 to-green-500', icon: <InboxOutlined />, valueClass: 'text-emerald-600' },
  { label: 'Current Stock', value: '24,600', bg: 'from-violet-500 to-pink-500', icon: <InboxOutlined />, valueClass: 'text-violet-600' },
  { label: 'Utilization', value: '68%', bg: 'from-orange-500 to-red-500', icon: <HomeOutlined />, valueClass: 'text-orange-600' },
];

const warehouses = [
  {
    name: 'Main Warehouse',
    code: 'WH-001',
    address: '123 Storage St, San Francisco, CA 94105',
    manager: 'John Smith',
    phone: '+1 (555) 100-1000',
    capacity: '10,000',
    stock: '7,500',
    utilization: 75,
    bar: 'bg-gradient-to-r from-orange-500 to-amber-400',
    products: '142 products',
  },
  {
    name: 'East Coast Depot',
    code: 'WH-002',
    address: '456 Distribution Ave, New York, NY 10001',
    manager: 'Sarah Johnson',
    phone: '+1 (555) 200-2000',
    capacity: '8,000',
    stock: '5,200',
    utilization: 65,
    bar: 'bg-gradient-to-r from-emerald-500 to-green-500',
    products: '98 products',
  },
];

export function Warehouses() {
  return (
    <div className="min-h-screen bg-[var(--background)] p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-[var(--text)]">Warehouses</h1>
            <p className="mt-1 text-base text-[var(--text-secondary)]">
              Manage warehouse locations and storage facilities
            </p>
          </div>

          <button className="inline-flex h-11 items-center gap-2 rounded-2xl bg-gradient-to-r from-fuchsia-600 to-blue-500 px-5 font-semibold text-white">
            <PlusOutlined />
            Add Warehouse
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
          <div className="flex h-14 items-center gap-3 rounded-2xl bg-[#f3f4f6] px-5">
            <SearchOutlined className="text-[var(--text-muted)]" />
            <input placeholder="Search warehouses..." className="h-full w-full bg-transparent outline-none" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          {warehouses.map((warehouse) => (
            <div key={warehouse.code} className="rounded-[24px] border border-[var(--border)] bg-[var(--surface)] p-6">
              <div className="mb-5 flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 text-2xl text-white">
                    <HomeOutlined />
                  </div>

                  <div>
                    <h3 className="text-[28px] font-extrabold text-[var(--text)]">{warehouse.name}</h3>
                    <p className="text-[var(--text-secondary)]">{warehouse.code}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-lg text-[var(--text-secondary)]">
                  <button className="text-blue-600"><EditOutlined /></button>
                  <button><MoreOutlined /></button>
                </div>
              </div>

              <div className="space-y-3 text-[15px] text-[var(--text-secondary)]">
                <div className="flex items-start gap-3"><EnvironmentOutlined className="mt-1" /> {warehouse.address}</div>
                <div className="flex items-start gap-3"><UserOutlined className="mt-1" /> Manager: {warehouse.manager}</div>
                <div className="flex items-start gap-3"><PhoneOutlined className="mt-1" /> {warehouse.phone}</div>
              </div>

              <div className="my-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-violet-50 p-4">
                  <p className="text-sm text-[var(--text-secondary)]">Capacity</p>
                  <p className="text-3xl font-extrabold text-violet-700">{warehouse.capacity}</p>
                </div>
                <div className="rounded-2xl bg-blue-50 p-4">
                  <p className="text-sm text-[var(--text-secondary)]">Current Stock</p>
                  <p className="text-3xl font-extrabold text-blue-700">{warehouse.stock}</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[15px] text-[var(--text-secondary)]">Utilization</span>
                  <span className="text-xl font-bold text-[var(--text)]">{warehouse.utilization}%</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                  <div className={`h-full rounded-full ${warehouse.bar}`} style={{ width: `${warehouse.utilization}%` }} />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                  <InboxOutlined />
                  {warehouse.products}
                </div>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">active</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}