import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { Box, Typography } from '@mui/material';
import { EventContentArg } from '@fullcalendar/common';
import { EventDetailsModal } from './EventDetailsModal';
import { Event } from '../../store/types/eventTypes';
import moment from 'moment';

interface CalendarProps {
  events: Event[];
}


export const Calendar: React.FC<CalendarProps> = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const firstEventUserVacationDays = events[0]?.user?.vacationDays;


  const eventContent = (arg: EventContentArg) => {
    // const event = arg.event._def.extendedProps as Event;
    const eventApi = arg.event;
    const event: Event = {
      title: eventApi.title,
      start: moment(eventApi.startStr).format(),
      end: moment(eventApi.endStr).format(),
      approved: eventApi.extendedProps.approved,
      user: eventApi.extendedProps.user,
      requestedDays: eventApi.extendedProps.requestedDays,
      hasPdfDocument: false,
      createdAt: eventApi.extendedProps.createdAt,
      updatedAt: eventApi.extendedProps.updatedAt,
      id: '',
    };

    const handleEventClick = () => {
      setSelectedEvent(event);
    };

    return (
      <div
        style={{
          backgroundColor: event.approved ? 'green' : 'gray',
          color: 'white',
          borderRadius: '5px',
          padding: '5px',
          cursor: 'pointer',
        }}
        onClick={handleEventClick}
      >
        <b>{arg.event.title}</b>
        <br />
        {event.user.name}
      </div>
    );
  };
  const closeEventDetailsModal = () => {
    setSelectedEvent(null);
  };

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Mi Calendario
        </Typography>
        <Typography sx={{ marginLeft: 10 }} variant="h5" gutterBottom>
          Vacaciones disponibles:{firstEventUserVacationDays} dias
        </Typography>
      </Box>
      <Box boxShadow="0px 5px 5px -3px rgba(255, 235, 59, 0.2)"
        bgcolor="#F0F0F0"
        p={2} >
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
          initialView="dayGridMonth"
          events={events}
          locale="es"
          headerToolbar={{
            left: 'today prev,next',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
          }}
          themeSystem="mui"
          buttonText={{
            today: 'Hoy',
            month: 'Mes',
            week: 'Semana',
            day: 'Día',
            list: 'Lista',
          }}
          eventDisplay="block"
          eventContent={eventContent}
        />

        {selectedEvent && (
          <EventDetailsModal
            open={!!selectedEvent}
            onClose={closeEventDetailsModal}
            event={selectedEvent}
            title='Aprobacion de Solicitud'
          />
        )}
      </Box>
    </>
  );
};
