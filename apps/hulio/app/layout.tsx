import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Header, Footer, TemplateBadges } from '@/components/shell';
import './fonts.css';
import './globals.css';
export const metadata: Metadata = { metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3013'), title: 'Hulio - Creative Digital Agency Template', description: 'Hulio is a creative digital agency template for thoughtful brands, design, and digital experiences.' };
export default function RootLayout({ children }: {
    children: ReactNode;
}) {
    return <html lang="en"><body><a className="skip-link" href="#main-content">Skip to content</a><Header /><main id="main-content">{children}</main><Footer /><TemplateBadges /></body></html>;
}
