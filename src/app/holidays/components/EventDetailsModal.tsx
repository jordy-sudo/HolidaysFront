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

import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import CloseIcon from '@mui/icons-material/Close';

import { format } from 'date-fns';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { PdfDocument } from './PdfDocument';
import { Event } from '../../store/types/eventTypes';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Check } from '@mui/icons-material';
import { aceptEvent } from '../../store/events/thunks';
import { ConfirmationDialog } from './ConfirmationDialogModal';



interface EventDetailsModalProps {
    open: boolean;
    onClose: () => void;
    event: Event;
    title:string;
}

export const EventDetailsModal: React.FC<EventDetailsModalProps> = ({
    open,
    onClose,
    event,
    title,
}) => {

    const { role } = useAppSelector((state) => state.auth);
    const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);

    console.log(role);

    const dispatch = useAppDispatch();

    const formatDate = (date: string) => {
        return format(new Date(date), 'dd/MM/yyyy');
    };

    const openConfirmationModal = () => {
        setConfirmationModalOpen(true);
    };

    const closeConfirmationModal = () => {
        setConfirmationModalOpen(false);
    };

    const onAceept = () => {
        const updateData = {
            camp: "approved",
            newStatus: true,
          };
        
        dispatch(aceptEvent({ eventId: event.id, requestData: updateData }));
        onClose();
    }


    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm">
            <DialogTitle sx={{ backgroundColor: 'primary.main' }}>
                <Typography sx={{ fontSize: 35 }} color={"white"}>{title}</Typography>
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
                                <TableCell>{formatDate(event.start)}</TableCell>
                            </TableRow>
                            {event.end && (
                                <TableRow hover>
                                    <TableCell style={{ fontWeight: 'bold' }}>Fecha de Finalización</TableCell>
                                    <TableCell>{formatDate(event.end)}</TableCell>
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
                {
                    event.approved && (<Box sx={{ position: 'absolute', bottom: '19px', left: '16px' }}>
                        <PDFDownloadLink document={<PdfDocument event={event} />} fileName={`${event.user.name}_vacaciones.pdf`}>
                            <Button sx={{
                                transition: 'transform 0.2s',
                                '&:hover': {
                                    transform: 'scale(1.1)',
                                },
                            }}
                                component="label" variant="contained" color='error' startIcon={<PictureAsPdfIcon />}>
                                Descargar Solicitud
                            </Button>
                        </PDFDownloadLink>
                    </Box>)
                }
                <IconButton onClick={onClose} color="error">
                    <CloseIcon />
                </IconButton>
                {
                    role == 'Jefe' && (
                        <IconButton onClick={onAceept} color="warning">
                            <Check />
                        </IconButton>
                    )
                }
            </DialogActions>
            {/* {showPdfPreview && (
                <Dialog open={showPdfPreview} fullWidth maxWidth="md">
                    <PDFViewer width="100%" height="800px">
                        <PdfDocument event={event} />
                    </PDFViewer>
                </Dialog>
            )} */}
             <ConfirmationDialog
                open={isConfirmationModalOpen}
                onClose={closeConfirmationModal}
                onConfirm={onAceept}
                title='Aprobacion de vacaciones'
            />
        </Dialog>
    );
};
