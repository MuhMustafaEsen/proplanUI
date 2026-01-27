import {
  Box,
  Button,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import RegisterForm from "../pages/registerForm";
import LoginForm from "../pages/loginPageForm";
import logo from "../assets/logo.svg";

const Home = () => {
  const [openRegisterForm, setOpenRegisterForm] = useState(false);
  const [openLoginForm, setOpenLoginForm] = useState(false);

  const switchToRegister = () => {
  setOpenLoginForm(false);
  setOpenRegisterForm(true);
};

const switchToLogin = () => {
  setOpenRegisterForm(false);
  setOpenLoginForm(true);
};

const handleRegisterSuccess = () => {
  setOpenRegisterForm(false);
  setOpenLoginForm(true); // kayıt sonrası login
};
  return (
    <>
    <Box
      minHeight="100vh"
      display="flex"
      flexDirection={{ xs: "column", md: "row" }}
    >
      {/* SOL TARAF (LOGO) */}
      <Box
        flex={0.8}
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgcolor="#fff"
      >
      <Box
        component="img"
        src={logo}
        alt="Logo"  
        maxWidth={400}
        sx={{
          width: { xs: 240, md: 440 },
          height: "auto",
        }}
      />
      </Box>
      {/*
      <Box
        flex={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgcolor="#fff"
      >
        <Typography
          fontWeight="bold"
          fontSize={{ xs: 120, md: 220 }}
        >
          X
        </Typography>
      </Box>
      */}

      {/* SAĞ TARAF (AUTH) */}
      <Box
        flex={1.2}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box width="100%" maxWidth={420} px={3}>
          <Stack spacing={3}>
            <Typography variant="h3" fontWeight="bold">
              İŞİNİ TAKİP ET AKLINDA KALMASIN
            </Typography>

            <Typography variant="h5" fontWeight="bold">
              Hemen katıl.
            </Typography>

            <Button
              variant="contained"
              fullWidth
              onClick={() => setOpenRegisterForm(true)}
              sx={{
                textTransform: "none",
                py: 1.2,
                borderRadius: 5,
                bgcolor: "#2835e6ff",
                "&:hover": { bgcolor: "#111" },
              }}
            >
              Hesap oluştur
            </Button>

            <Divider>VEYA</Divider>

            <Box>
              <Typography fontWeight="bold" mb={1}>
                Zaten bir hesabın var mı?
              </Typography>

              <Button
                variant="outlined"
                fullWidth
                onClick={() => setOpenLoginForm(true)}
                sx={{ textTransform: "none", py: 1.2, borderRadius: 5 }}
              >
                Giriş yap
              </Button>

              <Typography variant="caption" color="text.secondary">
              Kaydolarak Hizmet Şartlarını ve Gizlilik Politikasını kabul etmiş
              olursunuz.
            </Typography>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Box>

    <RegisterForm
      open={openRegisterForm}
      onClose={() => setOpenRegisterForm(false)}
      onSwitchToLogin={switchToLogin}
      onSuccess={handleRegisterSuccess}
      />

    <LoginForm
      open={openLoginForm}
      onClose={() => setOpenLoginForm(false)}
      onSwitchToRegister={switchToRegister}
    />
    </>
  );
};


export default Home;
