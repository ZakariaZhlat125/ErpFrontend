import { Button } from '@/components/ui';
import { Card } from '@/components/ui/Card';
import {
  EditOutlined,
  MoreOutlined,
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import type { Party } from '../types/party.types';

interface PartyCardProps {
  party: Party;
  onEdit: (party: Party) => void;
  onDelete: (party: { id: number; name: string }) => void;
}

function getStatusClasses(isActive: boolean) {
  return isActive
    ? 'bg-emerald-100 text-emerald-700'
    : 'bg-slate-100 text-slate-600';
}

function getTypeIcon(type: string) {
  return type === 'company' ? '🏢' : '👤';
}

export function PartyCard({ party, onEdit, onDelete }: PartyCardProps) {
  return (
    <Card className="p-6 transition hover:-translate-y-0.5">
      <div className="mb-5 flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-blue-500 to-indigo-500 text-xl text-white shadow-[0_8px_18px_rgba(59,130,246,0.28)]">
            <span>{getTypeIcon(party.type)}</span>
          </div>

          <div>
            <h3 className="text-[19px] font-extrabold leading-tight text-text">
              {party.display_name}
            </h3>

            <div className="mt-1 flex items-center gap-2 text-sm text-text-secondary">
              <span className="text-[13px]">Code:</span>
              <span className="font-mono">{party.code}</span>
              <span className="mx-1">•</span>
              <span className="capitalize">{party.type}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-[18px] text-[#4b5563]">
          <Button variant="ghost" size="sm" onClick={() => onEdit(party)}><EditOutlined /></Button>
          <Button variant="ghost" size="sm"><MoreOutlined /></Button>
          <Button variant="danger" size="sm" onClick={() => onDelete({ id: party.id, name: party.display_name })}><DeleteOutlined /></Button>
        </div>
      </div>

      {party.legal_name && (
        <div className="mb-3 text-sm text-text-secondary">
          <span className="font-medium">Legal Name:</span> {party.legal_name}
        </div>
      )}

      <div className="space-y-3 text-[15px] text-text-secondary">
        {party.tax_number && (
          <div className="flex items-start gap-3">
            <UserOutlined className="mt-1 text-[15px]" />
            <span>Tax: {party.tax_number}</span>
          </div>
        )}

        {party.notes && (
          <div className="flex items-start gap-3">
            <EnvironmentOutlined className="mt-1 text-[15px]" />
            <span className="line-clamp-2">{party.notes}</span>
          </div>
        )}
      </div>

      <div className="my-5 h-px bg-border" />

      <div className="flex items-center justify-between">
        <div className="text-sm text-text-secondary">
          <span>Created: {new Date(party.created_at).toLocaleDateString()}</span>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-sm font-medium capitalize ${getStatusClasses(
            party.is_active
          )}`}
        >
          {party.is_active ? 'Active' : 'Inactive'}
        </span>
      </div>
    </Card>
  );
}
