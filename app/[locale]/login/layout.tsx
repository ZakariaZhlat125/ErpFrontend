import { AuthLayout } from '@/features/Auth/AuthLayout';

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthLayout>{children}</AuthLayout>;
}
