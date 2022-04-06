import Document, { Html, Head, Main, NextScript } from 'next/document'
class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
      }
    render() {
      return (
        <Html>
          <Head>
            <link
              href="https://fonts.googleapis.com/css2?family=Cairo"
              rel="stylesheet"
            />
          </Head>
          <body className='font-Cairo text-medium'>
            <Main />
            <NextScript />
          </body>
        </Html>
      )
    }
  }
  
  export default MyDocument