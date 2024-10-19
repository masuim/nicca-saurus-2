import type { Metadata } from 'next';
import './globals.css';
import Image from 'next/image';
import { NextAuthSessionProvider } from '@/providers/SessionProvider';
import { FlashMessageProvider } from '@/providers/FlashMessageProvider';
import { FlashMessage } from '@/components/ui/FlashMessage';

export const metadata: Metadata = {
  title: 'Nicca Saurus',
  description: 'Nicca Saurus',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <NextAuthSessionProvider>
        <FlashMessageProvider>
          <body className="relative min-h-screen font-sans antialiased">
            <Image
              src="/images/background/bg-white-overlay-10.png"
              fill={true}
              style={{ objectFit: 'cover' }}
              quality={100}
              alt="Background"
              className="z-0"
            />
            <div className="relative z-10">
              <FlashMessage />
              {children}
            </div>
          </body>
        </FlashMessageProvider>
      </NextAuthSessionProvider>
    </html>
  );
}
