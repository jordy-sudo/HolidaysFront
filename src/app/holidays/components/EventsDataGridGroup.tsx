import React, { useState } from 'react';
import { DataGrid, GridColDef, esES, GridToolbar, GridRowParams, GridCellParams } from '@mui/x-data-grid';
import { format } from 'date-fns';
import { Event } from '../../store/types/eventTypes';
import { EventPdfModal } from './EventPdfModal';

interface EventsDataGridProps {
    eventos: Event[];
}

export const EventsDataGridGroup: React.FC<EventsDataGridProps> = ({ eventos }) => {
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

    const formatDate = (date: string) => {
        return format(new Date(date), 'dd/MM/yyyy');
    };

    const formatBoolean = (value: boolean) => {
        return value ? 'Sí' : 'No';
    };

    const getRowId = (row: Event) => row.user.id;

    const handleRowClick = (params: GridRowParams) => {
        const userId = params.id as number;
        const newExpandedRows = new Set(expandedRows);

        if (newExpandedRows.has(userId)) {
            newExpandedRows.delete(userId);
        } else {
            newExpandedRows.add(userId);
        }

        setExpandedRows(newExpandedRows);
    };

    const getRowClassName = (params: GridRowParams) => {
        if (params.row.hasPdfDocument === 'Sí') {
            return 'approvedRow';
        }
        return 'notApprovedRow'; 
    };

    const columns: GridColDef[] = [
        // ... tus columnas existentes ...
    ];

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
                onRowClick={handleRowClick}
                getRowId={getRowId}
                getRowClassName={getRowClassName}
            />
            {selectedEvent && (
                <EventPdfModal
                    open={!!selectedEvent}
                    onClose={() => setSelectedEvent(null)}
                    event={selectedEvent}
                />
            )}
        </div>
    );
};
