import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Meridian — Prompt-to-Production Web Studio",
  description:
    "Send one brief. Get a next-generation website — designed, coded, and deployed in a single pass. No templates, no retainers, no back-and-forth.",
  keywords: [
    "web studio",
    "one-shot website",
    "prompt to production",
    "web design",
    "Next.js development",
    "Meridian",
  ],
  authors: [{ name: "Meridian Studio" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Meridian — Prompt-to-Production Web Studio",
    description:
      "One brief in. One next-generation website out — designed, coded, and deployed in a single pass.",
    siteName: "Meridian Studio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
