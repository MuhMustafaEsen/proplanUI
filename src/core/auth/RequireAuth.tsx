import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { CircularProgress, Box } from "@mui/material";

interface Props {
    allowUserPaths?: string[];
    role?: string;
}

export const RequireAuth = ({ allowUserPaths, role }: Props) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    
    if (loading) {
    return (
             <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress />
             </Box>
           );
    }

    if (!user) {
        return <Navigate to="/home" state={{ from: location }} replace />;
    }
    const userRole = user.role?.toLowerCase();
    //loglar <SİLİNECEK>
    console.log("role :: ", role);
    console.log("userRole: ", userRole);
    console.log("eşitmi: ", role?.toLowerCase() === userRole);

    if (role && userRole !== role.toLowerCase()) {      
    return <Navigate to="/unauthorized" replace />;
    }
    
    if (!role && userRole === "admin") {
    return <Outlet />;
    }

    if (
    !role &&
    allowUserPaths &&
    allowUserPaths.includes(location.pathname)
    ) {
        
    return <Outlet />;
    }

    
    /*
    if (user.role.toLowerCase() === "admin") {
        return <Outlet />;
    }
    if (
        allowUserPaths &&
        allowUserPaths.includes(location.pathname)
     ) {
        return <Outlet />;
    }
    */
    return <Navigate to="/unauthorized" replace />;
    /*
    if(!user) return <Navigate to="/login" replace />
    //console.log("message : " + role?.toString());
    if (role && user.role.toLowerCase() !== role.toLowerCase()) return <Navigate to="/unauthorized" replace/>

    return <Outlet/>;
    */
};