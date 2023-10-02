import { useEffect } from 'react';
import { Calendar } from '../components/Calendar';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loadEvents } from '../../store/events/thunks';

export const Solicitud = () => {
  const dispatch = useAppDispatch();
  const { events } = useAppSelector((state) => state.event);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        dispatch(loadEvents()); 
      } catch (error) {
        console.error('Error al cargar eventos', error);
      }
    };
    fetchEvents();
  }, [dispatch]); 

  return (
    <Calendar events={events} />
  );
}
