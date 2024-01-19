import React, { ReactElement, useState, useEffect } from "react";
import {
  AppBar,
  Badge,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  BeachAccess,
  LogoutOutlined,
  MenuOpen,
  Menu as MenuIcon,
  NotificationsOutlined,
} from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { startLogout } from "../../store/auth/thunks";
import { aceptEvent, loadNotifications } from "../../store/events/thunks";
import { Event } from "../../store/types/eventTypes";
import { EventDetailsModal } from "./EventDetailsModal";

interface NavbarHolidaysProps {
  drawerWidth?: number;
  expanded: boolean;
  onToggle: () => void;
}

export const NavbarHolidays = ({
  drawerWidth = 240,
  expanded,
  onToggle
}: NavbarHolidaysProps): ReactElement => {
  const dispatch = useAppDispatch();
  const { name } = useAppSelector((state) => state.auth);
  const { notifications } = useAppSelector((state) => state.event);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    dispatch(loadNotifications());
  }, [dispatch]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleNotificationsClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onLogout = () => {
    dispatch(startLogout());
  };

  const closeEventDetailsModal = () => {
    setSelectedEvent(null);
  };

  const handleNotificationClick = (event: Event) => {
    const updateData = {
      camp: "show",
      newStatus: true,
    };
    dispatch(aceptEvent({ eventId: event.id, requestData: updateData }));
    setSelectedEvent(event);
  };

  const getColorByIndex = (index: any) => {
    const colors = ['red', 'green', 'blue'];
    return colors[index % colors.length];
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${50}px)` },
        ml: { sm: `${drawerWidth}px` },
        transition: 'width 0.3s ease', // Agregamos una transición suave
        ...(expanded && { width: `calc(100% - ${drawerWidth}px)` }), // Ajustamos el ancho si está expandido
      }}
    >
      <Toolbar>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <IconButton onClick={onToggle} sx={{ mr: 2 }}>
            {expanded ? <MenuOpen color='secondary' /> : <MenuIcon color='secondary' />}
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {name}
          </Typography>
          <IconButton color="inherit" onClick={handleNotificationsClick}>
            <Badge badgeContent={notifications.length} color="secondary">
              <NotificationsOutlined />
            </Badge>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            {notifications.length === 0 ? (
              <MenuItem>
                <Typography variant="body2" color="textSecondary">
                  No hay notificaciones
                </Typography>
              </MenuItem>
            ) : (
              notifications.map((notification, index) => (
                <MenuItem key={notification.id}> {/* Agrega la clave única aquí */}
                  <ListItem onClick={() => handleNotificationClick(notification)}>
                    <ListItemIcon>
                      <BeachAccess style={{ color: getColorByIndex(index) }} />
                    </ListItemIcon>
                    <ListItemText>
                      <Typography component="div">{notification.user.name}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        Solicita: {notification.title}
                      </Typography>
                    </ListItemText>
                  </ListItem>
                  <Divider />
                </MenuItem>
              ))
            )}
          </Menu>
        </Grid>
        <IconButton color="error" onClick={onLogout}>
          <LogoutOutlined />
        </IconButton>
      </Toolbar>
      {selectedEvent && (
        <EventDetailsModal
          open={!!selectedEvent}
          onClose={closeEventDetailsModal}
          event={selectedEvent}
          title="Notificacion de Solicitud"
        />)
      }
    </AppBar>
  );
};
