'use client';

import { useMemo, useState } from 'react';
import { useTheme } from '@/lib/theme/use-theme';
import { ConfirmModal } from '@/components/ui';
import { PageHeader } from './components/PageHeader';
import { RoleCard } from './components/RoleCard';
import { PermissionsList } from './components/PermissionsList';
import { RoleFormModal } from './components/RoleFormModal';
import { rolesData, type Role } from './data';



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

  const handleSaveChanges = () => {
    console.log('Saving permissions:', permissions);
    // Perform save action here
  };

  const handleCancel = () => {
    // Reset permissions to original state
    setPermissions(Object.fromEntries(selectedRole.permissions.map((perm) => [perm.id, perm.enabled])));
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
      <PageHeader onAddClick={handleAddClick} />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[435px_minmax(0,1fr)]">
        <div className="space-y-4">
          {rolesData.map((role) => (
            <RoleCard
              key={role.id}
              role={role}
              isActive={selectedRole.id === role.id}
              onSelect={handleRoleSelect}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
          ))}
        </div>

        <PermissionsList
          role={selectedRole}
          permissions={permissions}
          onToggle={handlePermissionToggle}
          onSave={handleSaveChanges}
          onCancel={handleCancel}
        />

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

        <RoleFormModal
          isOpen={formModalOpen}
          onClose={() => setFormModalOpen(false)}
          onSubmit={handleFormSubmit}
          editingRole={editingRole}
          formData={formData}
          onFormDataChange={setFormData}
        />
      </div>
    </div>
  );
}