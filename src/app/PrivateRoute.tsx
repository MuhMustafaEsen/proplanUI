/*<SİLİNECEK>
import { Navigate } from "react-router-dom";
import { useAuth } from "../core/auth/AuthProvider";
import React from "react";
interface Props {
    children: React.ReactNode;
}

export const PrivateRoute = ({ children }: Props) => {
    const { user,loading } = useAuth();

    if (loading) {
        return null;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};
*/