import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loadEventswithBoss } from '../../store/events/thunks';
import { Calendar } from '../components/Calendar';

export const SolicitudesPersonal = () => {
    const dispatch = useAppDispatch();
    const { eventsWithBoss } = useAppSelector((state) => state.event);


    useEffect(() => {
        dispatch(loadEventswithBoss());
    }, []);
    return (
        <Calendar events={eventsWithBoss} />
    )
}
