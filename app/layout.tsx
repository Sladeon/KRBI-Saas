import { DM_Sans } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={cn('antialiased', dmSans.variable)}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
