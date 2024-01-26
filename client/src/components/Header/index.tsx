import logo from '../../assets/argentBankLogo.png'

function Header() {
    const connected = false

    return (
        <header>
            <nav className="main-nav">
                <a className="main-nav-logo" href="/">
                    <img
                        className="main-nav-logo-image"
                        src={logo}
                        alt="Argent Bank Logo"
                    />
                    <h1 className="sr-only">Argent Bank</h1>
                </a>
                <div>
                    { connected ?
                        <>
                            <a className="main-nav-item" href="./user">
                                <i className="fa fa-user-circle"></i>
                                Tony
                            </a>
                            <a className="main-nav-item" href="/">
                                <i className="fa fa-sign-out"></i>
                                Sign Out
                            </a>
                        </>
                        :
                        <a className="main-nav-item" href="/sign-in">
                            <i className="fa fa-user-circle"></i>
                            Sign In
                        </a>
                    }
                </div>
            </nav>
        </header>
    )
}

export default Header