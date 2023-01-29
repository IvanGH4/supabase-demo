import type { AppProps } from 'next/app';
import '@/styles/globals.css';

import Navbar from '@/components/Navbar';
import AppProvider from '@/components/context';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <div className='bg-black min-h-screen'>
        <Navbar />
        <section className='pt-10'>
          <Component {...pageProps} />
        </section>
      </div>
    </AppProvider>
  );
}
