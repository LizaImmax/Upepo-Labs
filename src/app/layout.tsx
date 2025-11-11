import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  title: 'Upepo Labs - Where Innovation Takes Flight',
  description: 'Research, innovation, and experimentation hub for cloud, AI, and open-source projects.',
  keywords: ['cloud', 'AI', 'open source', 'research', 'innovation', 'DevOps', 'cybersecurity'],
  authors: [{ name: 'Upepo Labs' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://upepo-labs.com',
    siteName: 'Upepo Labs',
    title: 'Upepo Labs - Where Innovation Takes Flight',
    description: 'Research, innovation, and experimentation hub for cloud, AI, and open-source projects.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Upepo Labs - Where Innovation Takes Flight',
    description: 'Research, innovation, and experimentation hub for cloud, AI, and open-source projects.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
