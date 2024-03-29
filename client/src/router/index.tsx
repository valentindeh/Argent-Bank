import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import {Home, NotFound, Login, Profile} from '../views'
import {Header, Footer} from '../components'
import path from './path'
import {logout, useAuthSelector} from '../store/authSlice.ts'
import {FC, PropsWithChildren} from 'react'
import {useAppDispatch} from '../store/hooks.ts'
import {jwtDecode, JwtPayload } from 'jwt-decode'

export default function Router() {
    return (
        <Routes>
            <Route path={path.HOME} element={<Layout/>}>
                <Route index element={<PublicRoute><Home/></PublicRoute>}/>
                <Route path={path.LOGIN} element={<PublicRoute><Login/></PublicRoute>}/>
                <Route path={path.PROFILE} element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
                <Route path="*" element={<NotFound/>}/>
            </Route>
        </Routes>
    )
}

const ProtectedRoute: FC<PropsWithChildren> = ({children}) => {
    const {userToken} = useAuthSelector()
    const dispatch = useAppDispatch()

    if (!userToken || !validateToken(userToken)) {
        console.log('ici')
        dispatch(logout())
        return <Navigate to={path.LOGIN}/>
    }

    return children
}

const PublicRoute: FC<PropsWithChildren> = ({children}) => {
    const {userToken} = useAuthSelector()

    if (userToken) {
        return <Navigate to={path.PROFILE}/>
    }

    return children
}

const validateToken = (token: string) => {
    const decoded = jwtDecode<JwtPayload>(token)

    if (!decoded.exp || decoded.exp * 1000 < Date.now()) {
        console.error('JWT token expired')
        return false
    }

    return true
}

function Layout() {
    return (
        <>
            <Header/>
            <main>
                <Outlet/>
            </main>
            <Footer/>
        </>
    )
}