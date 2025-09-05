import argentBankLogo from "../../img/argentBankLogo.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserCircle, faRightFromBracket, faCircleUser} from "@fortawesome/free-solid-svg-icons"
import { NavLink } from "react-router"
import { useAppSelector } from "../../app/hooks"

const NavBar = () => {
  const isAuth = useAppSelector(state => state.auth.isAuthenticated)
  const firstName = useAppSelector(state => state.profile.firstName)
  return (
    <nav className="main-nav">
      <NavLink to={{ pathname: "/" }} className="main-nav-logo">
        <img
          className="main-nav-logo-image"
          src={argentBankLogo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>
      <div>
        {isAuth ? (
          <>
          <NavLink to={{ pathname: "/profile" }} className="main-nav-item">
            <FontAwesomeIcon icon={faCircleUser} /> {firstName}
          </NavLink>
          <NavLink to={{ pathname: "/logout" }} className="main-nav-item">
            <FontAwesomeIcon icon={faRightFromBracket} /> Sign Out
          </NavLink>
          </>
        ) : (
          <NavLink to={{ pathname: "login" }} className="main-nav-item">
            <FontAwesomeIcon icon={faUserCircle} /> Sign In
          </NavLink>
        )}
      </div>
    </nav>
  )
}

export default NavBar
