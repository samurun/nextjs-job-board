import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}
