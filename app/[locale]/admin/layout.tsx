import { SectionGuard } from '@/components/auth/SectionGuard';
import { UserSection } from '@/types/roles';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SectionGuard allowedSections={[UserSection.ADMIN]} redirectTo="/login">
      {children}
    </SectionGuard>
  );
}
