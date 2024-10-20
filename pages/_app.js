import '@/styles/globals.css'
import Layout from '@/components/Layout'
import { Montserrat } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.min.css';
const montserrat = Montserrat({ subsets: ['latin'] })
export default function App({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${montserrat.style.fontFamily};
        }
      `}</style>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
