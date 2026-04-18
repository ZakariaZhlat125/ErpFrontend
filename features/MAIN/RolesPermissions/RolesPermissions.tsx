'use client';

import { useMemo, useState } from 'react';
import { useTheme } from '@/lib/theme/use-theme';
import { Button, Switch, ConfirmModal, Modal, Input, TextArea } from '@/components/ui';
import { Card } from '@/components/ui/Card';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckCircleFilled,
  TeamOutlined,
  SafetyCertificateOutlined,
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
  color: string;
  usersCount: number;
  permissions: Permission[];
}

const rolesData: Role[] = [
  {
    id: '1',
    name: 'Super Admin',
    description: 'Full system access with all permissions',
    color: '#ff3b7a',
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
    color: '#8b5cf6',
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


function RoleBadge({ color }: { color: string }) {
  return (
    <div
      className="flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-sm"
      style={{
        background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`,
      }}
    >
      <SafetyCertificateOutlined style={{ fontSize: 18 }} />
    </div>
  );
}

export function RolesPermissions() {
  const { tokens } = useTheme();
  const [selectedRoleId, setSelectedRoleId] = useState(rolesData[0].id);
  const [permissions, setPermissions] = useState<Record<string, boolean>>(
    Object.fromEntries(rolesData[0].permissions.map((perm) => [perm.id, perm.enabled]))
  );
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<{ id: string; name: string; usersCount: number } | null>(null);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [formData, setFormData] = useState({ name: '', description: '', color: '#ff3b7a' });

  const selectedRole = useMemo(
    () => rolesData.find((role) => role.id === selectedRoleId) ?? rolesData[0],
    [selectedRoleId]
  );

  const handleDeleteClick = (role: { id: string; name: string; usersCount: number }) => {
    setRoleToDelete(role);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    console.log('Deleting role:', roleToDelete);
    // Perform delete action here
    setDeleteModalOpen(false);
    setRoleToDelete(null);
  };

  const handleAddClick = () => {
    setEditingRole(null);
    setFormData({ name: '', description: '', color: '#ff3b7a' });
    setFormModalOpen(true);
  };

  const handleEditClick = (role: Role) => {
    setEditingRole(role);
    setFormData({ name: role.name, description: role.description, color: role.color });
    setFormModalOpen(true);
  };

  const handleFormSubmit = () => {
    console.log('Saving role:', formData);
    // Perform save action here
    setFormModalOpen(false);
    setFormData({ name: '', description: '', color: '#ff3b7a' });
  };

  const handleRoleSelect = (role: Role) => {
    setSelectedRoleId(role.id);
    setPermissions(Object.fromEntries(role.permissions.map((perm) => [perm.id, perm.enabled])));
  };

  const handlePermissionToggle = (permissionId: string) => {
    setPermissions((prev) => ({
      ...prev,
      [permissionId]: !prev[permissionId],
    }));
  };

  return (
    <div
      className="min-h-screen p-3 md:p-4"
      style={{ background: '#f4f1f8' }}
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h1
            className="text-[20px] font-bold leading-tight md:text-[22px]"
            style={{ color: '#111827' }}
          >
            Roles & Permissions
          </h1>
          <p
            className="mt-1 text-[13px]"
            style={{ color: '#6b7280' }}
          >
            Manage user roles and their permissions
          </p>
        </div>

        <Button variant="primary" onClick={handleAddClick}>
          <PlusOutlined /> Create Role
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[435px_minmax(0,1fr)]">
        <div className="space-y-4">
          {rolesData.map((role) => {
            const isActive = selectedRole.id === role.id;

            return (
              <Button
                key={role.id}
                variant={isActive ? 'primary' : 'secondary'}
                className="w-full justify-start p-5"
                onClick={() => handleRoleSelect(role)}
              >
                <div className="mb-4 flex items-start justify-between">
                  <RoleBadge color={role.color} />

                  <div className="flex items-center gap-3">
                    <Button variant="ghost" size="sm" className="text-[#3b82f6]" onClick={(e) => {
                      e.stopPropagation();
                      handleEditClick(role);
                    }}>
                      <EditOutlined style={{ fontSize: 15 }} />
                    </Button>
                    <Button variant="danger" size="sm" onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteClick({ id: role.id, name: role.name, usersCount: role.usersCount });
                    }}>
                      <DeleteOutlined style={{ fontSize: 15 }} />
                    </Button>
                  </div>
                </div>

                <h3 className="text-[16px] font-bold text-[#111827]">{role.name}</h3>
                <p className="mt-1 text-[13px] leading-5 text-[#6b7280]">{role.description}</p>

                <div className="mt-4 flex items-center gap-2 text-[13px] text-[#6b7280]">
                  <TeamOutlined />
                  <span>{role.usersCount} users assigned</span>
                </div>
              </Button>
            );
          })}
        </div>

        <Card className="flex min-h-[620px] flex-col p-5 md:p-6">
          <div className="mb-5 flex items-start justify-between gap-4 border-b border-[#ececf2] pb-5">
            <div>
              <h2 className="text-[18px] font-bold text-[#111827]">
                {selectedRole.name} Permissions
              </h2>
              <p className="mt-1 text-[14px] text-[#6b7280]">{selectedRole.description}</p>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full bg-[#f6f0ff] px-3 py-2 text-[13px] font-medium text-[#8b5cf6]">
              <TeamOutlined />
              {selectedRole.usersCount} users
            </div>
          </div>

          <div className="space-y-4">
            {selectedRole.permissions.map((permission) => (
              <div
                key={permission.id}
                className="flex items-center justify-between rounded-2xl border border-[#ececf2] bg-white px-4 py-4 md:px-5"
              >
                <div className="flex min-w-0 items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#dcfce7]">
                    <CheckCircleFilled style={{ color: '#22c55e', fontSize: 18 }} />
                  </div>

                  <div className="min-w-0">
                    <h4 className="truncate text-[15px] font-bold text-[#111827]">
                      {permission.name}
                    </h4>
                    <p className="mt-1 text-[13px] text-[#6b7280]">
                      {permission.description}
                    </p>
                  </div>
                </div>

                <div className="ml-4">
                  <Switch
                    checked={permissions[permission.id] ?? false}
                    onChange={() => handlePermissionToggle(permission.id)}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-auto flex justify-end gap-3 border-t border-[#ececf2] pt-6">
            <Button variant="secondary">
              Cancel
            </Button>

            <Button variant="primary">
              Save Changes
            </Button>
          </div>
        </Card>

        <ConfirmModal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleDeleteConfirm}
          type="delete"
          title="Delete Role"
          message={`Are you sure you want to delete the ${roleToDelete?.name} role?`}
          description={`This action cannot be undone. ${roleToDelete?.usersCount} users are currently assigned to this role.`}
          confirmText="Delete"
          cancelText="Cancel"
        />

        <Modal
          isOpen={formModalOpen}
          onClose={() => setFormModalOpen(false)}
          title={editingRole ? 'Edit Role' : 'Create New Role'}
          footer={
            <div className="flex justify-end gap-3">
              <Button variant="secondary" onClick={() => setFormModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleFormSubmit}>
                {editingRole ? 'Update' : 'Create'}
              </Button>
            </div>
          }
          size="md"
        >
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-[var(--text)]">Role Name</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Manager"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-[var(--text)]">Description</label>
              <TextArea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe the role and its responsibilities"
                rows={3}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-[var(--text)]">Color</label>
              <Input
                type="color"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                className="h-10 w-20"
              />
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}