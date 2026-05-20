import { SectionGuard } from '@/components/auth/SectionGuard';
import { UserSection } from '@/types/roles';

export default function IndividualLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SectionGuard allowedSections={[UserSection.INDIVIDUAL]} redirectTo="/login">
      {children}
    </SectionGuard>
  );
}
