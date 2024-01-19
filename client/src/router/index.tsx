import {Outlet, Route, Routes} from 'react-router-dom'
import {Home, NotFound} from '../views'
import {Header, Footer} from '../components'
import path from './path'

export default function Index() {
    return (
        <Routes>
            <Route path={path.HOME} element={<Layout/>}>
                <Route index element={<Home/>}/>
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