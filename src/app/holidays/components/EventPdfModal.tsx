import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    IconButton,
    Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { Event } from '../../store/types/eventTypes';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { aceptEvent } from '../../store/events/thunks';
import { Check } from '@mui/icons-material';
import { ConfirmationDialog } from './ConfirmationDialogModal';

interface EventPdfModalProps {
    event: Event;
    open: boolean;
    onClose: () => void;
}


export const EventPdfModal: React.FC<EventPdfModalProps> = ({ event, open, onClose }) => {
    const { role } = useAppSelector((state) => state.auth);
    const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
    const dispatch = useAppDispatch();

    const openConfirmationModal = () => {
        setConfirmationModalOpen(true);
    };

    const closeConfirmationModal = () => {
        setConfirmationModalOpen(false);
    };

    const onAceept = () => {
        const updateData = {
            camp: "hasPdfDocument",
            newStatus: true,
        };
        dispatch(aceptEvent({ eventId: event.id, requestData: updateData }));
        onClose();
    }
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm">
            <DialogTitle sx={{ backgroundColor: 'primary.main' }}>
                <Typography sx={{ fontSize: 35 }} color={"white"}>Recepcion de Documentos</Typography>
            </DialogTitle>
            <DialogContent>
                <TableContainer>
                    <Table aria-label="Event Details" stickyHeader>
                        <TableBody>
                            <TableRow hover>
                                <TableCell style={{ fontWeight: 'bold' }}>Título</TableCell>
                                <TableCell>{event.title}</TableCell>
                            </TableRow>
                            <TableRow hover>
                                <TableCell style={{ fontWeight: 'bold' }}>Fecha de Inicio</TableCell>
                                <TableCell>{event.start}</TableCell>
                            </TableRow>
                            {event.end && (
                                <TableRow hover>
                                    <TableCell style={{ fontWeight: 'bold' }}>Fecha de Finalización</TableCell>
                                    <TableCell>{event.end}</TableCell>
                                </TableRow>
                            )}
                            <TableRow hover sx={{
                                backgroundColor: event.approved ? 'lightgreen' : 'inherit',
                            }}>
                                <TableCell style={{ fontWeight: 'bold' }}>Aprobado</TableCell>
                                <TableCell>
                                    {event.approved ? 'Sí' : 'No'}
                                </TableCell>
                            </TableRow>
                            <TableRow hover>
                                <TableCell style={{ fontWeight: 'bold' }}>Usuario</TableCell>
                                <TableCell>{event.user.name}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
            <DialogActions>
                <IconButton onClick={onClose} color="error">
                    <CloseIcon />
                </IconButton>
                {
                    role == 'hr' && (
                        <IconButton onClick={openConfirmationModal} color="warning">
                            <Check />
                        </IconButton>
                    )
                }
            </DialogActions>
            <ConfirmationDialog
                open={isConfirmationModalOpen}
                onClose={closeConfirmationModal}
                onConfirm={onAceept}
                title='Recepcion de documentos'
            />
        </Dialog>
    );
};

