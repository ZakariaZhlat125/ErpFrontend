'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/lib/theme/use-theme';
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  MailOutlined,
  PhoneOutlined,
  FilterOutlined,
  DownOutlined,
  MoreOutlined,
} from '@ant-design/icons';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  organization: string;
  status: 'active' | 'inactive' | 'pending';
  avatar: string;
  avatarColor: string;
}

export function Users() {
  const { tokens } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');

  const users: User[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah@techcorp.com',
      phone: '+1 (555) 123-4567',
      role: 'Admin',
      organization: 'TechCorp Global',
      status: 'active',
      avatar: 'SJ',
      avatarColor: '#a855f7',
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'm.chen@innovationlabs.com',
      phone: '+1 (555) 234-5678',
      role: 'Manager',
      organization: 'Innovation Labs',
      status: 'active',
      avatar: 'MC',
      avatarColor: '#a855f7',
    },
    {
      id: '3',
      name: 'Emma Davis',
      email: 'emma.d@digitalsol.com',
      phone: '+1 (555) 345-6789',
      role: 'User',
      organization: 'Digital Solutions',
      status: 'pending',
      avatar: 'ED',
      avatarColor: '#a855f7',
    },
    {
      id: '4',
      name: 'James Wilson',
      email: 'j.wilson@futuresys.com',
      phone: '+1 (555) 456-7890',
      role: 'Manager',
      organization: 'Future Systems',
      status: 'active',
      avatar: 'JW',
      avatarColor: '#a855f7',
    },
    {
      id: '5',
      name: 'Lisa Anderson',
      email: 'l.anderson@techcorp.com',
      phone: '+1 (555) 567-8901',
      role: 'User',
      organization: 'TechCorp Global',
      status: 'inactive',
      avatar: 'LA',
      avatarColor: '#a855f7',
    },
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return { bg: '#d1fae5', text: '#059669' };
      case 'pending':
        return { bg: '#fef3c7', text: '#d97706' };
      case 'inactive':
        return { bg: '#fee2e2', text: '#dc2626' };
      default:
        return { bg: '#f3f4f6', text: '#6b7280' };
    }
  };

  const getRoleColor = (role: string) => {
    const colors: Record<string, string> = {
      'Admin': '#a855f7',
      'Manager': '#0ea5e9',
      'Supervisor': '#f59e0b',
      'User': '#10b981',
    };
    return colors[role] || '#6b7280';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: tokens.text }}>
            Users
          </h1>
          <p className="text-sm mt-1" style={{ color: tokens.textSecondary }}>
            Manage all users across your organization
          </p>
        </div>
        <button
          style={{
            backgroundColor: '#a855f7',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <PlusOutlined />
          Add User
        </button>
      </div>

      <Card className="p-6">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="flex-1 flex items-center gap-2 px-4 py-3 rounded-lg" style={{ backgroundColor: 'var(--surface-muted)' }}>
            <SearchOutlined style={{ color: tokens.textSecondary }} />
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none"
              style={{ color: tokens.text, fontSize: '14px' }}
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              style={{
                backgroundColor: 'transparent',
                border: `1px solid ${tokens.border}`,
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                color: tokens.text,
                fontSize: '14px',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              All Status
              <DownOutlined style={{ fontSize: '12px' }} />
            </button>
            <button
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                padding: '8px 12px',
                cursor: 'pointer',
                color: tokens.text,
                fontSize: '14px',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <FilterOutlined style={{ fontSize: '14px' }} />
              More Filters
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: `1px solid ${tokens.border}` }}>
                <th style={{ padding: '16px 12px', textAlign: 'left', color: tokens.textSecondary, fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  USER
                </th>
                <th style={{ padding: '16px 12px', textAlign: 'left', color: tokens.textSecondary, fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  CONTACT
                </th>
                <th style={{ padding: '16px 12px', textAlign: 'left', color: tokens.textSecondary, fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  ROLE
                </th>
                <th style={{ padding: '16px 12px', textAlign: 'left', color: tokens.textSecondary, fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  ORGANIZATION
                </th>
                <th style={{ padding: '16px 12px', textAlign: 'left', color: tokens.textSecondary, fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  STATUS
                </th>
                <th style={{ padding: '16px 12px', textAlign: 'center', color: tokens.textSecondary, fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, idx) => {
                const statusColor = getStatusColor(user.status);
                return (
                  <tr
                    key={user.id}
                    style={{
                      borderBottom: `1px solid ${tokens.border}`,
                    }}
                  >
                    <td style={{ padding: '16px 12px' }}>
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-sm"
                          style={{ backgroundColor: user.avatarColor, color: 'white' }}
                        >
                          {user.avatar}
                        </div>
                        <div>
                          <p style={{ color: tokens.text, fontWeight: 600, fontSize: '14px' }}>
                            {user.name}
                          </p>
                          <p style={{ color: tokens.textSecondary, fontSize: '12px', marginTop: '2px' }}>
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '16px 12px' }}>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <MailOutlined style={{ color: tokens.textSecondary, fontSize: '14px' }} />
                          <span style={{ color: tokens.text, fontSize: '13px' }}>
                            {user.email}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <PhoneOutlined style={{ color: tokens.textSecondary, fontSize: '14px' }} />
                          <span style={{ color: tokens.text, fontSize: '13px' }}>
                            {user.phone}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '16px 12px' }}>
                      <div className="flex items-center gap-2">
                        <div
                          style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: '#a855f7',
                          }}
                        />
                        <span style={{ color: tokens.text, fontSize: '14px', fontWeight: 500 }}>
                          {user.role}
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: '16px 12px' }}>
                      <a
                        href="#"
                        style={{
                          color: '#0ea5e9',
                          fontSize: '14px',
                          textDecoration: 'none',
                        }}
                      >
                        {user.organization}
                      </a>
                    </td>
                    <td style={{ padding: '16px 12px' }}>
                      <span
                        style={{
                          backgroundColor: statusColor.bg,
                          color: statusColor.text,
                          padding: '4px 10px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: 600,
                          display: 'inline-block',
                          textTransform: 'lowercase',
                        }}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td style={{ padding: '16px 12px', textAlign: 'center' }}>
                      <div className="flex items-center justify-center gap-3">
                        <button
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: '#0ea5e9',
                            fontSize: '16px',
                            padding: '4px 8px',
                          }}
                          title="Edit user"
                        >
                          <EditOutlined />
                        </button>
                        <button
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: '#ef4444',
                            fontSize: '16px',
                            padding: '4px 8px',
                          }}
                          title="Delete user"
                        >
                          <DeleteOutlined />
                        </button>
                        <button
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: tokens.textSecondary,
                            fontSize: '16px',
                            padding: '4px 8px',
                          }}
                          title="More options"
                        >
                          <MoreOutlined />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex items-center justify-between" style={{ borderTop: `1px solid ${tokens.border}`, paddingTop: '16px' }}>
          <p style={{ color: tokens.textSecondary, fontSize: '14px' }}>
            Showing 1 to 5 of 5 users
          </p>
          <div className="flex items-center gap-2">
            <button
              style={{
                backgroundColor: 'transparent',
                border: `1px solid ${tokens.border}`,
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                color: tokens.text,
                fontSize: '14px',
                fontWeight: 500,
              }}
            >
              Previous
            </button>
            <button
              style={{
                backgroundColor: '#a855f7',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                color: 'white',
                fontSize: '14px',
                fontWeight: 600,
              }}
            >
              Next
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
