import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { UsersDataGrid } from '../components/UsersDataGrid';
import { loadUserswithBoss } from '../../store/events/thunks';

export const ListPersonal = () => {
  const dispatch = useAppDispatch();
  const { usersxBoss } = useAppSelector((state) => state.event);


  useEffect(() => {
    dispatch(loadUserswithBoss());
  }, []);

  return (
    <>
      <UsersDataGrid users={usersxBoss} />
    </>
  )
}
