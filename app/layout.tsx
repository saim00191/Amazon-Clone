// app/layout.tsx
import localFont from 'next/font/local';
import './globals.css';
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
}

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClientProvider> 
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}
