import argentBankLogo from "../../img/argentBankLogo.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserCircle } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router"

const NavBar = () => {
  return (
    <nav className="main-nav">
        <Link to={{pathname : '/'}} className="main-nav-logo" >
        <img
          className="main-nav-logo-image"
          src={argentBankLogo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        <Link to={{pathname : 'login'}} className="main-nav-item">
          <FontAwesomeIcon icon={faUserCircle} />
          Sign In
        </Link>
      </div>
    </nav>
  )
}

export default NavBar
