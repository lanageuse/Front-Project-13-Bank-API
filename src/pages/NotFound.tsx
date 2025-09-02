import { NavLink } from "react-router"

function NotFound() {
    return (
        <div className="notFound-container">
            <div className="title">404</div>
            <div className="content">Oups! La page que vous demandez n'existe pas.</div>
            <div className="link"><NavLink to="/">Retourner sur la page d’accueil</NavLink></div>
        </div>
    )
}

export default NotFound