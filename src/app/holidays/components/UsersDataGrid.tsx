import React, { useState } from 'react';
import { DataGrid, esES, GridToolbar, GridRowParams, GridCellParams } from '@mui/x-data-grid';
import Chip from '@mui/material/Chip';
import { Usuarios } from '../../store/types/authTypes';
import { formatDateHelp } from '../helpers/FormateDate';
import { UserModal } from './UserModal';
import { useAppDispatch } from '../../store/hooks';
import { startLoadUsers } from '../../store/auth/thunks';

const columns = [
    { field: 'name', headerName: 'Nombre', width: 250 },
    { field: 'ci', headerName: 'Cedula', width: 120 },
    { field: 'position', headerName: 'Posición', width: 250 },
    {
        field: 'isActive', headerName: 'Status', width: 100,
        renderCell: (params: GridCellParams) => {
            const isDocumentDelivered = params.row.isActive;
            return (
              <Chip
                size="medium" 
                label={isDocumentDelivered ? 'Activo' : 'Inactivo'}
                color={isDocumentDelivered ? 'success' : 'error'}
                variant="outlined"
              />
            );
          },
    },
    { field: 'dateOfJoining', headerName: 'Fecha de Ingreso', width: 150 },
    { field: 'vacationDays', headerName: 'Vacaciones disponibles', width: 200 },
];

interface DataTableProps {
    users: Usuarios[];
}

export const UsersDataGrid: React.FC<DataTableProps> = ({ users }) => {
    const [selectedUser, setSelectedUser] = useState<Usuarios | null>(null);
    const dispatch = useAppDispatch();
    const getRowId = (row: Usuarios) => row._id;


    const openDetailsUser = (user: Usuarios) => {
        setSelectedUser(user);
    };


    const closeDetailsUser = () => {
        dispatch(startLoadUsers());
        setSelectedUser(null);
    };
    return (
        <div style={{ height: 500, width: '100%' }}>
            <DataGrid
                rows={users.map(user => ({
                    ...user,
                    dateOfJoining: formatDateHelp(user.dateOfJoining),
                }))}
                slots={{
                    toolbar: GridToolbar,
                }}
                columns={columns}
                localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                getRowId={getRowId}
                onRowClick={(params: GridRowParams) => {
                    if (params.row.hasPdfDocument !== 'Sí') {
                        openDetailsUser(params.row as Usuarios);
                    }
                }}
                pageSizeOptions={[10,20,50,100]} 
            />
            {selectedUser && (
                <UserModal
                    open={!!selectedUser}
                    onClose={closeDetailsUser}
                    user={selectedUser}
                    title='Detalles de usuario'
                />
            )}
        </div>
    );
};
