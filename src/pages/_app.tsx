import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Context from '../context/layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Quiz</title>
      </Head>
      <Context>
        <Component {...pageProps} />
      </Context>
    </>
  );
}

export default MyApp;