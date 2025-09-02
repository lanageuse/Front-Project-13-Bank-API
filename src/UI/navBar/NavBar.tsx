import argentBankLogo from '../../img/argentBankLogo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

export const Navigation = () => {
  return(
    <nav className="main-nav">
      <a className="main-nav-logo" href="./">
        <img
          className="main-nav-logo-image"
          src={argentBankLogo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </a>
      <div>
        <a className="main-nav-item" href="./sign-in.html">
          <FontAwesomeIcon icon={faUserCircle} />
          Sign In
        </a>
      </div>
    </nav>
  )
}