import {
    Card,
    CardContent,
    TextField,
    Button,
    Stack,
    Typography
} from "@mui/material";
import { useState } from "react";
//import api from "../../api/axios";

export default function ChangePasswordForm() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            /*await api.post("/auth/change-password", {
                currentPassword,
                newPassword
            });
            */
            alert("Şifre başarıyla değiştirildi");
            setCurrentPassword("");
            setNewPassword("");
        } catch {
            alert("Şifre değiştirilemedi");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card sx={{ mt: 3 }}>
            <CardContent>
                <Typography variant="h6">Şifre Değiştir</Typography>

                <Stack spacing={2} mt={2}>
                    <TextField
                        label="Mevcut Şifre"
                        type="password"
                        value={currentPassword}
                        onChange={e => setCurrentPassword(e.target.value)}
                    />
                    <TextField
                        label="Yeni Şifre"
                        type="password"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                    />

                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        Kaydet
                    </Button>
                </Stack>
            </CardContent>
        </Card>
    );
}
