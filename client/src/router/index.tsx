import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import {Home, NotFound, Login, Profile} from '../views'
import {Header, Footer} from '../components'
import path from './path'
import {useAuthSelector} from '../store/authSlice.ts'

export default function Router() {
    const {userToken} = useAuthSelector()

    return (
        <Routes>
            <Route path={path.HOME} element={<Layout/>}>
                <Route index element={<Home/>}/>
                <Route path={path.LOGIN} element={userToken ? <Navigate to={path.PROFILE}/> : <Login/>}/> :
                <Route path={path.PROFILE} element={userToken ? <Profile/> : <Navigate to={path.LOGIN}/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Route>
        </Routes>
    )
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