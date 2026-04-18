'use client';

import { Button } from '@/components/ui';
import { Card } from '@/components/ui/Card';
import {
  RiseOutlined,
  DollarOutlined,
  BarChartOutlined,
  FileTextOutlined,
  DownloadOutlined,
} from '@ant-design/icons';

const stats = [
  { label: 'Net Profit', value: '$200,000', note: 'YTD', bg: 'from-emerald-500 to-green-500', icon: <RiseOutlined />, valueClass: 'text-emerald-600' },
  { label: 'Total Revenue', value: '$500,000', note: '', bg: 'from-sky-500 to-blue-500', icon: <DollarOutlined />, valueClass: 'text-blue-600' },
  { label: 'Total Expenses', value: '$300,000', note: '', bg: 'from-pink-500 to-rose-500', icon: <RiseOutlined />, valueClass: 'text-red-600' },
  { label: 'Profit Margin', value: '40%', note: '', bg: 'from-violet-500 to-purple-500', icon: <BarChartOutlined />, valueClass: 'text-violet-600' },
];

const reports = [
  {
    title: 'Profit & Loss Statement',
    subtitle: 'Income and expenses summary',
    icon: <RiseOutlined />,
    iconBg: 'from-emerald-500 to-green-500',
    rows: [
      { label: 'Revenue', value: '$500,000', rowClass: 'bg-emerald-50 text-emerald-700' },
      { label: 'Expenses', value: '$300,000', rowClass: 'bg-red-50 text-red-600' },
      { label: 'Net Profit', value: '$200,000', rowClass: 'bg-violet-50 text-violet-700' },
    ],
  },
  {
    title: 'Balance Sheet',
    subtitle: 'Assets, liabilities, and equity',
    icon: <BarChartOutlined />,
    iconBg: 'from-sky-500 to-cyan-500',
    rows: [
      { label: 'Total Assets', value: '$250,000', rowClass: 'bg-blue-50 text-blue-700' },
      { label: 'Total Liabilities', value: '$100,000', rowClass: 'bg-red-50 text-red-600' },
      { label: 'Total Equity', value: '$150,000', rowClass: 'bg-violet-50 text-violet-700' },
    ],
  },
  {
    title: 'Cash Flow Statement',
    subtitle: 'Cash inflows and outflows',
    icon: <DollarOutlined />,
    iconBg: 'from-violet-500 to-pink-500',
    rows: [
      { label: 'Operating Activities', value: '+180,000', rowClass: 'bg-emerald-50 text-emerald-700' },
      { label: 'Investing Activities', value: '-50,000', rowClass: 'bg-red-50 text-red-600' },
      { label: 'Financing Activities', value: '-30,000', rowClass: 'bg-orange-50 text-orange-600' },
    ],
  },
  {
    title: 'Trial Balance',
    subtitle: 'Debit and credit balances',
    icon: <FileTextOutlined />,
    iconBg: 'from-orange-500 to-red-500',
    rows: [
      { label: 'Total Debits', value: '$1,245,820', rowClass: 'bg-emerald-50 text-emerald-700' },
      { label: 'Total Credits', value: '$1,245,820', rowClass: 'bg-red-50 text-red-600' },
      { label: 'Difference', value: '$0', rowClass: 'bg-violet-50 text-violet-700' },
    ],
  },
];

const extraReports = [
  'Accounts Receivable Aging',
  'Accounts Payable Aging',
  'General Ledger',
  'Bank Reconciliation',
  'Tax Summary',
  'Budget vs Actual',
];

export function ReportsDashboard() {
  return (
    <div className="min-h-screen bg-[var(--background)] p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-4xl font-extrabold text-[var(--text)]">Accounting Reports</h1>
        <p className="mt-1 mb-6 text-base text-[var(--text-secondary)]">
          View financial statements and analysis reports
        </p>

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

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          {reports.map((report) => (
            <Card key={report.title} className="p-5">
              <div className="mb-5 flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${report.iconBg} text-xl text-white`}>
                    {report.icon}
                  </div>
                  <div>
                    <h3 className="text-[22px] font-extrabold text-[var(--text)]">{report.title}</h3>
                    <p className="text-[var(--text-secondary)]">{report.subtitle}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-violet-600"><DownloadOutlined /></Button>
              </div>

              <div className="space-y-3">
                {report.rows.map((row) => (
                  <div key={row.label} className={`flex items-center justify-between rounded-2xl px-4 py-3 font-semibold ${row.rowClass}`}>
                    <span>{row.label}</span>
                    <span className="text-xl font-extrabold">{row.value}</span>
                  </div>
                ))}
              </div>

              <Button variant="primary" className="mt-5 w-full">
                View Full Report
              </Button>
            </Card>
          ))}
        </div>

        <Card className="mt-6 p-5">
          <h3 className="mb-4 text-2xl font-extrabold text-[var(--text)]">Additional Reports</h3>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
            {extraReports.map((item) => (
              <Button key={item} variant="secondary" className="justify-between">
                <span>{item}</span>
                <DownloadOutlined className="text-[var(--text-muted)]" />
              </Button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}