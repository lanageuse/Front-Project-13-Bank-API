import { Outlet, useLocation } from "react-router"
import NavBar from "../UI/navBar/NavBar"
import Footer from "../UI/footer/Footer"
import { Flip, ToastContainer } from "react-toastify"

const MainLayout = () => {
  const location = useLocation()
  const isHome = location.pathname === '/'
  return (
    <>
      <NavBar />
      <main className={`main ${isHome ? '' : 'bg-dark' }`}>
        <Outlet />
        <ToastContainer autoClose={2000} position="bottom-right" transition={Flip}/>
      </main>
      <Footer />
    </>
  )
}
export default MainLayout
