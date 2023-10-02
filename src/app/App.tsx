import React,{useEffect} from 'react'
import { AppRouter } from './router/AppRouter'
import { ThemeHolidays } from './theme'
import { useAppDispatch } from './store/hooks';
import { startRestoreUser } from './store/auth/thunks';
export const TWO_HOURS = 1 * 60 * 60 * 1000;

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const storedUserData = localStorage.getItem('user-login');
    const lastLoginTime = localStorage.getItem('token-init-date');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      
      if (lastLoginTime) {
        const currentTime = Date.now();
        if (currentTime - parseInt(lastLoginTime) > TWO_HOURS) {
          localStorage.removeItem('userData');
        } else {
          dispatch(startRestoreUser(userData));
        }
      } else {
        dispatch(startRestoreUser(userData));
      }
    }
  }, []);
  return (
    <ThemeHolidays>
        <AppRouter/>     
    </ThemeHolidays>
  )
}
