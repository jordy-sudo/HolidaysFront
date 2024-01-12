import React, { ReactNode } from 'react';
import { Grid, Typography } from '@mui/material';

interface AuthLayoutProps {
  children: ReactNode;
  title?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title = '' }) => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }}
    >
      <Grid
        item
        className="box-shadow"
        xs={12} 
        sm={6} 
        sx={{
          backgroundColor: 'white',
          padding: 3,
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', 
        }}
      >
        <img src="/Logo.png" alt="Logo" style={{ maxWidth: '250px', marginBottom: '10px' }} />

        <Typography variant="h5" sx={{ mb: 1 }}>
          {title}
        </Typography>
        {children}
      </Grid>
    </Grid>
  );
};
