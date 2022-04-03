import '../styles/globals.css'
import 'antd/dist/antd.css';
import 'react-quill/dist/quill.snow.css'
import Layout from '../components/layouts/Layout';
import client from '../apollo-client';
import { ApolloProvider } from '@apollo/client';
import { AuthContextProvider } from '../context/AuthUserContext'
import ProtectedRoute from '../components/protectedRoute';
import { useRouter } from 'next/router'

const noAuthRequired = ['/',  '/login', '/signup']
function MyApp({ Component, pageProps }) {
  const router = useRouter()

  return (
    <ApolloProvider client={client}>
     <AuthContextProvider>
  
  {(noAuthRequired.includes(router.pathname) || router.pathname.split('/')[1] == 'boards') ? (
        <Component {...pageProps} />
      ) : (
        <ProtectedRoute>
          <Layout>
          <Component {...pageProps} />
          </Layout>
        </ProtectedRoute>
      )}
 
  </AuthContextProvider> 
  </ApolloProvider>
  )
}

export default MyApp
