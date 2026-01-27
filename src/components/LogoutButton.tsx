import { IconButton, Tooltip } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../core/auth/AuthProvider";

const LogoutButton = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/login", { replace: true });
    };
        
    return (
        //eski hali
        /*
                <Button
                    color="inherit"
                    startIcon={<LogoutIcon />}
                    onClick={handleLogout}
                >
        Çıkış
        </Button>
        */
        
        <Tooltip title="Çıkış Yap">
            <IconButton
                color="inherit"
                onClick={handleLogout}
                sx={{
                    ml: 1,
                    "&:hover": {
                        backgroundColor: "rgba(255,255,255,0.15)"
                    }
                }}
            >
                <LogoutIcon />
            </IconButton>
        </Tooltip>
        
    );
};

export default LogoutButton;
