import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../core/auth/AuthProvider";
import { navItems } from "./navItems/navItems";

const drawerWidth = 240;

interface Props {
    mobileOpen: boolean;
    onClose: () => void;
}

export default function Sidebar({ mobileOpen, onClose }: Props) {
    const location = useLocation();
    const { user } = useAuth();
    
    

    /*
    const navItems = [
        { text: "Firmalar", to: "/companies" },    
        { text: "Görev Tanimlari", to: "/tasks-definitions" },
        { text: "Alt Görev Tanimlari", to: "/subtasks-definitions" },
        { text: "Aylik Görev Planı", to: "/company-tasks" },
        //{ text: "Görev Ataması Yapma", to: "/task-assignments2" },
        { text: "Görev Takibi Görev Atama(Admin)", to: "/task-assignments" },
        { text: "Görevlerim", to: "/my-tasks" },
        { text: "Görev tamamlama", to: "/tasks" },
        { text: "Dashboard", to: "/dashboard" },
    ];
    */

    if (!user) return null;
    const role = user.role.toLowerCase() as "admin" | "user";

    const visibleItems = navItems.filter((item) =>
        item.roles.includes(role)
    );

    const drawer = (
        <>
            <Toolbar />
            <List>
        {visibleItems.map((item) => {
          const isActive = location.pathname === item.to;

          return (
            <ListItem key={item.to} disablePadding>
              <ListItemButton
                component={Link}
                to={item.to}
                onClick={onClose}
                sx={{
                  backgroundColor: isActive
                    ? "primary.main"
                    : "transparent",
                  color: isActive ? "white" : "inherit",
                  "&:hover": {
                    backgroundColor: isActive
                      ? "primary.dark"
                      : "action.hover",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: isActive ? "white" : "inherit",
                    minWidth: 40,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
        </>
    );

    return (
        <>
            {/* Mobil drawer */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={onClose}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: "block", md: "none" },
                    "& .MuiDrawer-paper": { width: drawerWidth },
                }}
            >
                {drawer}
            </Drawer>

            {/* Desktop drawer */}
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: "none", md: "block" },
                    "& .MuiDrawer-paper": { width: drawerWidth },
                }}
                open
            >
                {drawer}
            </Drawer>
        </>
    );
}
/*eskisi alta daha pratik yukarıdaki

import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Toolbar
} from "@mui/material";
import  {Link} from "react-router-dom";

const drawerWidth = 240;

interface Props {
    mobileOpen:boolean;
    onClose:() => void;
}

export default function Sidebar({mobileOpen,onClose}:Props){
    const drawer = (
        <>
        <Toolbar/>
            <List>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to = "/companies">
                    <ListItemText primary="Firmalar" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton component={Link} to = "/tasks">
                    <ListItemText primary="Görevler" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton component={Link} to = "/tasks-definitions">
                    <ListItemText primary="Görev Tanimlari" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton component={Link} to = "/company-tasks">
                    <ListItemText primary="Aylik Görev Planı" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton component={Link} to = "/task-assignments">
                    <ListItemText primary="Görev Takibi (Admin)" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton component={Link} to = "/my-tasks">
                    <ListItemText primary="Görevlerim" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton component={Link} to = "/dashboard">
                    <ListItemText primary="Dashboard" />
                    </ListItemButton>
                </ListItem>
            </List>
        </>
    );

    return(
        <>
        { // Mboil }
        <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps = {{ keepMounted:true}}
        sx={{
            display :{xs:"block",md:"none"},
            "& .MuiDrawer-paper":{width:drawerWidth}
        }}>
            {drawer}
        </Drawer>

        {// Web }
        <Drawer
        variant="permanent"
        sx={{
            display :{xs:"none",md:"block"},
            "& .MuiDrawer-paper":{width:drawerWidth}
        }}
        open>
            {drawer}
        </Drawer>
        </>
    );
} 
*/