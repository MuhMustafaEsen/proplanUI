import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import type { User } from "../core/models/User";
import { userService } from "../core/api/user.service";
import { useUI } from "../core/ui/uiContext";
import { useFormValidation } from "../core/validatehooks/useFormValidation";

interface Props {
  open: boolean;
  user?: User | null;
  onClose: () => void;
  onSuccess: () => void;
  onSwitchToLogin:() => void;
}

const registerForm = ({ open, onClose,onSuccess,onSwitchToLogin,user }: Props) => {
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [email,setEmail] = useState("");
    const [phone,setPhone] = useState("");
    const [passwordH,setPasswordH] = useState("");
    const [createdAt,setCreadAt] = useState("");
    const [role,setRole] = useState("");

    const { showMessage } = useUI();
    
    useEffect(() => {
        if (user) {
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setEmail(user.email);
            setPhone(user.phone);
            setPasswordH(user.passwordH)
            setCreadAt(user.createdAt)
            setRole(user.role)
        }else{
            setFirstName("");
            setLastName("");
            setEmail("");
            setPhone("");
            setPasswordH("")
            setCreadAt(new Date().toISOString())
            setRole("User")
        }
        showMessage("");
    },[user,open]);

    const values = {
    firstName,
    lastName,
    email,
    phone,
    passwordH
  };

    const { errors, validateForm } = useFormValidation(values, {
      firstName: {
        required: true,
        minLength: 2,
        message: "Ad en az 2 karakter olmalıdır"
      },
      lastName: {
        required: true,
        minLength: 2,
        message: "Soyad en az 2 karakter olmalıdır"
      },
      email: {
        required: true,
        minLength: 5,
        message: "Geçerli bir e-posta giriniz"
      },
      phone: {
        required: true,
        minLength: 10,
        message: "Telefon numarası geçerli değil"
      },
      passwordH: {
        required: true,
        minLength: 6,
        message: "Şifre en az 6 karakter olmalıdır"
      }
    });
    const handleSave = async () => {   

       if (!validateForm()) {
            showMessage("Lütfen formu kontrol edin", "warning");
            return;
        }

           try {
            await userService.create({
             firstName,
             lastName,
             phone,
             email,
             passwordH,
             createdAt,
             role          
            })
         //console.log("REGISTER USER:" + firstName + lastName + phone +" "+ passwordH +email+createdAt);
         showMessage("Kayıt başarılı oldu giriş yapabilirsiniz."); 
         onSuccess();
         onClose();
           } catch {
            showMessage("Kayıt sırasında bir hata oluştu");
           }

  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle fontWeight="bold">
        Hesap Oluştur
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Ad"
            name="firstName"
            fullWidth
            margin="normal"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            error={!!errors.firstName}
            helperText={errors.firstName}
          />

          <TextField
            label="Soyad"
            name="lastName"
            fullWidth
            margin="normal"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            error={!!errors.lastName}
            helperText={errors.lastName}
          />

          <TextField
            label="E-posta"
            name="email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
          />

          <TextField
            label="Telefon"
            name="phone"
            fullWidth
            margin="normal"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            error={!!errors.phone}
            helperText={errors.phone}
          />

          <TextField
            label="Şifre"
            name="password"
            fullWidth
            margin="normal"
            value={passwordH}
            onChange={(e) => setPasswordH(e.target.value)}
            error={!!errors.passwordH}
            helperText={errors.passwordH}
          />

          <Typography variant="body2" align="center">
            Zaten hesabın var mı?{" "}
            <Typography
              component="span"
              color="primary"
              sx={{ cursor: "pointer", fontWeight: "bold" }}
              onClick={onSwitchToLogin}
            >
              Giriş yap
            </Typography>
          </Typography>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} color="inherit">
          İptal
        </Button>

        <Button
          variant="contained"
          onClick={handleSave}
          sx={{ textTransform: "none" }}
        >
          Kaydol
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default registerForm;
