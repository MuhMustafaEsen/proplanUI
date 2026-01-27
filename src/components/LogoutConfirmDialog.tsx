import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography
} from "@mui/material";

interface Props {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const LogoutConfirmDialog = ({ open, onClose, onConfirm }: Props) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Çıkış Yap</DialogTitle>
            <DialogContent>
                <Typography>
                    Oturumu kapatmak istediğinize emin misiniz?
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Vazgeç</Button>
                <Button color="error" variant="contained" onClick={onConfirm}>
                    Çıkış Yap
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default LogoutConfirmDialog;
