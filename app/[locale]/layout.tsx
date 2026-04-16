"use client";
import { AppShell } from '@/components/layout/AppShell';
import { usePathname } from 'next/navigation';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  console.log("pathname",pathname);
  
  // Paths that should not show sidebar and top bar
  const noLayoutPaths = ['/my-establishment', '/login', '/register', '/forget-password', '/reset-password', '/landing'];
  const shouldShowLayout = !noLayoutPaths.some(path => pathname?.endsWith(path));

  return (
    <AppShell showSidebar={shouldShowLayout} showTopBar={shouldShowLayout}>
      {children}
    </AppShell>
  );
}
