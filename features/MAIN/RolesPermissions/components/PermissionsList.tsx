'use client';

import { Button, Switch } from '@/components/ui';
import { Card } from '@/components/ui/Card';
import { CheckCircleFilled, TeamOutlined } from '@ant-design/icons';

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

interface PermissionsListProps {
  role: Role;
  permissions: Record<string, boolean>;
  onToggle: (permissionId: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export function PermissionsList({ role, permissions, onToggle, onSave, onCancel }: PermissionsListProps) {
  return (
    <Card className="flex min-h-155 flex-col p-5 md:p-6">
      <div className="mb-5 flex items-start justify-between gap-4 border-b border-[#ececf2] pb-5">
        <div>
          <h2 className="text-[18px] font-bold text-[#111827]">
            {role.name} Permissions
          </h2>
          <p className="mt-1 text-[14px] text-[#6b7280]">{role.description}</p>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full bg-[#f6f0ff] px-3 py-2 text-[13px] font-medium text-[#8b5cf6]">
          <TeamOutlined />
          {role.usersCount} users
        </div>
      </div>

      <div className="space-y-4">
        {role.permissions.map((permission) => (
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
                onChange={() => onToggle(permission.id)}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto flex justify-end gap-3 border-t border-[#ececf2] pt-6">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>

        <Button variant="primary" onClick={onSave}>
          Save Changes
        </Button>
      </div>
    </Card>
  );
}
