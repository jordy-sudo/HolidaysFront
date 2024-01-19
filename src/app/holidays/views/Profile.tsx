import React, { useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
  ListItemAvatar,
} from '@mui/material';
import { CalendarMonth, Cancel, CheckCircle } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loadEvents } from '../../store/events/thunks';

import { formatDateHelp } from '../helpers/FormateDate';

export const Profile = () => {
  const dispatch = useAppDispatch();
  const { events } = useAppSelector((state) => state.event);
  const { name, position, email, department } = useAppSelector((state) => state.auth);

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

  const getInitials = (name: string): string => {
    const nameArray = name.split(' ');
    let initials = '';

    if (nameArray.length > 0) {
      initials += nameArray[0][0]; // Primera inicial

      if (nameArray.length > 2) {
        initials += nameArray[2][0]; // Tercera inicial
      }
    }

    return initials.toUpperCase();
  };

  return (
    <section style={{ backgroundColor: '#eee' }}>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} lg={12}>
            <Card>
              <CardContent style={{ display: 'flex', alignItems: 'center' }}>
                <CardMedia
                  component="div"
                  style={{
                    backgroundColor: '#FF453C',
                    color: '#ffffff',
                    borderRadius: '50%',
                    width: '120px',
                    height: '120px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '36px',
                    flexShrink: 0,  // Evita que el círculo se encoja
                  }}
                >
                  {getInitials(name || '')}
                </CardMedia>
                <List style={{ textAlign: 'left', marginLeft: '16px' }}>
                  <ListItem>
                    <Typography variant="h5" mb={3}>
                      {name}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography variant="subtitle1" mb={1}>
                      {department}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography variant="subtitle2" mb={4}>
                      {position}, {email}
                    </Typography>
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} lg={12}>
            <Card variant="outlined" sx={{ mt: 2 }}>
              <CardContent>
                <Typography variant="h5" mb={2}>
                  Solicitudes realizadas
                </Typography>
                <List>
                  {events.map((event, index) => (
                    <React.Fragment key={index}>
                      <ListItem className="d-flex justify-content-between align-items-center">
                        <ListItemAvatar>
                          <Avatar sx={{ backgroundColor: event.approved ? '#4CAF50' : '#FF453C' }}>
                            {event.approved ? <CheckCircle /> : <Cancel />}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={event.title}
                          secondary={
                            <React.Fragment>
                              <Typography component="span" variant="body2" color="text.primary">
                                <CalendarMonth fontSize="small" />
                                <span className="ml-2">
                                  {formatDateHelp(event.start)} -Hasta- {formatDateHelp(event.end)}
                                </span>
                              </Typography>
                            </React.Fragment>
                          }
                        />
                        <Typography
                          variant="body2"
                          color={event.approved ? 'success.main' : 'error.main'}
                          sx={{
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            letterSpacing: 1,
                          }}
                        >
                          {event.approved ? 'Aprobado' : 'Sin Aprobar'}
                        </Typography>
                      </ListItem>
                      {index < events.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};
