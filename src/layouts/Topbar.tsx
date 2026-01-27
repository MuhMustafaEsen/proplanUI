import {
    Box,
    AppBar,
    Toolbar,
    IconButton,
    Typography    
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import UserMenu from "../components/UserMenu";
import ThemeSwitch from "../components/ThemeSwitch";

interface Props {
    onMenuClick:() => void;
}

export default function Topbar ({onMenuClick}:Props) {
    return(
        <AppBar
        position="fixed"
        sx={{zIndex:(theme) => theme.zIndex.drawer + 1}}>
            <Toolbar>
                {/* sidebarToggle */}
                <IconButton
                color="inherit"
                edge="start"
                onClick={onMenuClick}
                sx={{mr:2,display:{md:"none"} }}
                >
                <MenuIcon />
                </IconButton>
                <Typography variant="h5" noWrap>
                    İŞ TAKİP SİSTEMİ
                </Typography>

                <Box sx={{ flexGrow: 1 }} />

                {/* AVATAR MENU */}
                <ThemeSwitch />
                <UserMenu />
            </Toolbar>
        </AppBar>
    )
}