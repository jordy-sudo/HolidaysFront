import React, { useState } from 'react';
import { DataGrid, GridColDef, esES, GridToolbar, GridRowParams,GridCellParams } from '@mui/x-data-grid';
import { format } from 'date-fns';
import { Event } from '../../store/types/eventTypes';
import { EventPdfModal } from './EventPdfModal';

interface EventsDataGridProps {
    eventos: Event[];
}

export const EventsDataGrid: React.FC<EventsDataGridProps> = ({ eventos }) => {
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    const formatDate = (date: string) => {
        return format(new Date(date), 'dd/MM/yyyy');
    };

    const formatBoolean = (value: boolean) => {
        return value ? 'Sí' : 'No';
    };

    const getRowId = (row: Event) => row.id;

    const getRowClassName = (params: GridRowParams) => {
        if (params.row.hasPdfDocument === 'Sí') {
            return 'approvedRow'; // clase CSS para filas aprobadas
        }
        return 'notApprovedRow'; // clase CSS para filas no aprobadas
    };

     const columns: GridColDef[] = [
        { field: 'title', headerName: 'Título', width: 100 },
        { field: 'start', headerName: 'Inicio', width: 100 },
        { field: 'end', headerName: 'Fin', width: 100 },
        { field: 'approved', headerName: 'Aprobado', width: 80 },
        {
            field: 'hasPdfDocument',
            headerName: 'Documento Entregado',
            width: 100,
            valueFormatter: (params) => formatBoolean(params.value as boolean),
            cellClassName: (params) => {
                return params.value ? 'approvedCell' : 'notApprovedCell';
            },
            renderCell: (params: GridCellParams) => {
                if (params.row.hasPdfDocument == "Sí") {
                    return 'Entregado';
                }
                return 'Sin Entregar';
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
        { field: 'createdAt', headerName: 'Creado', width: 100 },
        { field: 'updatedAt', headerName: 'Aceptado', width: 100 },
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
                    start: formatDate(evento.start),
                    end: formatDate(evento.end),
                    createdAt: formatDate(evento.createdAt),
                    updatedAt: formatDate(evento.updatedAt),
                    approved: formatBoolean(evento.approved),
                    hasPdfDocument: formatBoolean(evento.hasPdfDocument),
                }))}
                columns={columns}
                localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                slots={{
                    toolbar: GridToolbar,
                }}
                onRowClick={(params: GridRowParams) => {
                    if(params.row.hasPdfDocument !== 'Sí'){
                        openDetails(params.row as Event);
                    }
                }}
                getRowId={getRowId}
                getRowClassName={getRowClassName}
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