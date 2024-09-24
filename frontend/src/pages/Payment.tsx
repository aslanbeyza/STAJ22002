import React, { useState } from 'react';
import { Container, Box, Typography, RadioGroup, FormControlLabel, Radio, Button, List, ListItem, ListItemText, Divider } from '@mui/material';

const addresses = [
  {
    id: 1,
    label: 'Ev',
    address: 'Ahmet Mah. Mehmetoğlu Sk., No: 1 Daire: 2, Ataşehir, İstanbul, Türkiye',
  },
  {
    id: 2,
    label: 'Ofis',
    address: 'Ayşe Mah. Fatmaoğlu Cad., No: 4 D: 4, Ataşehir, İstanbul, Türkiye',
  },
];

const products = [
  {
    id: 1,
    name: 'WHEY PROTEIN',
    description: '(Çilek / 410g)',
    price: 1098,
    imageUrl: 'https://via.placeholder.com/50',
  },
  {
    id: 2,
    name: 'ARGININE',
    description: '120g',
    price: 458,
    imageUrl: 'https://via.placeholder.com/50',
  },
];

const Payment = () => {
  const [selectedAddress, setSelectedAddress] = useState(addresses[0].id);
  
  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAddress(parseInt(event.target.value));
  };

  const subtotal = products.reduce((acc, product) => acc + product.price, 0);
  const shipping = 0; // Kargo ücreti
  const total = subtotal + shipping;

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: 5 }}>
        {/* Sol Panel */}
        <Box sx={{ flex: 3, marginRight: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            1 Adres
          </Typography>
          <Typography variant="h6" gutterBottom>
            Teslimat Adresi
          </Typography>
          <RadioGroup value={selectedAddress} onChange={handleAddressChange}>
            {addresses.map((address) => (
              <Box key={address.id} sx={{ marginBottom: 2 }}>
                <FormControlLabel
                  value={address.id}
                  control={<Radio />}
                  label={<Typography variant="body1" sx={{ fontWeight: 'bold' }}>{address.label}</Typography>}
                />
                <Typography variant="body2" sx={{ marginLeft: 4 }}>{address.address}</Typography>
                <Button variant="outlined" sx={{ marginLeft: 4, marginTop: 1 }}>Düzenle</Button>
                <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
              </Box>
            ))}
            <FormControlLabel value={0} control={<Radio />} label={<Typography variant="body1">Yeni Adres</Typography>} />
          </RadioGroup>
          <Button variant="contained" sx={{ backgroundColor: 'black', color: 'white', marginTop: 2, '&:hover': { backgroundColor: 'darkblack' } }}>
            Kargo ile Devam Et
          </Button>
        </Box>

        {/* Sağ Panel */}
        <Box sx={{ flex: 2, paddingLeft: 4, borderLeft: '1px solid #E5E5E5' }}>
          <Typography variant="h6" gutterBottom>
            <Box component="span" sx={{ fontWeight: 'bold' }}>Ara Toplam</Box>
            {' '}
            {subtotal.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
          </Typography>
          <List>
            {products.map((product) => (
              <ListItem key={product.id} sx={{ display: 'flex', alignItems: 'center' }}>
                <Box component="img" src={product.imageUrl} alt={product.name} sx={{ width: 50, height: 50, marginRight: 2 }} />
                <ListItemText
                  primary={product.name}
                  secondary={product.description}
                  primaryTypographyProps={{ fontWeight: 'bold' }}
                />
                <Typography variant="body2">{product.price.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</Typography>
              </ListItem>
            ))}
          </List>
          <Divider sx={{ marginY: 2 }} />
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Toplam
          </Typography>
          <Typography variant="h5">
            {total.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Payment;
