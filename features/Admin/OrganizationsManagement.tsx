'use client';

import { useTheme } from '@/lib/theme/use-theme';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui';
import { 
  BankOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';

export function OrganizationsManagement() {
  const { tokens } = useTheme();

  const organizations = [
    { 
      id: '1', 
      name: 'Tech Solutions Inc.', 
      users: 45, 
      branches: 3,
      status: 'Active',
      createdAt: '2024-01-15',
      subscription: 'Premium'
    },
    { 
      id: '2', 
      name: 'Global Trade LLC', 
      users: 32, 
      branches: 2,
      status: 'Active',
      createdAt: '2024-01-14',
      subscription: 'Standard'
    },
    { 
      id: '3', 
      name: 'Innovation Hub', 
      users: 28, 
      branches: 1,
      status: 'Active',
      createdAt: '2024-01-13',
      subscription: 'Premium'
    },
    { 
      id: '4', 
      name: 'Digital Services Co.', 
      users: 19, 
      branches: 2,
      status: 'Pending',
      createdAt: '2024-01-12',
      subscription: 'Trial'
    },
    { 
      id: '5', 
      name: 'Smart Systems Ltd.', 
      users: 41, 
      branches: 4,
      status: 'Active',
      createdAt: '2024-01-11',
      subscription: 'Premium'
    },
  ];

  return (
    <div className="min-h-screen p-3 md:p-4" style={{ background: '#f4f1f8' }}>
      {/* Header */}
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-[20px] font-bold leading-tight md:text-[22px]" style={{ color: '#111827' }}>
            Organizations Management
          </h1>
          <p className="mt-1 text-[13px]" style={{ color: '#6b7280' }}>
            Manage all organizations in the system
          </p>
        </div>
        <Button variant="primary">
          <PlusOutlined /> Add Organization
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[13px] text-[#6b7280]">Total Organizations</p>
              <h3 className="text-[24px] font-bold mt-2" style={{ color: '#111827' }}>24</h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
              <BankOutlined style={{ color: '#0ea5e9', fontSize: 20 }} />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[13px] text-[#6b7280]">Active</p>
              <h3 className="text-[24px] font-bold mt-2" style={{ color: '#111827' }}>21</h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
              <CheckCircleOutlined style={{ color: '#10b981', fontSize: 20 }} />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[13px] text-[#6b7280]">Pending</p>
              <h3 className="text-[24px] font-bold mt-2" style={{ color: '#111827' }}>3</h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100">
              <CloseCircleOutlined style={{ color: '#f59e0b', fontSize: 20 }} />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[13px] text-[#6b7280]">Total Users</p>
              <h3 className="text-[24px] font-bold mt-2" style={{ color: '#111827' }}>1,847</h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
              <BankOutlined style={{ color: '#8b5cf6', fontSize: 20 }} />
            </div>
          </div>
        </Card>
      </div>

      {/* Organizations Table */}
      <Card className="p-5">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#ececf2]">
                <th className="text-left py-3 px-2 text-[13px] font-semibold text-[#6b7280]">Organization</th>
                <th className="text-left py-3 px-2 text-[13px] font-semibold text-[#6b7280]">Users</th>
                <th className="text-left py-3 px-2 text-[13px] font-semibold text-[#6b7280]">Branches</th>
                <th className="text-left py-3 px-2 text-[13px] font-semibold text-[#6b7280]">Subscription</th>
                <th className="text-left py-3 px-2 text-[13px] font-semibold text-[#6b7280]">Status</th>
                <th className="text-left py-3 px-2 text-[13px] font-semibold text-[#6b7280]">Created</th>
                <th className="text-right py-3 px-2 text-[13px] font-semibold text-[#6b7280]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {organizations.map((org) => (
                <tr key={org.id} className="border-b border-[#ececf2] hover:bg-[#f9fafb] transition-colors">
                  <td className="py-4 px-2">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                        <BankOutlined style={{ color: '#0ea5e9' }} />
                      </div>
                      <div>
                        <p className="text-[14px] font-semibold" style={{ color: '#111827' }}>
                          {org.name}
                        </p>
                        <p className="text-[12px] text-[#6b7280]">ID: {org.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-2">
                    <span className="text-[14px]" style={{ color: '#111827' }}>{org.users}</span>
                  </td>
                  <td className="py-4 px-2">
                    <span className="text-[14px]" style={{ color: '#111827' }}>{org.branches}</span>
                  </td>
                  <td className="py-4 px-2">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-[11px] font-medium ${
                        org.subscription === 'Premium'
                          ? 'bg-purple-100 text-purple-700'
                          : org.subscription === 'Standard'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {org.subscription}
                    </span>
                  </td>
                  <td className="py-4 px-2">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-[11px] font-medium ${
                        org.status === 'Active'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {org.status}
                    </span>
                  </td>
                  <td className="py-4 px-2">
                    <span className="text-[13px] text-[#6b7280]">{org.createdAt}</span>
                  </td>
                  <td className="py-4 px-2">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <EditOutlined />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600">
                        <DeleteOutlined />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
