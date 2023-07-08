import type { AppProps } from 'next/app'
import Theme from "src/context/Theme";
import Head from "next/head";
import CartProvider from "src/context/Cart"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Theme>
      <Head>
        <title>WeMovies</title>
      </Head>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </Theme>
  )
}
