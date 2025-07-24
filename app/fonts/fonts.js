import { Inter, Amaranth, Philosopher } from 'next/font/google'

export const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '700'],
  style: 'normal',
  variable: '--font-inter',
  fallback: ['system-ui', 'sans-serif'],
})

export const amaranth = Amaranth({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-amaranth',
  fallback: ['system-ui', 'sans-serif'],
})

export const philosopher = Philosopher({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '700'],
  style: 'normal',
  variable: '--font-philosopher',
  fallback: ['system-ui', 'sans-serif'],
})
