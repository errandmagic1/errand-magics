import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
// import "./index.css"
import Providers from "./providers"
import { RegisterSW } from "@/components/pwa/register-sw"
import { Suspense } from "react"
import { AuthInitializer } from "@/components/auth/auth-initializer"

export const metadata: Metadata = {
  metadataBase: new URL("https://errand-magics-two.vercel.app"),
  title: "ErrandMagics - Quick Commerce Platform",
  description:
    "Quick Commerce Platform - Fast and reliable delivery for groceries, vegetables, fruits, medicine, and food",
  generator: "v0.app",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "ErrandMagics",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: "ErrandMagics - Quick Commerce Platform",
    description: "Quick Commerce Platform - Fast and reliable delivery for groceries, vegetables, fruits, medicine, and food",
    url: "https://errand-magics-two.vercel.app",
    siteName: "ErrandMagics",
    images: [
      {
        url: "/og-image.png",
        width: 1024,
        height: 1024,
        alt: "ErrandMagics Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ErrandMagics - Quick Commerce Platform",
    description: "Quick Commerce Platform - Fast and reliable delivery for groceries, vegetables, fruits, medicine, and food",
    images: ["/og-image.png"],
  },
  icons: {
    apple: "/favicon.ico",
  },
}

export const viewport = {
  themeColor: "#FF6B35",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Use className instead of inline styles to avoid hydration mismatch */}
        <style dangerouslySetInnerHTML={{
          __html: `
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        ` }} />
      </head>
      <body>
        <Providers>
          <AuthInitializer />
          <Suspense fallback={null}>{children}</Suspense>
        </Providers>
        <RegisterSW />
      </body>
    </html>
  )
}
