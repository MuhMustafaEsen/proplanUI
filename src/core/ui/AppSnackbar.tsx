import {Alert,Snackbar} from "@mui/material";
import {useUI} from "./uiContext";

export default function AppSnackbar() {
    const {message,type,clear} = useUI();

    return (
        <Snackbar 
        open={!!message} 
        autoHideDuration={3000} 
        onClose={clear}
        anchorOrigin={{vertical:"bottom",horizontal:"center"}}>
            <Alert severity={type} onClose={clear}>
                {message}
            </Alert>
        </Snackbar>
    );
}