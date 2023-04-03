import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import Navbar from '@/components/Navbar'
import Navbar2 from '@/components/Navbar2'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      {/* <Navbar /> */}
      <Navbar2 />
      <Component {...pageProps} />
    </SessionProvider>
    
    )
}
