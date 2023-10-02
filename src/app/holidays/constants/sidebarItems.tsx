import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import BadgeIcon from '@mui/icons-material/Badge';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import SummarizeIcon from '@mui/icons-material/Summarize';
import SettingsIcon from '@mui/icons-material/Settings';
import TimelineIcon from '@mui/icons-material/Timeline';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import ReduceCapacityIcon from '@mui/icons-material/ReduceCapacity';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';


export interface MenuItem {
  key: string;
  icon: JSX.Element;
  text: string;
  subMenu?: MenuItem[];
}

export const menuItems: Record<'employee' | 'boss' | 'administrator' | 'hr', MenuItem[]> = {
  boss: [
    { key: 'Solicitud', icon: <DirectionsRunIcon />, text: 'Solicitud' },
    { key: 'Profile', icon: <BadgeIcon />, text: 'Profile' },
    {
      key: 'Solicitudes',
      icon: <FolderSharedIcon />,
      text: 'Solicitudes',
      subMenu: [
        { key: 'My Requests', icon: <AssignmentIndIcon />, text: 'My Requests' },
        { key: 'New Request', icon: <AssignmentIndIcon />, text: 'New Request' },
      ],
    },
  ],
  employee: [
    { key: 'Solicitud', icon: <DirectionsRunIcon />, text: 'Solicitud' },
    { key: 'Profile', icon: <BadgeIcon />, text: 'Profile' },
    // { key: 'User Table', icon: <PeopleIcon />, text: 'User Table' },
    // { key: 'History', icon: <HistoryIcon />, text: 'History' },
    // { key: 'Reports', icon: <SummarizeIcon />, text: 'Reports' },
  ],
  hr: [
    { key: 'Solicitud', icon: <DirectionsRunIcon />, text: 'Solicitud' },
    { key: 'Profile', icon: <BadgeIcon />, text: 'Perfil' },
    // { key: 'User Table', icon: <PeopleIcon />, text: 'User Table' },
    // { key: 'History', icon: <HistoryIcon />, text: 'History' },
    {
      key: 'RRHH',
      icon: <Diversity1Icon />,
      text: 'RRHH Menu',
      subMenu: [
        { key: 'Recepcion', icon: <ChecklistRtlIcon />, text: 'Reportes Nomina' },
        { key: 'Historial', icon: <FormatAlignLeftIcon />, text: 'Historial de Solicitudes' },
        { key: 'Users', icon: <ReduceCapacityIcon />, text: 'Usuarios' },
      ],
    },
  ],
  administrator: [
    { key: 'Solicitud', icon: <DirectionsRunIcon />, text: 'Solicitud' },
    { key: 'Profile', icon: <BadgeIcon />, text: 'Profile' },
    { key: 'User Table', icon: <ReceiptLongIcon />, text: 'User Table' },
    { key: 'History', icon: <TimelineIcon />, text: 'History' },
    { key: 'Reports', icon: <SummarizeIcon />, text: 'Reports' },
    {
      key: 'Admin Menu',
      icon: <SettingsIcon />,
      text: 'Admin Menu',
      subMenu: [
        { key: 'Option 1', icon: <SettingsIcon />, text: 'Option 1' },
        { key: 'Option 2', icon: <SettingsIcon />, text: 'Option 2' },
        { key: 'Option 3', icon: <SettingsIcon />, text: 'Option 3' },
      ],
    },
  ],
};
