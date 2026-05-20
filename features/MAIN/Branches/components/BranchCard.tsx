import { Button } from '@/components/ui';
import { Card } from '@/components/ui/Card';
import {
  EditOutlined,
  MoreOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
  BranchesOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import type { Branch } from '../types/branch.types';

interface BranchCardProps {
  branch: Branch;
  onEdit: (branch: Branch) => void;
  onDelete: (branch: { id: number; name: string }) => void;
}

function getStatusClasses(isActive: boolean) {
  return isActive
    ? 'bg-emerald-100 text-emerald-700'
    : 'bg-slate-100 text-slate-600';
}

export function BranchCard({ branch, onEdit, onDelete }: BranchCardProps) {
  return (
    <Card className="p-6 transition hover:-translate-y-0.5">
      <div className="mb-5 flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-orange-500 to-red-500 text-xl text-white shadow-[0_8px_18px_rgba(249,115,22,0.28)]">
            <BranchesOutlined />
          </div>

          <div>
            <h3 className="text-[19px] font-extrabold leading-tight text-text">
              {branch.name}
            </h3>

            <div className="mt-1 flex items-center gap-2 text-sm text-text-secondary">
              <span className="text-[13px]">Code:</span>
              <span className="font-mono">{branch.code}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-[18px] text-[#4b5563]">
          <Button variant="ghost" size="sm" onClick={() => onEdit(branch)}><EditOutlined /></Button>
          <Button variant="ghost" size="sm"><MoreOutlined /></Button>
          <Button variant="danger" size="sm" onClick={() => onDelete({ id: branch.id, name: branch.name })}><DeleteOutlined /></Button>
        </div>
      </div>

      <div className="space-y-3 text-[15px] text-text-secondary">
        {branch.address && (
          <div className="flex items-start gap-3">
            <EnvironmentOutlined className="mt-1 text-[15px]" />
            <span>{branch.address}</span>
          </div>
        )}

        {branch.phone && (
          <div className="flex items-start gap-3">
            <PhoneOutlined className="mt-1 text-[15px]" />
            <span>{branch.phone}</span>
          </div>
        )}

        {branch.email && (
          <div className="flex items-start gap-3">
            <MailOutlined className="mt-1 text-[15px]" />
            <span>{branch.email}</span>
          </div>
        )}
      </div>

      <div className="my-5 h-px bg-border" />

      <div className="flex items-center justify-between">
        <div className="text-sm text-text-secondary">
          <span>Created: {new Date(branch.created_at).toLocaleDateString()}</span>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-sm font-medium capitalize ${getStatusClasses(
            branch.is_active
          )}`}
        >
          {branch.is_active ? 'Active' : 'Inactive'}
        </span>
      </div>
    </Card>
  );
}
