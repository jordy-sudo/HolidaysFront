import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    useTheme,
    Button
} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { Usuarios } from '../../store/types/authTypes';
import { formatDateHelp } from '../helpers/FormateDate';
import { useAppDispatch } from '../../store/hooks';
import { updateUserInfo } from '../../store/auth/thunks';

interface UserDetailsModalProps {
    open: boolean;
    onClose: () => void;
    user: Usuarios;
    title: string;
}

export const UserModal: React.FC<UserDetailsModalProps> = ({
    open,
    onClose,
    user,
    title,
}) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [editedUser, setEditedUser] = useState<Usuarios>(user);
    const dispatch = useAppDispatch();
    const theme = useTheme();

    useEffect(() => {
        setEditedUser(user);
    }, [user]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked, value } = e.target;
        const newValue = name === 'isActive' ? checked : value;
        setEditedUser((prevState) => ({
            ...prevState,
            [name]: newValue,
        }));
    };


    const handleSaveChanges = () => {
        console.log({ userId: editedUser._id, userData: editedUser });
        dispatch(updateUserInfo({ userId: editedUser._id, userData: editedUser }));
        setIsEditMode(false);
        // onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth sx={{ maxWidth: theme.breakpoints.values.lg, margin: 'auto' }}>
            <DialogTitle sx={{ backgroundColor: 'primary.main' }}>
                <Typography sx={{ fontSize: 35 }} color={"white"}>{title}</Typography>
            </DialogTitle>
            <DialogContent>
                <TableContainer>
                    <Table aria-label="User Details" stickyHeader>
                        <TableBody>
                            <TableRow hover>
                                <TableCell style={{ fontWeight: 'bold' }}>Nombre</TableCell>
                                <TableCell>{user.name}</TableCell>
                            </TableRow>
                            <TableRow hover>
                                <TableCell style={{ fontWeight: 'bold' }}>Correo Electrónico</TableCell>
                                <TableCell>{user.email}</TableCell>
                            </TableRow>
                            <TableRow hover>
                                <TableCell style={{ fontWeight: 'bold' }}>CI</TableCell>
                                <TableCell>{user.ci}</TableCell>
                            </TableRow>
                            <TableRow hover>
                                <TableCell style={{ fontWeight: 'bold' }}>Rol</TableCell>
                                {isEditMode ? (
                                    <TableCell>
                                        <input
                                            type="text"
                                            value={editedUser.role}
                                            onChange={(e) => handleInputChange(e)}
                                            name="role"
                                        />
                                    </TableCell>
                                ) : (
                                    <TableCell>{editedUser.role}</TableCell>
                                )}
                            </TableRow>
                            <TableRow hover>
                                <TableCell style={{ fontWeight: 'bold' }}>Posición</TableCell>
                                {isEditMode ? (
                                    <TableCell>
                                        <input
                                            type="text"
                                            value={editedUser.position}
                                            onChange={(e) => handleInputChange(e)}
                                            name="position"
                                        />
                                    </TableCell>
                                ) : (
                                    <TableCell>{editedUser.position}</TableCell>
                                )}
                            </TableRow>
                            <TableRow hover>
                                <TableCell style={{ fontWeight: 'bold' }}>Activo</TableCell>
                                {isEditMode ? (
                                    <TableCell>
                                        <Checkbox
                                            checked={editedUser.isActive}
                                            onChange={(e) => handleInputChange(e)}
                                            name="isActive"
                                        />
                                    </TableCell>
                                ) : (
                                    <TableCell>{editedUser.isActive ? 'Sí' : 'No'}</TableCell>
                                )}
                            </TableRow>
                            <TableRow hover>
                                <TableCell style={{ fontWeight: 'bold' }}>Días de Vacaciones</TableCell>
                                {isEditMode ? (
                                    <TableCell>
                                        <input
                                            type="number"
                                            value={editedUser.vacationDays}
                                            onChange={(e) => handleInputChange(e)}
                                            name="vacationDays"
                                        />
                                    </TableCell>
                                ) : (
                                    <TableCell>{editedUser.vacationDays}</TableCell>
                                )}
                            </TableRow>
                            <TableRow hover>
                                <TableCell style={{ fontWeight: 'bold' }}>País</TableCell>
                                <TableCell>{user.country}</TableCell>
                            </TableRow>
                            <TableRow hover>
                                <TableCell style={{ fontWeight: 'bold' }}>Departamento</TableCell>
                                {isEditMode ? (
                                    <TableCell>
                                        <input
                                            type="text"
                                            value={editedUser.department}
                                            onChange={(e) => handleInputChange(e)}
                                            name="department"
                                        />
                                    </TableCell>
                                ) : (
                                    <TableCell>{editedUser.department}</TableCell>
                                )}
                            </TableRow>
                            <TableRow hover>
                                <TableCell style={{ fontWeight: 'bold' }}>Área</TableCell>
                                {isEditMode ? (
                                    <TableCell>
                                        <input
                                            type="text"
                                            value={editedUser.area}
                                            onChange={(e) => handleInputChange(e)}
                                            name="area"
                                        />
                                    </TableCell>
                                ) : (
                                    <TableCell>{editedUser.area}</TableCell>
                                )}
                            </TableRow>
                            <TableRow hover>
                                <TableCell style={{ fontWeight: 'bold' }}>Fecha de Ingreso</TableCell>
                                <TableCell>{formatDateHelp(user.dateOfJoining)}</TableCell>
                            </TableRow>
                            <TableRow hover>
                                <TableCell style={{ fontWeight: 'bold' }}>Creado en</TableCell>
                                <TableCell>{formatDateHelp(user.createdAt)}</TableCell>
                            </TableRow>
                            <TableRow hover>
                                <TableCell style={{ fontWeight: 'bold' }}>Actualizado en</TableCell>
                                <TableCell>{formatDateHelp(user.updatedAt)}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
            <DialogActions>
                {isEditMode ? (
                    <Button onClick={handleSaveChanges} color="primary">
                        Guardar Cambios
                    </Button>
                ) : (
                    <Button onClick={() => setIsEditMode(true)} color="primary">
                        Editar
                    </Button>
                )}
                <Button onClick={onClose} color="primary">
                    Cerrar
                </Button>
            </DialogActions>
        </Dialog>

    )
}
