import React, { ReactElement, useState, useEffect } from "react";
import {
  AppBar,
  Badge,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import {
  LogoutOutlined,
  NotificationsOutlined,
} from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { startLogout } from "../../store/auth/thunks";
import { aceptEvent, loadNotifications } from "../../store/events/thunks";
import { Event } from "../../store/types/eventTypes";
import { EventDetailsModal } from "./EventDetailsModal";

interface NavbarHolidaysProps {
  drawerWidth?: number;
}

export const NavbarHolidays = ({
  drawerWidth = 240,
}: NavbarHolidaysProps): ReactElement => {
  const dispatch = useAppDispatch();
  const { name } = useAppSelector((state) => state.auth);
  const { notifications } = useAppSelector((state) => state.event);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    dispatch(loadNotifications());
  }, []);

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

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
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
              notifications.map((notification) => (
                <MenuItem
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <Card>
                    <CardContent>
                      <Typography component="div">
                        {notification.user.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Solicita: {notification.title}
                      </Typography>
                    </CardContent>
                  </Card>
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
