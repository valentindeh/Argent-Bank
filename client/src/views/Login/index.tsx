import React, {useState} from 'react'
import {login, useAuthSelector} from '../../store/authSlice.ts'
import {useAppDispatch} from '../../store/hooks.ts'

function Login() {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [rememberMe, setRememberMe] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const {loading, error} = useAuthSelector()

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        console.warn(rememberMe)
        dispatch(login({username, password, rememberMe}))
    }

    return (
        <section className="sign-in-content">
            <i className="fa fa-user-circle sign-in-icon"></i>
            <h1>Sign In</h1>
            <form onSubmit={onSubmit}>
                <div className="input-wrapper">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" onChange={e => setUsername(e.target.value)}/>
                </div>
                <div className="input-wrapper">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" onChange={e => setPassword(e.target.value)}/>
                </div>
                <div className="input-remember">
                    <input type="checkbox" id="remember-me" defaultChecked={rememberMe} onInput={() => setRememberMe(!rememberMe)}/>
                    <label htmlFor="remember-me">Remember me</label>
                </div>
                <button className="sign-in-button" disabled={loading}>Sign In</button>
                {error && <p>{error}</p>}
            </form>
        </section>
    )
}

export default Login
