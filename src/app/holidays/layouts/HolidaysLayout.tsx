import {  Toolbar, Fade } from '@mui/material';
import { Box } from '@mui/system'
import  { ReactNode, useState } from 'react'
import { NavbarHolidays } from '../components/NavbarHolidays';
import { Sidebar } from '../components/Sidebar';
import { useAppSelector } from '../../store/hooks';
import { UserRole } from '../../store/types/authTypes';

interface HolidaysLayoutProps {
  children: ReactNode;
}

const drawerWidth = 240;

export const HolidaysLayout = ({ children }: HolidaysLayoutProps) => {
  const role = useAppSelector((state) => state.auth.role) as UserRole;
  const [expanded, setExpanded] = useState(true);

  const handleToggleSidebar = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };
  return (
    <Fade  in={true}>
      <Box sx={{ display: 'flex', transition: 'margin-left 0.3s ease' }}>
        <NavbarHolidays drawerWidth={drawerWidth} expanded={expanded} onToggle={handleToggleSidebar} />
        {role !== null && <Sidebar drawerWidth={drawerWidth} userRole={role} expanded={expanded} />}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          {children}
        </Box>
      </Box>
    </Fade>
  )
}
