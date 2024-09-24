// src/pages/auth/LoginRegister.tsx
import React, { useState } from "react";
import {
  Container,
  Grid,
  Tabs,
  Tab,
  TextField,
  Button,
  Box,
} from "@mui/material";
import "./LoginRegister.css";
import { useNavigate, Link } from 'react-router-dom';
import Cookies from "js-cookie";
import Typography from "@mui/material/Typography";
import { loginUser, registerUser } from "../../api/auth";

const LoginRegister: React.FC = () => {
  const [tabValue, setTabValue] = useState(0); // Login veya Register sekmesi
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    password2: "",
    api_key: "664932", // API key
  });
  const navigate = useNavigate();

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.password2) {
      alert("Şifreler eşleşmiyor");
      return;
    }

    try {
      const registeredUser = await registerUser(formData);
      console.log("Kullanıcı başarıyla kaydedildi:", registeredUser);
      setTabValue(0); // Kayıt başarılı olursa giriş sekmesine yönlendir
    } catch (error) {
      console.error("Kayıt sırasında hata oluştu:", error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const loggedInUser = await loginUser(formData);
      console.log("Kullanıcı başarıyla giriş yaptı:", loggedInUser);
      // Access ve Refresh token'ları Cookies'e kaydet
      Cookies.set("accessToken", loggedInUser.access_token);
      Cookies.set("refreshToken", loggedInUser.refresh_token);
      navigate("/home");
    } catch (error) {
      console.error("Kullanıcı giriş yapamadı:", error);
    }
  };
  return (
    <Container maxWidth="sm" className="login-register-container" sx={{
      width: { xs: "90%", sm: "60%", md: "60%" },
      marginTop: { xs: "20", sm: "110px", md: "110px" },
     
     }}>  
        <Box className="tabs-container"sx={{ position: 'relative', padding: 0, margin:0 }}>  
        <Tabs value={tabValue} onChange={handleChange} centered sx={{
          position: 'absolute',
          top: -64,
          width: '100%',
          borderBottom: 'none', /* Eğer tabların altında bir border varsa kaldır */
        }} >  
          <Tab sx={{ textTransform: 'none',border: '2px solid #F3F3F3', flexGrow: 1, marginRight: 2, /* Sağ boşluk ekle */ }} label="Giriş Yap"   className={ `${tabValue === 0 ? 'tab-selected' : 'tab'}`} />
          <Tab label="Üye Ol"  className={ `${tabValue === 1 ? 'tab-selected' : 'tab'}`} sx={{ textTransform: 'none',border: '1px solid #F3F3F3', flexGrow: 1 }} />
        </Tabs>
      </Box>
      <Grid container spacing={3} className="form-container">
        {tabValue === 0 ? (
        <LoginForm handleInputChange={handleInputChange} handleLogin={handleLogin} />  
        ) : (
           <RegisterForm handleInputChange={handleInputChange} handleRegister={handleRegister} /> 
        )}
      </Grid>
    </Container>
  );
};

const LoginForm: React.FC<{
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleLogin: (e: React.FormEvent) => void;
}> = ({ handleInputChange, handleLogin }) => (
  <>
   <Grid item xs={12}>
    <Typography variant="body1" sx={{ marginY: '8px' ,fontWeight:'500',color:'#222222'}}>
        *E-Posta
      </Typography>
      <TextField
        fullWidth
        name="email"
        variant="outlined"
        onChange={handleInputChange}
        sx={{ backgroundColor: '#F7F7F7', '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#E5E5E5' } } }}
      />
    </Grid>
    <Grid item xs={12}>
    <Typography variant="body1" sx={{ marginY: '8px' ,fontWeight:'500',color:'#222222'}}>
        *Şifre
      </Typography>
      <TextField
        fullWidth
        name="password"
        type="password"
        variant="outlined"
        onChange={handleInputChange}
        sx={{ backgroundColor: '#F7F7F7', '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#E5E5E5' } } }}
      />
    </Grid>
    <Grid item xs={12} textAlign="right">
      <Button variant="text" sx={{ textUnderlineOffset: '4px',textTransform: 'none', textDecoration:'underline',color: '#000000', '&:hover': { color: '#000000',textDecoration:'underline' } }}>Şifremi Unuttum?</Button>
    </Grid>
    <Grid item xs={12}>
      <Button
        fullWidth
        variant="outlined"
        onClick={handleLogin}
        sx={{ backgroundColor: '#000000',color:'white',height:'55px', '& .MuiOutlinedInput-root': { '& fieldset': { border:'none' } }, '&:hover fieldset': {
          border:'none', // Hover durumunda border rengini değiştirmemek için
        }, '&:hover': {
          backgroundColor: '#000000', // Hover durumunda arka plan rengini değiştirmemek için
        },}}
      >
        GİRİŞ YAP
      </Button>
    </Grid>
  </>
);

