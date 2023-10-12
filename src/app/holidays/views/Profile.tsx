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
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

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
       <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            <AccountCircleIcon />
          </Avatar>
        }
        title="Nombre del Usuario"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" paragraph>
          Descripción rápida del usuario.
        </Typography>
        <Typography variant="subtitle1">Solicitudes del Usuario:</Typography>
        <List>
          <ListItem>
            <Typography variant="body2">Solicitud 1</Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">Solicitud 2</Typography>
          </ListItem>
          {/* Agrega más elementos ListItem según sea necesario */}
        </List>
      </CardContent>
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
