import Navbar from './navbar'
import Footer from './footer'

export default function Layout({ children }) {
  return (
    <>
      <div className='display-block overflow-hidden'>
      <Navbar />
      <main>{children}</main>
      </div>
    </>
  )
}