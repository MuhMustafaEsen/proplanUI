//Bu LOGİN KULLANILMIYOR <SİLİNECEK>
import {
    Button,
    Container,
    TextField,
    Typography,
    Box,
    Alert,
} from "@mui/material";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../core/auth/AuthProvider";
import { useUI } from "../../core/ui/uiContext";
import { useFormValidation } from "../../core/validatehooks/useFormValidation";

export default function LoginPage(){
    const {login,user} = useAuth();
    const navigate = useNavigate();

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    //yeni eklenenler
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState("");

    useEffect(() => {
        if (user) {
            navigate("/my-tasks",{replace:true})
        }
    },[user,navigate]);

    const values = {
        email,
        password
    };

    const { errors, validateForm } = useFormValidation(values, {
        email: {
          required: true,
          minLength: 5,
          message: "Email zorunludur"
        },
        password: {
          required: true,
          minLength: 6,
          message: "Şifre en az 6 karakter olmalıdır"
        }
    });

    const handleSubmit = async (e?: React.FormEvent) => {
        e?.preventDefault();
        setError("");

        if (!validateForm()) return;
        
        /*
        if (!email || !password) {
            setError("Email şifre zorunlu");
            return;
        }
        */
       
        try {
            setLoading(true)
            const user = await login(email,password);

            if (user.role.toLowerCase() === "admin") {
                navigate("/dashboard", { replace: true });
            } else {
                navigate("/companies", { replace: true });
            } 

        }catch (err: any) {
                setError("Email veya şifre hatalı.");
        }finally {
                setLoading(false);  
        }             
    };

    return (
        <Container maxWidth="xs">
            <Box component="form" onSubmit={handleSubmit} sx={{mt:10}}>
                <Typography variant="h5" gutterBottom>
                    Giriş Yap
                </Typography>

                    {error && <Alert severity="error">{error}</Alert>}

                <TextField label="Email"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                />


                <TextField label="Şifre"
                type="password"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                />

                <Button
                fullWidth
                variant="contained"
                type="submit"
                sx={{mt:2}}
                disabled={loading}
                //onClick={handleSubmit}
                >
                     {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
                </Button>
            </Box>
        </Container>
    );
}