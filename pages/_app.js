import '@/styles/globals.css'
import Layout from '@/components/Layout'
import { Montserrat } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
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
        <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="colored"
        />
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
