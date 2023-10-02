import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  Alert,
} from '@mui/material';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

interface VacationData {
  title: string;
  start: string;
  end: string;
}

interface ModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: VacationData) => void;
}

export const Modal: React.FC<ModalProps> = ({ open, onClose, onSubmit }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    reset,
  } = useForm<VacationData>();

  const start = watch('start');

  const handleFormSubmit: SubmitHandler<VacationData> = (data) => {
    onSubmit(data);
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Solicitud de Vacaciones</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Grid
            item
            xs={12}
            sm={12}
            display={!!errors ? '' : 'none'}
          >
          </Grid>
          <Grid container>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Controller
                name="title"
                control={control}
                defaultValue="Vacaciones"
                rules={{ required: 'Este campo es requerido' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Título"
                    fullWidth
                  />
                )}
              />
              {errors.title && (
                <Alert severity="error">{errors.title.message}</Alert>
              )}
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Controller
                name="start"
                control={control}
                defaultValue=""
                rules={{ required: 'Este campo es requerido' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Fecha de inicio"
                    type="date"
                    fullWidth
                    focused
                    inputProps={{ min: new Date().toISOString().split('T')[0] }} // Evita fechas anteriores al día actual
                  />
                )}
              />
              {errors.start && (
                <Alert severity="error">{errors.start.message}</Alert>
              )}
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Controller
                name="end"
                control={control}
                defaultValue=""
                rules={{
                  required: 'Este campo es requerido',
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Fecha de fin"
                    type="date"
                    fullWidth
                    focused
                    inputProps={{ min: start }} // Evita fechas anteriores a la fecha de inicio
                  />
                )}
              />
              {errors.end && (
                <Alert severity="error">{errors.end.message}</Alert>
              )}
            </Grid>
            <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
              <Grid item xs={12} sm={12}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                >
                  Crear
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
