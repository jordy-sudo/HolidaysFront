import { Button, Grid, TextField, Alert } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { AuthLayout } from '../layout/AuthLayout';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { startLoginWithEmailPassword } from '../../store/auth/thunks';
import { RootState } from '../../store/store';

export const LoginPage = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useAppDispatch();
  const { errorMessage } = useAppSelector((state: RootState) => state.auth);

  const onSubmit = (data: any) => {
    const { email, password } = data;
    dispatch(startLoginWithEmailPassword({ email, password }))
  };

  return (
    <AuthLayout title="Login">
      <form onSubmit={handleSubmit(onSubmit)} className="animate__animated animate__fadeIn">
        <Grid
          item xs={12}
          sm={12}
          display={!!errorMessage ? '' : 'none'}
        >
          <Alert severity="error">{errorMessage}</Alert>
        </Grid>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{ required: 'Este campo es requerido' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Correo"
                  type="email"
                  placeholder="correo@google.com"
                  fullWidth
                />
              )}
            />
            {errors.email && <Alert severity="error">{String(errors.email.message)}</Alert>}
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{ required: 'Este campo es requerido' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Contraseña"
                  type="password"
                  placeholder="password"
                  fullWidth
                />
              )}
            />
            {errors.password && <Alert severity="error">{String(errors.password.message)}</Alert>}
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
              >
                Ingresar
              </Button>
            </Grid>
          </Grid>

        </Grid>
      </form>
    </AuthLayout>
  );
};
