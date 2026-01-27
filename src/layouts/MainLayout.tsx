import {Box,Toolbar} from "@mui/material";
import {useState} from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./sidebar";
import Topbar from "./Topbar";


const drawerWidth = 240;

export default function MainLayout(){
    const [mobileOpen,setMobileOpen] = useState(false)


    const handleDrawerToogle =() => {
        setMobileOpen(!mobileOpen);
    };

    return(
        <Box sx = {{ display:"flex"}}>
            <Topbar onMenuClick={handleDrawerToogle}/>

            <Sidebar
            mobileOpen = {mobileOpen}
            onClose={handleDrawerToogle} />
        
        <Box
        component="main"
        sx={{flexGrow:1,
            p:3,
            
            ml: { md: `${drawerWidth}px` }
        }}
        >
            <Toolbar/>
            <Outlet/>
            
          </Box>
        </Box>
    )
}