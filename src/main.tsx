/*
import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
*/
import React from "react";
import ReactDOM from "react-dom/client";
import { /*ThemeProvider,*/ CssBaseline } from '@mui/material';
//import {theme} from "./theme/theme";
import { AuthProvider } from "./core/auth/AuthProvider";
import AppRouter from "./app/router";
import { UIProvider } from "./core/ui/uiContext";
import { ThemeModeProvider } from "./theme/ThemeContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
<React.StrictMode>
  <ThemeModeProvider>
  <UIProvider>
    
    <CssBaseline/>
    <AuthProvider>
      <AppRouter/>
    </AuthProvider>
  
  </UIProvider>
  </ThemeModeProvider>
</React.StrictMode>

);
/*
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
  */
