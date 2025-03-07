import { Navigate, Route, Routes } from 'react-router-dom';
import { META_AUTH } from "../store";
import { DashboardRoutes } from "../dashboard";
import { AuthRoutes } from "../auth";
import { useAuth } from "../hooks";
import { useEffect, useState } from 'react';

export const AppRouter = () => {

    const { status } = useAuth();
    const [authStatus, setAuthStatus] = useState(false);

    useEffect(() => {
        setAuthStatus(localStorage.getItem('auth-status'))
    }
    , []);


    return (
        <Routes>
            {
                ( authStatus === true || status === META_AUTH.AUTHENTICATED)
                ? <Route path="/*" element={<DashboardRoutes />} />
                : <Route path="/auth/*" element={<AuthRoutes />} />
            }
            <Route path="/*" element={ <Navigate to='/auth/login' /> } />
        </Routes>
    )

}