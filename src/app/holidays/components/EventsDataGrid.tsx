import React, { useState } from 'react';
import { DataGrid, GridColDef, esES, GridToolbar, GridRowParams,GridCellParams } from '@mui/x-data-grid';
import Chip from '@mui/material/Chip';
import { Event } from '../../store/types/eventTypes';
import { EventPdfModal } from './EventPdfModal';
import { formatDateHelp } from '../helpers/FormateDate';

interface EventsDataGridProps {
    eventos: Event[];
}

export const EventsDataGrid: React.FC<EventsDataGridProps> = ({ eventos }) => {
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);


    const getRowId = (row: Event) => row.id;



     const columns: GridColDef[] = [
        { field: 'title', headerName: 'Título', width: 100 },
        { field: 'start', headerName: 'Inicio', width: 100 },
        { field: 'end', headerName: 'Fin', width: 100 },
        { field: 'approved', headerName: 'Aprobado', width: 80,
            renderCell: (params: GridCellParams) => {
                if (params.row.approved) {
                    return 'Si';
                }
                return 'No';
            },
        },
        { field: 'requestedDays', headerName: 'Días Solicitados', width: 80 },
        {
            field: 'user.name',
            headerName: 'Usuario',
            width: 150,
            valueGetter: (params) => (params.row.user ? params.row.user.name : ''),
        },
        {
            field: 'user.boss.name',
            headerName: 'Jefe',
            width: 150,
            valueGetter: (params) => (params.row.user && params.row.user.boss ? params.row.user.boss.name : ''),
        },
        {
            field: 'hasPdfDocument',
            headerName: 'Documento PDF',
            width: 150,
            renderCell: (params: GridCellParams) => {
              const isDocumentDelivered = params.row.hasPdfDocument;
              return (
                <Chip
                  size="medium" 
                  label={isDocumentDelivered ? 'Entregado' : 'Sin Entregar'}
                  color={isDocumentDelivered ? 'success' : 'error'}
                  variant="outlined"
                />
              );
            },
          },
        { field: 'createdAt', headerName: 'Creado', width: 100 },
        // { field: 'updatedAt', headerName: 'Aceptado', width: 100 },
    ];

    const openDetails = (event: Event) => {
        setSelectedEvent(event);
    };

    const closeEventDetailsModal = () => {
        setSelectedEvent(null);
    };

    return (
        <div style={{ height: '400px', width: '100%', maxWidth: '100%' }}>
            <DataGrid
                rows={eventos.map(evento => ({
                    ...evento,
                    start: formatDateHelp(evento.start),
                    end: formatDateHelp(evento.end),
                    createdAt: formatDateHelp(evento.createdAt),
                    updatedAt: formatDateHelp(evento.updatedAt),
                 
                }))}
                columns={columns}
                localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                slots={{
                    toolbar: GridToolbar,
                }}
                onRowClick={(params: GridRowParams) => {
                    if(!params.row.hasPdfDocument){
                        openDetails(params.row as Event);
                    }
                }}
                getRowId={getRowId}

            />
            {selectedEvent && (
                <EventPdfModal
                    open={!!selectedEvent}
                    onClose={closeEventDetailsModal}
                    event={selectedEvent}
                />
            )}
        </div>
    );
};