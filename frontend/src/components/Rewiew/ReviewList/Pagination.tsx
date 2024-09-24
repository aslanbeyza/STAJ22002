import React from 'react';
import { Pagination, Stack } from '@mui/material';

const Pages: React.FC = () => {
  return (
    <Stack spacing={2} sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
      <Pagination count={10} color="primary" />
    </Stack>
  );
};

export default Pages;
