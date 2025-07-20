import { Inter, Amaranth } from 'next/font/google'

export const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '700'],
  style: 'normal',
  variable: '--font-inter',
  fallback: ['system-ui', 'sans-serif'],
})

export const amaranth = Amaranth({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-amaranth',
  fallback: ['system-ui', 'sans-serif'],
})
