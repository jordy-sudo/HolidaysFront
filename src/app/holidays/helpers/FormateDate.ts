import { format } from 'date-fns';

export const formatDateHelp = (date: string) => {
    return format(new Date(date), 'dd/MM/yyyy');
};