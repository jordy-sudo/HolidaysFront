import { Toolbar } from '@mui/material';
import { Box } from '@mui/system'
import React, { ReactNode } from 'react'
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
  // Utilizamos una type assertion (as) para indicar que role tiene uno de los valores válidos.

  return (
    <Box sx={{ display: 'flex' }} className="animate__animated animate__fadeIn">
      <NavbarHolidays drawerWidth={drawerWidth} />
      {role !== null && <Sidebar drawerWidth={drawerWidth} userRole={role} />}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  )
}
