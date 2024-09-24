import React from 'react';
import { Container, Box, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ReceiptIcon from '@mui/icons-material/Receipt';
import LocationOnIcon from '@mui/icons-material/LocationOn';

interface LayoutProps {
  children: React.ReactNode;
  onTabChange: (tab: string) => void;
}

const LayoutAccount: React.FC<LayoutProps> = ({ children, onTabChange }) => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: 5 }}>
        {/* Sidebar */}
        <Box sx={{ flex: 1, marginRight: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
            Hesabım
          </Typography>
          <List>
            <ListItem button onClick={() => onTabChange('account')}>
              <ListItemIcon>
                <AccountBoxIcon />
              </ListItemIcon>
              <ListItemText primary="Hesap Bilgilerim" />
            </ListItem>
            <ListItem button onClick={() => onTabChange('orders')}>
              <ListItemIcon>
                <ReceiptIcon />
              </ListItemIcon>
              <ListItemText primary="Siparişlerim" />
            </ListItem>
            <ListItem button onClick={() => onTabChange('address')}>
              <ListItemIcon>
                <LocationOnIcon />
              </ListItemIcon>
              <ListItemText primary="Adreslerim" />
            </ListItem>
          </List>
        </Box>

        {/* İçerik Alanı */}
        <Box sx={{ flex: 4 }}>
          {children}
        </Box>
      </Box>
    </Container>
  );
};

export default LayoutAccount;
