import StoreProvider from './StoreProvider'
import './globals.scss'
import { inter, amaranth, philosopher } from './fonts/fonts.js'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Link from 'next/link'
import Head from 'next/head'
import { StoreProviderModalStatus } from './StoreProviderModalStatus'

export const metadata = {
  icons: {
    icon: '/icon.ico',
    shortcut: '/icon.ico',
    apple: '/icon.ico',
  },
  title: 'VAB womans',
  description: 'Стильний, сучасний, вишуканий одяг для жінок',
  keywords: 'одяг, жінки, мода, стиль, сучасний одяг',
  authors: [{ name: 'VAB womans', url: 'https://github.com/VAB-womans' }],
  creator: 'VAB womans',
  openGraph: {
    title: 'VAB womans',
    description: 'Стильний, сучасний, вишуканий одяг для жінок',
    url: 'https://vab-womans.com',
    siteName: 'VAB womans',
    images: [
      {
        url: '/public/hero_tablet.webp',
        width: 1200,
        height: 630,
        alt: 'VAB womans - Стильний одяг для жінок',
      },
    ],
    locale: 'uk_UA',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="uk" className={`${inter.variable} ${amaranth.variable} ${philosopher.variable}`}>
      <Head>
        <Link rel="icon shortcut apple" href="/icon.ico" />
      </Head>
      <body>
        <StoreProvider>
          <Header />
          <StoreProviderModalStatus>{children}</StoreProviderModalStatus>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  )
}
