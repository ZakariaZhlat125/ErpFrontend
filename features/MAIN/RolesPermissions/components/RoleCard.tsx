'use client';

import { Button } from '@/components/ui';
import {
  EditOutlined,
  DeleteOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { RoleBadge } from './RoleBadge';

interface Role {
  id: string;
  name: string;
  description: string;
  color: string;
  usersCount: number;
  permissions: any[];
}

interface RoleCardProps {
  role: Role;
  isActive: boolean;
  onSelect: (role: Role) => void;
  onEdit: (role: Role) => void;
  onDelete: (role: { id: string; name: string; usersCount: number }) => void;
}

export function RoleCard({ role, isActive, onSelect, onEdit, onDelete }: RoleCardProps) {
  return (
    <div
      className={`w-full relative p-5 cursor-pointer rounded-xl border transition-all ${
        isActive
          ? 'bg-[#3b82f6] border-[#3b82f6]'
          : 'bg-white border-[#ececf2] hover:border-[#3b82f6]'
      }`}
      onClick={() => onSelect(role)}
    >
      <div className="mb-4 flex items-start justify-between">
        <RoleBadge color={role.color} />

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="text-[#3b82f6]" onClick={(e) => {
            e.stopPropagation();
            onEdit(role);
          }}>
            <EditOutlined style={{ fontSize: 15 }} />
          </Button>
          <Button variant="danger" size="sm" onClick={(e) => {
            e.stopPropagation();
            onDelete({ id: role.id, name: role.name, usersCount: role.usersCount });
          }}>
            <DeleteOutlined style={{ fontSize: 15 }} />
          </Button>
        </div>
      </div>

      <h3 className={`text-[16px] font-bold ${isActive ? 'text-white' : 'text-[#111827]'}`}>
        {role.name}
      </h3>
      <p className={`mt-1 text-[13px] leading-5 ${isActive ? 'text-white/80' : 'text-[#6b7280]'}`}>
        {role.description}
      </p>

      <div className={`mt-4 flex items-center gap-2 text-[13px] ${isActive ? 'text-white/80' : 'text-[#6b7280]'}`}>
        <TeamOutlined />
        <span>{role.usersCount} users assigned</span>
      </div>
    </div>
  );
}
