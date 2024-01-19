import React from 'react';
import { Grid, Typography } from '@mui/material';
import { AddTaskOutlined } from '@mui/icons-material';

export const NothingSelected: React.FC = () => {
  return (
    <Grid
      className="animate__animated animate__fadeIn"
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: 'calc(100vh - 110px)', backgroundColor: 'primary.main', borderRadius: 3 }}
    >
      <Grid item xs={12}>
        <AddTaskOutlined sx={{ fontSize: 100, color: 'white' }} />
      </Grid>
      <Grid item xs={12}>
        <Typography color="white" variant="h5">
          En El boton Rojo puedes acceder a una solicitud de vacaciones
        </Typography>
      </Grid>
    </Grid>
  );
};
