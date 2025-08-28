import type { Metadata } from 'next';
import './globals.css';
import { TRPCProvider } from '../components/providers';

export const metadata: Metadata = {
  title: 'Tasks Manager',
  description: 'A simple task management application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        <TRPCProvider>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4 py-8">{children}</div>
          </div>
        </TRPCProvider>
      </body>
    </html>
  );
}
