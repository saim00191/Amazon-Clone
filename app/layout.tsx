// app/layout.tsx
import localFont from 'next/font/local';
import './globals.css';
import UpperHeader from '@/components/Header/UpperHeader/UpperHeader';
import Footer from '@/components/Footer/Footer';
import ClientProvider from '@/app/ClientProvider'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata = {
  title: 'Amazon Clone',
  description: 'Developed By Saim Amjad',
};

interface RootLayoutProps {
  children: React.ReactNode;
  hideHeaderFooter?: boolean;
}

export default function RootLayout({
  children,
  hideHeaderFooter = false,
}: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClientProvider> {/* Wrap your layout with ClientProvider */}
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}
