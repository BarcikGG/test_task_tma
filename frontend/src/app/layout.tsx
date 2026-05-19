import type { Metadata, Viewport } from 'next'
import { Anonymous_Pro } from 'next/font/google'
import { Providers } from './providers'
import '../shared/styles/globals.css'

const anonymousPro = Anonymous_Pro({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-anonymous-pro',
})

export const metadata: Metadata = {
  title: 'Open Foundation',
  description: 'Create sustained impact. Support verified projects.',
  applicationName: 'Open Foundation Mini App',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`dark h-full ${anonymousPro.variable}`} suppressHydrationWarning>
      <body className="h-full bg-[var(--bg)] text-[var(--text)] antialiased">
        <Providers>
          <div className="w-full max-w-[475px] mx-auto h-full">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}
