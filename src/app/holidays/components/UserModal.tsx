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
    Button,
    Select,
    MenuItem
} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { SelectChangeEvent } from '@mui/material';
import { Usuarios } from '../../store/types/authTypes';
import { formatDateHelp } from '../helpers/FormateDate';
import { useAppDispatch } from '../../store/hooks';
import { updateUserInfo } from '../../store/auth/thunks';
import { ConfirmationDialog } from './ConfirmationDialogModal';

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
    const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
    const dispatch = useAppDispatch();
    const theme = useTheme();

    useEffect(() => {
        setEditedUser(user);
    }, [user]);

    const closeConfirmationModal = () => {
        setConfirmationModalOpen(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked, value } = e.target;
        const newValue = name === 'isActive' ? checked : value;
        setEditedUser((prevState) => ({
            ...prevState,
            [name]: newValue,
        }));
    };

    const handleSelectChange = (e: SelectChangeEvent<string>) => {
        const { name, value } = e.target;
        setEditedUser((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };

    const handleSaveChanges = () => {
        setConfirmationModalOpen(true);
        // console.log({ userId: editedUser._id, userData: editedUser });
        if (isConfirmationModalOpen) {
            dispatch(updateUserInfo({ userId: editedUser._id, userData: editedUser }));
            setIsEditMode(false);
        }
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
                                        <Select
                                            value={editedUser.role}
                                            onChange={(e) => handleSelectChange(e)}
                                            name="role"
                                            style={{ minWidth: '120px', maxHeight: '40px' }}
                                        >
                                            <MenuItem value="Empleado">Empleado</MenuItem>
                                            <MenuItem value="Jefe">Jefe</MenuItem>
                                            <MenuItem value="Administrador">Administrador</MenuItem>
                                            <MenuItem value="rrhh">rrhh</MenuItem>    
                                        </Select>
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
                                <TableCell>{user.dateOfJoining}</TableCell>
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
            <ConfirmationDialog
                open={isConfirmationModalOpen}
                onClose={closeConfirmationModal}
                onConfirm={handleSaveChanges}
                title='Edicion de datos (usuario)'
            />
        </Dialog>

    )
}
