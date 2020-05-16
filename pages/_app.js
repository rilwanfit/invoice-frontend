import "bootstrap/dist/css/bootstrap.css";
import '../assets/styles.css'
import { ApplicationProvider } from '../components/ApplicationContext'
import Layout from "../components/Layout";


// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <ApplicationProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
    </ApplicationProvider>
  )
}