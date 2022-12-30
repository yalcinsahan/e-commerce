import '../styles/globals.css'
import Layout from '../components/layout'
import { Provider } from 'react-redux'
import { SessionProvider } from "next-auth/react"
import { store } from '../redux/store'
import { Context } from '../utils/context'

export default function App({
  Component, pageProps: { session, ...pageProps }
}) {
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </Provider>
  )
} 