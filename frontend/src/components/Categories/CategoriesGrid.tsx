import { Grid, Card, CardMedia, CardContent, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom'; // React Router'dan Link'i import ediyoruz

const categories = [
  { title: 'PROTEİN', image: 'assets/Homepage/1.png', path: 'protein' },
  { title: 'VİTAMİNLER', image: 'assets/Homepage/2.png', path: 'vitaminler' },
  { title: 'SAĞLIK', image: 'assets/Homepage/3.png', path: 'saglik' },
  { title: 'SPOR GIDALARI', image: 'assets/Homepage/4.png', path: 'spor-gidalari' },
  { title: 'GIDA', image: 'assets/Homepage/5.png', path: 'gida' },
  { title: 'TÜM ÜRÜNLER', image: 'assets/Homepage/6.png', path: 'tum-urunler' }
];

const CategoryCard = ({ title, image, path }: { title: string; image: string; path: string }) => (
  <Card sx={{ position: 'relative', marginTop: "25px", borderRadius: '10px', overflow: 'hidden', boxShadow: 3 }}>
    <CardMedia
      component="img"
      image={image}
      alt={title}
      sx={{
        height: { xs: '120px', sm: '150px', md: '200px' }, // Farklı ekran boyutları için yükseklik ayarı
        objectFit: 'fill', // Resmin tam olarak karta sığmasını sağlar
      }}
    />
    <CardContent
      sx={{
        position: 'absolute',
        bottom: { xs: '-45%', sm: '-70px', md: '-21%' }, 
        left: '65%',
        transform: 'translate(-50%,-50%)', // İçeriği ortalamak için
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Typography
        variant="h5"
        component="div"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          color: 'black',
          fontSize: { xs: '14px', sm: '16px', md: '18px' }, // Farklı ekran boyutları için yazı boyutu ayarı
        }}
      >
        {title}
      </Typography>
      <Button
        component={Link} // Link'i butona ekliyoruz
        to={`/category/${path}`} // Dinamik yönlendirme için path kullanıyoruz
        variant="contained"
        color="secondary"
        sx={{
          borderRadius: '10px',
          fontSize: { xs: '10px', sm: '12px', md: '14px' }, // Buton yazı boyutu ayarı
          padding: { xs: '6px 12px', sm: '8px 16px', md: '10px 20px' }, // Buton padding ayarı
          mb: { xs: '0px', sm: '20px', md: '20px' },
        }}
      >
        İNCELE
      </Button>
    </CardContent>
  </Card>
);

const CategoriesGrid = () => (
  <Container maxWidth="lg">
    <Grid container spacing={2} mb={6}>
      {categories.map((category) => (
        <Grid item xs={6} sm={4} md={4} key={category.title}>
          <CategoryCard title={category.title} image={category.image} path={category.path} />
        </Grid>
      ))}
    </Grid>
  </Container>
);

export default CategoriesGrid;
