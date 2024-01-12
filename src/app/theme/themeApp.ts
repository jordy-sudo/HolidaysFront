import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

export const themeApp = createTheme({
    palette:{
        primary:{
            main: '#64489D'
        },
        secondary:{
            main: '#FF453C'
        },
        error:{
            main: red.A400
        }
    }
});