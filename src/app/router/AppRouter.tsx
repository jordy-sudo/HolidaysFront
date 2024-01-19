import { HolidaysPage } from '../holidays';
import { Routes, Route, Navigate } from 'react-router-dom';
// import { ChekingAuth } from '../ui/components/ChekingAuth';
import { useAppSelector } from '../store/hooks';
import { RootState } from '../store/store';
import { AuthRoutes } from '../auth/routes/AuthRoutes';

export const AppRouter = () => {
  const { status } = useAppSelector((state: RootState) => state.auth);

  // Descomenta este bloque si deseas mostrar una pantalla de carga mientras se verifica la autenticación
  // if (status === 'checking') {
  //   return <ChekingAuth />;
  // }

  return (
    <Routes>
      {status === 'authenticated' ? (
        <>
          <Route path="/" element={<HolidaysPage />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </>
      ) : (
        <>
          <Route path="/auth/*" element={<AuthRoutes />} />
          <Route path="/*" element={<Navigate to="/auth/login" />} />
        </>
      )}
    </Routes>
  );
};
