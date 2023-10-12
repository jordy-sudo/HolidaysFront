import  { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { startLoadUsers } from '../../store/auth/thunks';
import { UsersDataGrid } from '../components/UsersDataGrid';
export const Historial = () => {
  const dispatch = useAppDispatch();
  const { activeUsers } = useAppSelector((state) => state.auth);


  useEffect(() => {
    dispatch(startLoadUsers());
  }, []);

  return (
    <>
      <UsersDataGrid users={activeUsers} />
    </>
  )
}
