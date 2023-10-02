import React, {useState} from 'react';
import {
  Typography, Avatar, Card, CardHeader, IconButton, CardMedia, CardContent, CardActions, Collapse, Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAppSelector } from '../../store/hooks';
import { format } from 'date-fns';
import { Event } from '../../store/types/eventTypes';
import { EventDetailsModal } from '../components/EventDetailsModal';

export const Profile = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [expanded, setExpanded] = React.useState(false);
  const { name, position } = useAppSelector((state) => state.auth);
  const { events } = useAppSelector((state) => state.event);

  const openDetails=(event:Event)=>{
    setSelectedEvent(event);
  }

  const closeEventDetailsModal = () => {
    setSelectedEvent(null);
  };

  const formatDate = (date: string) => {
    return format(new Date(date), 'dd/MM/yyyy');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#F0F0F0',
      }}
    >
      <Card sx={{ maxWidth: 845, marginTop: 1, marginBottom: 1 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: '#E72806' }} aria-label="recipe">
              {name ? name.charAt(0) : ''}
            </Avatar>
          }
          
          title={name}
          subheader={position}
        />
        <CardMedia
          component="img"
          height="194"
          image="/employee.png"
          alt="image"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Recuerda que esta información es la proporcionada por la aplicación, si hay algún cambio, comunícalo y podremos ayudarte.
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Box sx={{ marginLeft: 'auto' }}>
            <IconButton
              aria-label="show more"
              onClick={() => setExpanded(!expanded)}
              aria-expanded={expanded}
            >
             <Typography sx={{fontSize:13}} color="text.secondary">Historial de Solicitudes</Typography>
              <ExpandMoreIcon />
            </IconButton>
          </Box>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {events.map((event) => (
              <List key={event.id} sx={{ width: '100%', maxWidth: 845, bgcolor: '#F0F0F0',cursor: 'pointer' }}>
                <ListItem alignItems="flex-start" onClick={() => openDetails(event)}>
                  <ListItemAvatar>
                    <Avatar
                      alt="Remy Sharp"
                      sx={{
                        bgcolor: event.approved ? '#49A312' : '#CCCCCC', 
                      }} 
                    >
                      {event.user.name.charAt(0)} 
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={event.user.name}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: 'inline', marginRight: 2 }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {event.title}
                        </Typography>
                        {formatDate(event.start)}---{formatDate(event.end)}
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </List>
            ))}
          </CardContent>
        </Collapse>
      </Card>
      {selectedEvent && (
          <EventDetailsModal
            open={!!selectedEvent}
            onClose={closeEventDetailsModal}
            event={selectedEvent}
            title='Detalle de Solicitud'
          />
        )}
    </Box>
  );
};