const RegisterForm: React.FC<{
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRegister: (e: React.FormEvent) => void;
}> = ({ handleInputChange, handleRegister }) => (
  <>
    <Grid item xs={12} sm={6}>
    <Typography variant="body1" sx={{fontWeight:'500',color:'#222222', marginY: '8px'}}>
        Ad
      </Typography>
      <TextField
        fullWidth
        name="first_name"
        variant="outlined"
        onChange={handleInputChange}
        sx={{fontWeight:'500',color:'#222222', backgroundColor: '#F7F7F7', '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#E5E5E5' } } }}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
    <Typography variant="body1" sx={{ fontWeight:'500',color:'#222222',marginY: '8px' }}>
        Soyad
      </Typography>
      <TextField
        fullWidth
        name="last_name"
        variant="outlined"
        onChange={handleInputChange}
        sx={{fontWeight:'500',color:'#222222', backgroundColor: '#F7F7F7', '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#E5E5E5' } } }}      />
    </Grid>
    <Grid item xs={12}>
    <Typography variant="body1" sx={{fontWeight:'500',color:'#222222', marginY: '8px' }}>
        E-Posta
      </Typography>
      <TextField
        fullWidth
        name="email"
        variant="outlined"
        onChange={handleInputChange}
        sx={{ backgroundColor: '#F7F7F7', '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#E5E5E5' } } }}
        />
    </Grid>
    <Grid item xs={12}>
    <Typography variant="body1" sx={{ fontWeight:'500',color:'#222222',marginY: '8px' }}>
      Şifre
      </Typography>
      <TextField
        fullWidth
        name="password"
        type="password"
        variant="outlined"
        onChange={handleInputChange}
        sx={{fontWeight:'500',color:'#222222', backgroundColor: '#F7F7F7', '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#E5E5E5' } } }}
      />
    </Grid>
    <Grid item xs={12}>
    <Typography variant="body1" sx={{ fontWeight:'500',color:'#222222',marginY: '8px' }}>
      Şifre Tekrar
      </Typography>
      <TextField
        fullWidth
        name="password2"
        type="password"
        variant="outlined"
        onChange={handleInputChange}
        sx={{fontWeight:'500',color:'#222222', backgroundColor: '#F7F7F7', '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#E5E5E5' } } }}

      />
    </Grid>
    <Grid item xs={12}>
      <Button fullWidth variant="outlined" onClick={handleRegister}         sx={{
          backgroundColor: '#000000',
          color: 'white',
          height: '55px',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              border: 'none',
            },
          },
          '&:hover': {
            backgroundColor: '#000000', // Hover durumunda arka plan rengini değiştirmemek için
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                border: 'none', // Hover durumunda border rengini değiştirmemek için
              },
            },
          },
        }}
>
        Üye Ol
      </Button>
      <Typography variant="body1" sx={{ marginY: '18px' }}>
      Zaten hesabınız var mı?   <Link
      to="/login"
      style={{ color: '#2126AB', cursor: 'pointer', textDecoration:'none',}}
    >
      Giriş Yap
    </Link>
      </Typography>
    </Grid>
  </>
);

export default LoginRegister;
