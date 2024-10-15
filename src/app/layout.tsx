import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Image from 'next/image';
import { NextAuthSessionProvider } from '@/providers/SessionProvider';
import { FlashMessageProvider } from '@/providers/FlashMessageProvider';
import { FlashMessage } from '@/components/ui/FlashMessage';

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
          <body
            className={`${geistSans.variable} ${geistMono.variable} relative min-h-screen antialiased`}
          >
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
