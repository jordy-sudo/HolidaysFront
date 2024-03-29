import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import BadgeIcon from '@mui/icons-material/Badge';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
// import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import SummarizeIcon from '@mui/icons-material/Summarize';
// import SettingsIcon from '@mui/icons-material/Settings';
import TimelineIcon from '@mui/icons-material/Timeline';
// import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import ReduceCapacityIcon from '@mui/icons-material/ReduceCapacity';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { UserRole } from '../../store/types/authTypes';


export interface MenuItem {
  key: string;
  icon: JSX.Element;
  text: string;
  subMenu?: MenuItem[];
}



export const menuItems: Record<UserRole, MenuItem[]> = {
  Jefe: [
    { key: 'Solicitud', icon: <DirectionsRunIcon />, text: 'Solicitud' },
    { key: 'Profile', icon: <BadgeIcon />, text: 'Profile' },
    {
      key: 'Solicitudes',
      icon: <FolderSharedIcon />,
      text: 'Personal a Cargo',
      subMenu: [
        { key: 'SolicitudesPersonal', icon: <CalendarMonthIcon />, text: 'Solicitudes' },
        { key: 'ListPersonal', icon: <BackupTableIcon />, text: 'Listado' },
      ],
    },
  ],
  Empleado: [
    { key: 'Solicitud', icon: <DirectionsRunIcon />, text: 'Solicitud' },
    { key: 'Profile', icon: <BadgeIcon />, text: 'Profile' },
    // { key: 'User Table', icon: <PeopleIcon />, text: 'User Table' },
    // { key: 'History', icon: <HistoryIcon />, text: 'History' },
    // { key: 'Reports', icon: <SummarizeIcon />, text: 'Reports' },
  ],
  rrhh: [
    { key: 'Solicitud', icon: <DirectionsRunIcon />, text: 'Solicitud' },
    { key: 'Profile', icon: <BadgeIcon />, text: 'Perfil' },
    // { key: 'User Table', icon: <PeopleIcon />, text: 'User Table' },
    // { key: 'History', icon: <HistoryIcon />, text: 'History' },
    {
      key: 'RRHH',
      icon: <Diversity1Icon />,
      text: 'RRHH Menu',
      subMenu: [
        { key: 'Recepcion', icon: <ChecklistRtlIcon />, text: 'Reportes' },
        { key: 'Historial', icon: <FormatAlignLeftIcon />, text: 'Lista Usuarios' },
        { key: 'Users', icon: <ReduceCapacityIcon />, text: 'Configuracion' },
      ],
    },
  ],
  Administrador: [
    { key: 'Solicitud', icon: <DirectionsRunIcon />, text: 'Solicitud' },
    { key: 'Profile', icon: <BadgeIcon />, text: 'Profile' },
    { key: 'SolicitudesPersonal', icon: <CalendarMonthIcon />, text: 'Solicitudes Personal' },
    // { key: 'User Table', icon: <ReceiptLongIcon />, text: 'User Table' },
    { key: 'History', icon: <TimelineIcon />, text: 'Historial' },
    { key: 'Reports', icon: <SummarizeIcon />, text: 'Reportes' },
    // {
    //   key: 'Admin Menu',
    //   icon: <SettingsIcon />,
    //   text: 'Admin Menu',
    //   subMenu: [
    //     { key: 'Option 1', icon: <SettingsIcon />, text: 'Option 1' },
    //     { key: 'Option 2', icon: <SettingsIcon />, text: 'Option 2' },
    //     { key: 'Option 3', icon: <SettingsIcon />, text: 'Option 3' },
    //   ],
    // },
  ],
};
