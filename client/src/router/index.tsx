import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import {Home, NotFound, Login, Profile} from '../views'
import {Header, Footer} from '../components'
import path from './path'
import {useAuthSelector} from '../store/authSlice.ts'
import {FC, PropsWithChildren} from 'react'

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

    if (!userToken) {
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