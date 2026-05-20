import { SafetyCertificateOutlined } from '@ant-design/icons';

interface RoleBadgeProps {
  color: string;
}

export function RoleBadge({ color }: RoleBadgeProps) {
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
