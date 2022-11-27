import {  Navigate, Outlet,  Route, Routes,} from 'react-router-dom'

import  SignIn  from './pages/SignIn/index.jsx'
import  SignUp  from './pages/SignUp/index.jsx'
import  Home  from './pages/Home/index.jsx'
import  Clientes from './pages/Clientes/index.jsx'
import  Cobrancas from './pages/Cobrancas/index.jsx'
import  { UserProvider } from './context/UserContext'

function ProtectedRoutes({ redirectTo }){
    const token = localStorage.getItem('token')

    return  token ? <Outlet /> : <Navigate to={redirectTo} />
}

export default function MyRoutes(){
    return (
        <UserProvider>
        <Routes>
            <Route path='/' element={ <SignIn/>}> </Route>

            <Route path='/SignUp' element={ <SignUp/>}> </Route>

            <Route path='/SignIn' element={ <SignIn/>}> </Route>

            <Route>

                <Route path='/home' element={<ProtectedRoutes redirectTo='/'/>}>
                    <Route path='/home' element={<Home/>}></Route>
                </Route>

                <Route path='/clientes' element={<ProtectedRoutes redirectTo='/'/>}>
                    <Route path='/clientes' element={<Clientes/>}></Route>
                    </Route>
                   
                    <Route path='/cobrancas' element={<ProtectedRoutes redirectTo='/'/>}>
                    <Route path='/cobrancas' element={<Cobrancas/>}></Route>
                    </Route>
                    
            </Route>

        

        </Routes>
        </UserProvider>
    )
}

