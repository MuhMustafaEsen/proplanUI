import {
    Avatar,
    Menu,
    MenuItem,
    IconButton,
    Typography,
    //Box,
    Divider,
    Tooltip,
    useTheme
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../core/auth/AuthProvider";
import LogoutConfirmDialog from "../components/LogoutConfirmDialog";

const UserMenu = () => {
    const { user, logout } = useAuth();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [openConfirm, setOpenConfirm] = useState(false);
    const navigate = useNavigate();
    const theme = useTheme();

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogoutClick = () => {
        handleMenuClose();
        setOpenConfirm(true);
    };

    const handleLogoutConfirm = async () => {
        await logout();
        navigate("/login", { replace: true });
    };

    return (
        <>
            <Tooltip title="Hesap">
                <IconButton
                    onClick={handleMenuOpen}
                    sx={{
                        ml: 1,
                        "&:hover": {
                            backgroundColor:
                                theme.palette.mode === "dark"
                                    ? "rgba(255,255,255,0.15)"
                                    : "rgba(0,0,0,0.08)"
                        }
                    }}
                >
                    <Avatar sx={{ width: 32, height: 32 }}>
                        {user?.email?.charAt(0).toUpperCase()}
                    </Avatar>

                    <Typography
                        variant="body2"
                        sx={{ ml: 1, display: { xs: "none", sm: "block" } }}
                    >
                        {user?.email}
                    </Typography>
                </IconButton>
            </Tooltip>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <MenuItem disabled>
                    <PersonIcon fontSize="small" sx={{ mr: 1 }} />
                    {user?.role}
                </MenuItem>

                <Divider />

                <MenuItem
                     onClick={() => {
                        navigate("/profile");
                        handleMenuClose();
                        }}
                >
            <PersonIcon fontSize="small" sx={{ mr: 1 }} />
                 Profil
                </MenuItem>

                <MenuItem onClick={handleLogoutClick}>
                    <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
                    Çıkış Yap
                </MenuItem>
            </Menu>

            <LogoutConfirmDialog
                open={openConfirm}
                onClose={() => setOpenConfirm(false)}
                onConfirm={handleLogoutConfirm}
            />
        </>
    );
};

export default UserMenu;
