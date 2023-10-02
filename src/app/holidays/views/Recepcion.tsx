import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loadDocuments } from '../../store/events/thunks';
import { EventsDataGrid } from '../components/EventsDataGrid';
import { Box } from '@mui/material';

export const Recepcion = () => {
    const dispatch = useAppDispatch();
    const { documents } = useAppSelector((state) => state.event);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                dispatch(loadDocuments());
            } catch (error) {
                console.error('Error al cargar eventos', error);
            }
        };
        fetchEvents();
    }, [dispatch]);

    return (
        <Box>
            <EventsDataGrid eventos={documents} />
        </Box>
    )
}
