import StoreProvider from './StoreProvider'
import './globals.scss'
import { inter, amaranth } from './fonts/fonts.js'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Link from 'next/link'
import Head from 'next/head'
import { StoreProviderModalStatus } from './StoreProviderModalStatus'

export const metadata = {
  title: 'VAB womans',
  description: 'Стильний, сучасний, вишуканий одяг для жінок',
}

export default function RootLayout({ children }) {
  return (
    <html lang="uk" className={`${inter.variable} ${amaranth.variable}`}>
      {/* <Head>
        <link rel="shortcut icon" href="./public/logo.webp" />
      </Head> */}
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
