import {Link} from 'react-router-dom'
import routes from '../../router/path'

export default function NotFound() {
    return (
        <div>
            <h1>404</h1>
            <p>Oups! La page que vous demandez n&#39;existe pas.</p>
            <Link to={routes.HOME}>Retourner sur la page d&#39;accueil</Link>
        </div>
    )
}