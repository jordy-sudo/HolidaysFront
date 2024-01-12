import React, { useState,useEffect } from 'react';
import {
  Button,
  Grid,
  Card,
  Avatar,
  Typography,
  CardActions,
  CardContent,
  Box,
  IconButton,
  Collapse,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { format } from 'date-fns';
import { Event } from '../../store/types/eventTypes';
import { EventDetailsModal } from '../components/EventDetailsModal';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { loadEvents } from '../../store/events/thunks';
const getInitials = (name: string): string => {
  const nameArray = name.split(' ');
  const initials = nameArray.map((word) => word[0]).join('');
  return initials.toUpperCase();
};

export const Profile = () => {
  const dispatch = useAppDispatch();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [expanded, setExpanded] = React.useState(false);
  const { name, position, department, email, role } = useAppSelector((state) => state.auth);
  const { events } = useAppSelector((state) => state.event);
  const avatarSrc ='';

  
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
  const openDetails = (event: Event) => {
    setSelectedEvent(event);
  }

  const closeEventDetailsModal = () => {
    setSelectedEvent(null);
  };

  const formatDate = (date: string) => {
    return format(new Date(date), 'dd/MM/yyyy');
  };

  return (
    <Grid container spacing={2}>
      {/* Card en la parte izquierda */}
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom color="primary">
          Cuenta
        </Typography>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card sx={{ maxWidth: 345, margin: '0 auto', textAlign: 'center'}} >
          <CardContent>
            <Avatar
              alt="Avatar"
              src="URL_DE_LA_IMAGEN"
              sx={{ width: 100, height: 100, margin: '0 auto 1rem auto' }}
            >
              {avatarSrc ? null : getInitials(name || '')}
            </Avatar>
            <Typography variant="h5" component="div" gutterBottom color="primary">
              {name}
            </Typography>
            <Typography color="textSecondary">{position}</Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: 'center' }}>
            {/* <Box component="label" sx={{ display: 'inline-flex', alignItems: 'center' }}>
              <Button
                variant="outlined"
                component="div"
                sx={{ '&:hover': { backgroundColor: 'rgba(128, 0, 128, 0.2)' } }}
              >
                Subir Imagen
                <input type="file" style={{ display: 'none' }} />
              </Button>
            </Box> */}
          </CardActions>
        </Card>
      </Grid>

      {/* Card en la parte derecha */}
      <Grid item xs={12} md={8}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom color="primary">
              Información Adicional
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle1" color="textSecondary">
                  Departamento:
                </Typography>
                <Typography variant="body1">{department}</Typography>
              </Grid>

              <Grid item xs={12} md={4}>
                <Typography variant="subtitle1" color="textSecondary">
                  Email:
                </Typography>
                <Typography variant="body1">{email}</Typography>
              </Grid>

              <Grid item xs={12} md={4}>
                <Typography variant="subtitle1" color="textSecondary">
                  Rol:
                </Typography>
                <Typography variant="body1">{role}</Typography>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions disableSpacing>
            <Box sx={{ marginLeft: 'auto' }}>
              <IconButton
                aria-label="show more"
                onClick={() => setExpanded(!expanded)}
                aria-expanded={expanded}
              >
                <Typography sx={{ fontSize: 13 }} color="text.secondary">
                  Historial de Solicitudes
                </Typography>
                <ExpandMoreIcon />
              </IconButton>
            </Box>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              {events.map((event) => (
                <List
                  key={event.id}
                  sx={{ width: '100%', maxWidth: 845, bgcolor: '#F0F0F0', cursor: 'pointer' }}
                >
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
      </Grid>
    </Grid>
  );
};
