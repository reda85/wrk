import '../styles/globals.css'
import 'antd/dist/antd.css';
import Layout from '../components/layouts/Layout';
import client from '../apollo-client';
import { ApolloProvider } from '@apollo/client';


function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
  <Layout>
  <Component {...pageProps} />
  </Layout>
  </ApolloProvider>
  )
}

export default MyApp
