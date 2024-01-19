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
    DialogContentText,
} from '@mui/material';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Usuarios } from '../../store/types/authTypes';
import { useAppDispatch } from '../../store/hooks';
import { createEventEmployee } from '../../store/events/thunks';

interface VacationData {
    title: string;
    start: string;
    end: string;
    ci: string;
}

interface ModalEmployeeProps {
    open: boolean;
    onClose: () => void;
    user: Usuarios;
    title: string;
}

export const ModalEmployee: React.FC<ModalEmployeeProps> = ({ open,
    onClose,
    user,
    title, }) => {
    const {
        handleSubmit,
        control,
        formState: { errors },
        watch,
        reset,
    } = useForm<VacationData>();
    const dispatch = useAppDispatch();

    const start = watch('start');

    const handleFormSubmit: SubmitHandler<VacationData> = (data) => {
        const { _id : uid } = user || { _id: '' };
        const dataConCi = {
            ...data,
            uid: uid,
        };
        // console.log(dataConCi);
        dispatch(createEventEmployee(dataConCi));
        reset();
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{title} :</DialogTitle>
            <DialogContent>
                <DialogContentText
                    sx={{
                        textAlign: 'center',
                        marginBottom: 0,
                        textDecoration: 'underline',
                    }}
                >
                    {user.name}
                </DialogContentText>
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
                                defaultValue="Vacaciones generada por el jefe  "
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
