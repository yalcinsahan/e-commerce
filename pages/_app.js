import '../styles/globals.css'
import Layout from '../components/layout'
import { Provider } from "react-redux";
import store from "../redux/store";

import { SessionProvider } from "next-auth/react"

export default function App({
  Component, pageProps: { session, ...pageProps }
}) {
  return (
    <Provider store={store}>
      <SessionProvider session={session} >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </Provider>
  )
} 