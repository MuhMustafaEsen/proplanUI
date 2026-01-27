import {
    Box,
    Card,
    CardContent,
    Typography,
    Divider
} from "@mui/material";
import { useAuth } from "../../core/auth/AuthProvider";
import ChangePasswordForm from "./ChangePasswordForm";

export default function ProfilePage() {
    const { user } = useAuth();

    return (
        <Box maxWidth={500}>
            <Card>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Profil Bilgilerim
                    </Typography>

                    <Divider sx={{ mb: 2 }} />

                    <Typography><b>Email:</b> {user?.email}</Typography>
                    <Typography><b>Rol:</b> {user?.role}</Typography>
                    <Typography><b>ID:</b> {user?.id.toString()}</Typography>
                </CardContent>
            </Card>

            <ChangePasswordForm />
        </Box>
        
    );
}
