import { Outlet, useLocation } from "react-router"
import NavBar from "../UI/navBar/NavBar"
import Footer from "../UI/footer/Footer"

const MainLayout = () => {
    let location = useLocation()
  const isHome = location.pathname === '/'
  return (
    <>
      <NavBar />
      <main className={`main ${isHome ? '' : 'bg-dark' }`}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
export default MainLayout
