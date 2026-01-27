import { IconButton, Tooltip } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useTheme } from "@mui/material";
import { useThemeMode } from "../theme/ThemeContext";

const ThemeSwitch = () => {
    const theme = useTheme();
    const { toggleTheme } = useThemeMode();

    return (
        <Tooltip title="Tema Değiştir">
            <IconButton color="inherit" onClick={toggleTheme}>
                {theme.palette.mode === "dark"
                    ? <LightModeIcon />
                    : <DarkModeIcon />}
            </IconButton>
        </Tooltip>
    );
};

export default ThemeSwitch;
