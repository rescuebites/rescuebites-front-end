import { Routes, Route } from 'react-router-dom';
import { LoginPage } from '@/shared/pages/auth/LoginPage';
import { RegisterClientPage } from '@/modules/client/pages/RegisterClientPage';
import { AuthLayout } from '@/shared/pages/layouts/AuthLayout';
import { EmailPage } from '@/shared/pages/auth/EmailPage';
import { ActivateAccountPage } from '@/shared/pages/auth/ActivateAccountPage';

export function AuthRoutes(){
    return(
        <Routes>
            <Route element={<AuthLayout/>}
            >
                <Route path={"login"} element={<LoginPage/>}/>
                <Route path={"register-client"} element={<RegisterClientPage/>} />
                <Route path={"register/email-confirm"} element={<EmailPage/>} />
                <Route path={"activate"} element={<ActivateAccountPage/>} />
            </Route>
        </Routes>
    )
}