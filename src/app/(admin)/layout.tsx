import { ClerkProvider } from '@clerk/nextjs';
import { Metadata } from 'next';
import AdminNavbar from './components/admin-navbar';

export const metadata: Metadata = {
  title: 'Admin',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <AdminNavbar />
      <main className='container'>{children}</main>
    </ClerkProvider>
  );
}
