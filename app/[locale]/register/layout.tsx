import { AuthLayout } from '@/features/Auth/AuthLayout';

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthLayout>{children}</AuthLayout>;
}
