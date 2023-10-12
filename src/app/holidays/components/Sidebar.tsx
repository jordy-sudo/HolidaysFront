import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Collapse,
} from '@mui/material';
import { Box } from '@mui/system';
import { useAppDispatch } from '../../store/hooks';
import { setSelectedOption } from '../../store/sidebar/sidebarSlice';
import { ExpandLess, ExpandMore, EventRepeat } from '@mui/icons-material';
import { grey, purple } from '@mui/material/colors';
import { menuItems } from '../constants/sidebarItems';
import { UserRole } from '../../store/types/authTypes';

interface SidebarProps {
  drawerWidth?: number;
  userRole: UserRole;
}

export const Sidebar: React.FC<SidebarProps> = ({ drawerWidth = 240, userRole = 'Empleado' }) => {
  const [selectedMenuItem, setSelectedMenuItem] = useState<string | null>(null);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const handleMenuItemClick = (menuItem: string) => {
    setSelectedMenuItem(menuItem);
    dispatch(setSelectedOption(menuItem));
  };

  const handleSubMenuClick = (subMenuKey: string) => {
    setOpenSubMenu((prevSubMenuKey) => (prevSubMenuKey === subMenuKey ? null : subMenuKey));
  };

  const currentMenuItems = menuItems[userRole] || [];

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            <EventRepeat color='secondary' /> {' '}
            Vacaciones Icesa
          </Typography>
        </Toolbar>
        <List>
          {currentMenuItems.map((menuItem) => (
            <div key={menuItem.key}>
              <ListItemButton
                selected={selectedMenuItem === menuItem.key}
                onClick={() => handleMenuItemClick(menuItem.key)}
              >
                <ListItemIcon>
                  {React.cloneElement(menuItem.icon, {
                    sx: {
                      color: selectedMenuItem === menuItem.key ? purple[700] : grey[500],
                    },
                  })}
                </ListItemIcon>
                <ListItemText primary={menuItem.text} />
                {menuItem.subMenu && (
                  <div onClick={() => handleSubMenuClick(menuItem.key)}>
                    {openSubMenu === menuItem.key ? <ExpandLess /> : <ExpandMore />}
                  </div>
                )}
              </ListItemButton>
              {menuItem.subMenu && (
                <Collapse in={openSubMenu === menuItem.key} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {menuItem.subMenu.map((subMenuItem) => (
                      <ListItemButton
                        key={subMenuItem.key}
                        selected={selectedMenuItem === subMenuItem.key}
                        onClick={() => handleMenuItemClick(subMenuItem.key)}
                        sx={{ pl: 4 }}
                      >
                        <ListItemIcon>
                          {React.cloneElement(subMenuItem.icon, {
                            sx: {
                              color: selectedMenuItem === subMenuItem.key ? purple[700] : grey[500],
                            },
                          })}
                        </ListItemIcon>
                        <ListItemText primary={subMenuItem.text} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              )}
            </div>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
