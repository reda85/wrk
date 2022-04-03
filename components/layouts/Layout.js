import Navbar from './navbar'
import Footer from './footer'
import { useRouter } from 'next/router'

export default function Layout({ children }) {
  const router = useRouter()
  const isBoard = router.pathname.split('/')[1]
  console.log('vvvvv' , isBoard)
  return (
    <>
      <div className='display-block overflow-hidden'>
      {isBoard != 'boards' &&  <Navbar /> }
      <main>{children}</main>
      </div>
    </>
  )
}