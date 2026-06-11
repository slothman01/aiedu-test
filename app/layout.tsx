import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { DemoBanner } from "@/components/layout/demo-banner";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Toaster } from "@/components/ui/sonner";
import { AIEDU, STUDIO } from "@/lib/brand";
import { cn } from "@/lib/utils";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: `${STUDIO.name} | ${AIEDU.name}`,
  description: `${AIEDU.tagline} Explore AI-literacy curricular resources in a searchable catalog prototype built for ${AIEDU.name}.`,
  icons: {
    icon: AIEDU.faviconUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", poppins.variable)}>
      <body className="min-h-screen bg-background antialiased">
        <DemoBanner />
        <SiteHeader />
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </main>
        <SiteFooter />
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
