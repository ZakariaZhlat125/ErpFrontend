'use client';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useTheme } from '@/lib/theme/use-theme';
import { 
  DollarOutlined, 
  WalletOutlined, 
  RiseOutlined, 
  FallOutlined,
  TransactionOutlined,
  PlusOutlined,
} from '@ant-design/icons';

export function FinanceDashboard() {
  const { tokens } = useTheme();

  const financeStats = [
    { title: 'Total Revenue', value: '$125,430', icon: <DollarOutlined />, color: tokens.success, change: '+12.5%' },
    { title: 'Total Expenses', value: '$45,230', icon: <WalletOutlined />, color: tokens.danger, change: '+5.2%' },
    { title: 'Net Profit', value: '$80,200', icon: <RiseOutlined />, color: tokens.primary, change: '+18.3%' },
    { title: 'Pending', value: '$12,500', icon: <TransactionOutlined />, color: tokens.warning, change: '-2.1%' },
  ];

  const recentTransactions = [
    { id: 1, description: 'Client Payment', amount: '+$5,000', type: 'income', date: '2 hours ago' },
    { id: 2, description: 'Office Supplies', amount: '-$450', type: 'expense', date: '5 hours ago' },
    { id: 3, description: 'Service Fee', amount: '+$2,300', type: 'income', date: '1 day ago' },
    { id: 4, description: 'Software License', amount: '-$1,200', type: 'expense', date: '2 days ago' },
  ];

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: tokens.text }}>
            Finance
          </h1>
          <p className="text-sm" style={{ color: tokens.textSecondary }}>
            Manage your financial overview
          </p>
        </div>
        <Button variant="primary">
          <PlusOutlined /> Add Transaction
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {financeStats.map((stat) => (
          <Card key={stat.title}>
            <div className="flex items-center justify-between mb-2">
              <div 
                className="neumorphic-flat w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ color: stat.color }}
              >
                {stat.icon}
              </div>
              <span 
                className="text-sm font-medium"
                style={{ 
                  color: stat.change.startsWith('+') ? tokens.success : tokens.danger 
                }}
              >
                {stat.change}
              </span>
            </div>
            <p className="text-sm" style={{ color: tokens.textSecondary }}>
              {stat.title}
            </p>
            <p className="text-2xl font-bold" style={{ color: tokens.text }}>
              {stat.value}
            </p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-lg font-semibold mb-4" style={{ color: tokens.text }}>
            Recent Transactions
          </h2>
          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <div 
                key={transaction.id}
                className="flex items-center justify-between p-4 neumorphic-flat rounded-lg"
              >
                <div>
                  <p className="font-medium" style={{ color: tokens.text }}>
                    {transaction.description}
                  </p>
                  <p className="text-sm" style={{ color: tokens.textSecondary }}>
                    {transaction.date}
                  </p>
                </div>
                <span 
                  className="font-semibold"
                  style={{ 
                    color: transaction.type === 'income' ? tokens.success : tokens.danger 
                  }}
                >
                  {transaction.amount}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Button variant="ghost" className="w-full">
              View All Transactions
            </Button>
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold mb-4" style={{ color: tokens.text }}>
            Quick Actions
          </h2>
          <div className="space-y-3">
            <Button variant="secondary" className="w-full">
              <DollarOutlined /> Create Invoice
            </Button>
            <Button variant="secondary" className="w-full">
              <WalletOutlined /> Add Expense
            </Button>
            <Button variant="secondary" className="w-full">
              <RiseOutlined /> Generate Report
            </Button>
            <Button variant="secondary" className="w-full">
              <TransactionOutlined /> Import Data
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
