'use client';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/context/AuthContext';
import { DataProvider } from '@/context/DataContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <title>SmashPro Badminton Academy</title>
        <meta name="description" content="Premier badminton training academy — expert coaching, world-class facilities, all age groups" />
      </head>
      <body>
        <AuthProvider>
          <DataProvider>
            {children}
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  background: '#1f2937',
                  color: '#f9fafb',
                  border: '1px solid #374151',
                  borderRadius: '0.75rem',
                  fontFamily: 'Inter, sans-serif',
                },
                success: { iconTheme: { primary: '#10b981', secondary: '#f9fafb' } },
                error: { iconTheme: { primary: '#ef4444', secondary: '#f9fafb' } },
              }}
            />
          </DataProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
