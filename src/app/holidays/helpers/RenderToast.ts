import { toast } from 'react-toastify';

export const showToast = (message: string, type: 'success' | 'error' = 'error') => {
  toast(message, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 3000,
    type: type,
  });
};
