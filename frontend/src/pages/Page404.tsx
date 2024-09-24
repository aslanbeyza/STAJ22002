import { Link } from 'react-router-dom';
import { Box, Typography, Button, Container } from '@mui/material';

const Page404 = () => {
  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        textAlign="center"
        p={2}
      >
        <img
          src="https://miro.medium.com/v2/resize:fit:924/1*ZvwdIQkolJ2z1MILFrQjOQ.jpeg"
          alt="404 Not Found"
          style={{ width: '500px', height: 'auto', marginBottom: '20px', borderRadius:'20px' }}
        />
        <Typography variant="h1" component="h1" sx={{ fontSize: '3rem', color: '#333' }}>
          Sayfa Bulunamadı
        </Typography>
        <Button
          component={Link}
          to="/login"
          variant="contained"
          color="primary"
          sx={{ marginTop: '20px', textDecoration: 'none' }}
        >
          Giriş Sayfasına Dön
        </Button>
      </Box>
    </Container>
  );
};

export default Page404;
