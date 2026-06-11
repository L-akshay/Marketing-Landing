import type { Metadata } from 'next'
import { Dancing_Script, Poly, Ubuntu } from 'next/font/google'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { content } from '@/lib/content'

const ubuntu = Ubuntu({
  weight: ['300', '400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-ubuntu',
})

const poly = Poly({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-poly',
})

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-dancing',
})

export const metadata: Metadata = {
  title: content.meta.title,
  description: content.meta.description,
  icons: {
    icon: '/assets/logo/logo.png',
  },
  openGraph: {
    title: content.meta.title,
    description: content.meta.description,
    type: 'website',
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={`${ubuntu.variable} ${poly.variable} ${dancingScript.variable} tw-dark`} suppressHydrationWarning>
      <body className="tw-flex tw-min-h-[100vh] tw-flex-col tw-bg-[#fcfcfc] tw-text-black dark:tw-bg-black dark:tw-text-white">
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (localStorage.getItem('color-mode') === 'light') {
                document.documentElement.classList.remove('tw-dark')
              } else {
                document.documentElement.classList.add('tw-dark')
              }
            `,
          }}
        />
        <Header />
        {children}
      </body>
    </html>
  )
}
