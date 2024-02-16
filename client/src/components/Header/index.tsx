import logo from '../../assets/argentBankLogo.png'
import {Link} from 'react-router-dom'
import path from '../../router/path.ts'
import {logout} from '../../store/authSlice.ts'
import {useAppDispatch} from '../../store/hooks.ts'
import {useUserSelector} from '../../store/userSlice.ts'

function Header() {
    const dispatch = useAppDispatch()
    const {userInfos} = useUserSelector()

    return (
        <header>
            <nav className="main-nav">
                <Link className="main-nav-logo" to={path.HOME}>
                    <img
                        className="main-nav-logo-image"
                        src={logo}
                        alt="Argent Bank Logo"
                    />
                    <h1 className="sr-only">Argent Bank</h1>
                </Link>
                <div>
                    { userInfos ?
                        <>
                            <Link className="main-nav-item" to={path.PROFILE}>
                                <i className="fa fa-user-circle"></i>
                                {userInfos.firstName}
                            </Link>
                            <Link className="main-nav-item" to={path.HOME} onClick={() => dispatch(logout())}>
                                <i className="fa fa-sign-out"></i>
                                Sign Out
                            </Link>
                        </>
                        :
                        <Link className="main-nav-item" to={path.LOGIN}>
                            <i className="fa fa-user-circle"></i>
                            Sign In
                        </Link>
                    }
                </div>
            </nav>
        </header>
    )
}

export default Header