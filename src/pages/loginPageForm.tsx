import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  TextField,
  Stack,
  Typography,
  Alert,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../core/auth/AuthProvider";
//import { useUI } from "../../core/ui/uiContext";
import { useFormValidation } from "../core/validatehooks/useFormValidation";
interface Props {
  open: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
}

const LoginDialog = ({ open, onClose,onSwitchToRegister }: Props) => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");

  useEffect(() => {
    if (!open) {
      setEmail("");
      setError("");
      setPassword("");
      setLoading(false);
    }
  },[open]);

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
      minLength: 1,
      message: "Şifre en az 6 karakter olmalıdır"
    }
  });

  const handleSubmit = async (e?:React.FormEvent) => {
    e?.preventDefault();
    setError("");

    if (!validateForm()) return;
    /*
    if (!email || !password) {
      setError("E-mail şifre zorunludur");
      return;
    }
    */
    try {
      setLoading(true);
      const user = await login(email, password);

      onClose();

      if (user.role.toLowerCase() === "admin") {
            navigate("/my-tasks", { replace: true });
      } else {
            navigate("/my-tasks", { replace: true });
      }
    } catch (error) {
      setError("Email veya şifre hatalı.");
    }finally {
      setLoading(false);
    }   
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Giriş Yap</DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1} component="form" onSubmit={handleSubmit}
        >
          {error && <Alert severity="error">{error}</Alert>}

          <TextField
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            error={!!errors.email}
            helperText={errors.email}
          />

          <TextField
            label="Şifre"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            error={!!errors.password}
            helperText={errors.password}
          />        
               
          <Button
            variant="contained"
            fullWidth
            type="submit"
            disabled={loading}
            //onClick={handleSubmit}
          >            
            {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
          </Button>

          <Typography variant="body2" align="center" mt={2}>
            Hesabın yok mu?{" "}
                <Typography
                    component="span"
                    color="primary"
                    sx={{ cursor: "pointer", fontWeight: "bold" }}
                    onClick={onSwitchToRegister}
                >
            Kaydol
            </Typography>
            </Typography>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
