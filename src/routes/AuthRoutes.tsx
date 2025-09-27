import { Routes, Route } from 'react-router-dom';
import { LoginPage } from '@/shared/pages/auth/LoginPage';
import { AuthLayout } from '@/shared/pages/layouts/AuthLayout';

export function AuthRoutes(){
    return(
        <Routes>
            <Route element={<AuthLayout/>}
            >
                <Route path={"login"} element={<LoginPage/>}/>
            </Route>
        </Routes>
    )
}