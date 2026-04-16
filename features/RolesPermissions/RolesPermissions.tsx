'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { useTheme } from '@/lib/theme/use-theme';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  TeamOutlined,
} from '@ant-design/icons';

interface Permission {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

interface Role {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  usersCount: number;
  permissions: Permission[];
}

export function RolesPermissions() {
  const { tokens } = useTheme();
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [permissions, setPermissions] = useState<Record<string, boolean>>({});

  const roles: Role[] = [
    {
      id: '1',
      name: 'Super Admin',
      description: 'Full system access with all permissions',
      icon: 'S',
      color: '#ec4899',
      usersCount: 5,
      permissions: [
        { id: '1', name: 'Manage Users', description: 'Create, edit, and delete users', enabled: true },
        { id: '2', name: 'Manage Roles', description: 'Create and modify user roles', enabled: true },
        { id: '3', name: 'Manage Organizations', description: 'Add and edit organizations', enabled: true },
        { id: '4', name: 'View Reports', description: 'Access all system reports', enabled: true },
        { id: '5', name: 'System Settings', description: 'Modify system configuration', enabled: true },
      ],
    },
    {
      id: '2',
      name: 'Manager',
      description: 'Manage team members and view reports',
      icon: 'M',
      color: '#0ea5e9',
      usersCount: 24,
      permissions: [
        { id: '1', name: 'Manage Users', description: 'Create, edit, and delete users', enabled: true },
        { id: '2', name: 'Manage Roles', description: 'Create and modify user roles', enabled: false },
        { id: '3', name: 'Manage Organizations', description: 'Add and edit organizations', enabled: false },
        { id: '4', name: 'View Reports', description: 'Access all system reports', enabled: true },
        { id: '5', name: 'System Settings', description: 'Modify system configuration', enabled: false },
      ],
    },
    {
      id: '3',
      name: 'User',
      description: 'Basic access to assigned resources',
      icon: 'U',
      color: '#10b981',
      usersCount: 156,
      permissions: [
        { id: '1', name: 'Manage Users', description: 'Create, edit, and delete users', enabled: false },
        { id: '2', name: 'Manage Roles', description: 'Create and modify user roles', enabled: false },
        { id: '3', name: 'Manage Organizations', description: 'Add and edit organizations', enabled: false },
        { id: '4', name: 'View Reports', description: 'Access all system reports', enabled: false },
        { id: '5', name: 'System Settings', description: 'Modify system configuration', enabled: false },
      ],
    },
    {
      id: '4',
      name: 'Viewer',
      description: 'Read-only access to system data',
      icon: 'V',
      color: '#a855f7',
      usersCount: 87,
      permissions: [
        { id: '1', name: 'Manage Users', description: 'Create, edit, and delete users', enabled: false },
        { id: '2', name: 'Manage Roles', description: 'Create and modify user roles', enabled: false },
        { id: '3', name: 'Manage Organizations', description: 'Add and edit organizations', enabled: false },
        { id: '4', name: 'View Reports', description: 'Access all system reports', enabled: false },
        { id: '5', name: 'System Settings', description: 'Modify system configuration', enabled: false },
      ],
    },
  ];

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
    const permissionMap: Record<string, boolean> = {};
    role.permissions.forEach(perm => {
      permissionMap[perm.id] = perm.enabled;
    });
    setPermissions(permissionMap);
  };

  const handlePermissionToggle = (permissionId: string) => {
    setPermissions(prev => ({
      ...prev,
      [permissionId]: !prev[permissionId],
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: tokens.text }}>
            Roles & Permissions
          </h1>
          <p className="text-sm mt-1" style={{ color: tokens.textSecondary }}>
            Manage user roles and their permissions
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
          Create Role
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          {roles.map((role) => (
            <div
              key={role.id}
              className="p-6 rounded-xl cursor-pointer transition-all"
              style={{
                border: selectedRole?.id === role.id ? '2px solid #a855f7' : '2px solid #e5e7eb',
                backgroundColor: selectedRole?.id === role.id ? 'rgba(168, 85, 247, 0.05)' : 'transparent',
              }}
              onClick={() => handleRoleSelect(role)}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-lg"
                  style={{ backgroundColor: role.color, color: 'white' }}
                >
                  {role.icon}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#0ea5e9',
                      fontSize: '16px',
                      padding: '4px 8px',
                    }}
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
                  >
                    <DeleteOutlined />
                  </button>
                </div>
              </div>
              <h3 style={{ color: tokens.text, fontWeight: 600, fontSize: '16px', marginBottom: '4px' }}>
                {role.name}
              </h3>
              <p style={{ color: tokens.textSecondary, fontSize: '13px', marginBottom: '12px' }}>
                {role.description}
              </p>
              <div className="flex items-center gap-2" style={{ color: tokens.textSecondary, fontSize: '13px' }}>
                <TeamOutlined />
                <span>{role.usersCount} users assigned</span>
              </div>
            </div>
          ))}
        </div>

        {selectedRole && (
          <div className="lg:col-span-2">
            <div className="rounded-xl p-6" style={{ backgroundColor: tokens.surface, border: `1px solid ${tokens.border}` }}>
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <h2 style={{ color: tokens.text, fontWeight: 600, fontSize: '18px' }}>
                    {selectedRole.name} Permissions
                  </h2>
                  <span style={{ color: tokens.textSecondary, fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <TeamOutlined style={{ fontSize: '14px' }} />
                    {selectedRole.usersCount} users
                  </span>
                </div>
                <p style={{ color: tokens.textSecondary, fontSize: '14px' }}>
                  {selectedRole.description}
                </p>
              </div>

              <div className="space-y-4 mb-8">
                {selectedRole.permissions.map((permission) => (
                  <div
                    key={permission.id}
                    className="flex items-center justify-between p-4 rounded-lg"
                    style={{ backgroundColor: 'rgba(16, 185, 129, 0.08)' }}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <CheckCircleOutlined style={{ color: '#10b981', fontSize: '18px' }} />
                        <h4 style={{ color: tokens.text, fontWeight: 600, fontSize: '15px' }}>
                          {permission.name}
                        </h4>
                      </div>
                      <p style={{ color: tokens.textSecondary, fontSize: '13px', marginLeft: '32px' }}>
                        {permission.description}
                      </p>
                    </div>
                    <label className="flex items-center cursor-pointer flex-shrink-0 ml-4">
                      <input
                        type="checkbox"
                        checked={permissions[permission.id] || false}
                        onChange={() => handlePermissionToggle(permission.id)}
                        className="sr-only"
                      />
                      <div
                        style={{
                          width: '52px',
                          height: '32px',
                          borderRadius: '16px',
                          backgroundColor: permissions[permission.id] ? '#a855f7' : '#d1d5db',
                          position: 'relative',
                          transition: 'background-color 0.3s ease',
                        }}
                      >
                        <div
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            backgroundColor: 'white',
                            position: 'absolute',
                            top: '2px',
                            left: permissions[permission.id] ? '22px' : '2px',
                            transition: 'left 0.3s ease',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                          }}
                        />
                      </div>
                    </label>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-end gap-3" style={{ borderTop: `1px solid ${tokens.border}`, paddingTop: '16px' }}>
                <button
                  style={{
                    backgroundColor: 'transparent',
                    border: `1px solid ${tokens.border}`,
                    padding: '10px 24px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    color: tokens.text,
                    fontSize: '14px',
                    fontWeight: 600,
                  }}
                >
                  Cancel
                </button>
                <button
                  style={{
                    backgroundColor: '#a855f7',
                    border: 'none',
                    padding: '10px 24px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: 600,
                  }}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
