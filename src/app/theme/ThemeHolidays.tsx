import React, { ReactNode } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { themeApp } from './themeApp';

interface ThemeHolidaysProps {
  children: ReactNode;
}

export const ThemeHolidays: React.FC<ThemeHolidaysProps> = ({ children }) => {
  return (
    <ThemeProvider theme={themeApp}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};


