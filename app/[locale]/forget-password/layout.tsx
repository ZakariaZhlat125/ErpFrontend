import { AuthLayout } from '@/features/Auth/AuthLayout';

export default function ForgetPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthLayout>{children}</AuthLayout>;
}
