import { createAsyncThunk } from '@reduxjs/toolkit';
import { login, logout, checkingCredentials, loginSession, onLoadUsers } from './authSlice';
import holidaysApi from '../../api/holidaysApi';
import { AuthResponse, Credentials, Usuarios } from '../types/authTypes';
import { onErrorEvents, onLogout } from '../events/eventSlice';
import { showToast } from '../../holidays/helpers/RenderToast';
import { AppDispatch, RootState } from '../store';


export const checkingAuthentication = createAsyncThunk<void, Credentials>(
  'auth/checkingAuthentication',
  async ({ email, password }, { dispatch }) => {
    dispatch(checkingCredentials());
  }
);

export const startLoginWithEmailPassword = createAsyncThunk<AuthResponse, Credentials>(
  'auth/startLoginWithEmailPassword',
  async ({ email, password }, { dispatch }) => {
    dispatch(checkingCredentials());
    try {
      const response = await holidaysApi.post<AuthResponse>('/auth', { email, password });
      if (response.status !== 200) {
        throw new Error(response.data.msg || 'Error de inicio de sesión');
      }
      const result = response.data;
      localStorage.setItem('token', result.token);
      localStorage.setItem('token-init-date', new Date().getTime().toString());
      localStorage.setItem('user-login', JSON.stringify(result));
      showToast('Bienvenido',"success");
      dispatch(login(result));
      return result;
    } catch (error: any) {
      console.error(error);
      dispatch(logout({ errorMessage: error.response?.data.msg || 'Error de inicio de sesión' }));
      throw error;
    }
  }
);

export const startRestoreUser = createAsyncThunk<void, AuthResponse | null>(
  'auth/startRestoreUser',
  async (userData, { dispatch }) => {
    if (userData) {
      dispatch(loginSession(userData));
    } else {
      dispatch(logout({}));
    }
  }
);

export const startLogout = createAsyncThunk<void, void>(
  'auth/startLogout',
  async (_, { dispatch }) => {
    dispatch(checkingCredentials());
    dispatch(logout({}));
    dispatch(onLogout());
    localStorage.removeItem('token');
    localStorage.removeItem('token-init-date');
    localStorage.removeItem('user-login');
  }
);

export const startLoadUsers = createAsyncThunk(
  'auth/listUsers',
  async (_, { dispatch }) => {
    try {
      const response = await holidaysApi.get('/auth/listUsers');
      const result = response.data;
      dispatch(onLoadUsers(result.usuarios));
    } catch (error: any) {
      console.error('Error al cargar eventos:', error.response.data);
      dispatch(onErrorEvents(error.response.data.errors));
    }
  }
);

export const processExcelFile = createAsyncThunk<void,File,{
    dispatch: AppDispatch;
    state: RootState;
  }
>('auth/processExcel', async (file, { dispatch }) => {
  try {
    const response = await holidaysApi.post('/auth/new', file);
    showToast(response.data.msg, 'success');
  } catch (error: any) {
    console.error('Error al cargar usuarios:', error.response.data);
    if (error.response.data.errors) {
      dispatch(onErrorEvents(error.response.data.errors));
      for (const key in error.response.data.errors) {
        showToast(error.response.data.errors[key].msg);
      }
    } else {
      dispatch(onErrorEvents(error.response.data));
      showToast(error.response.data.msg, 'error');
    }
  }
}
);

export const updateUserInfo = createAsyncThunk<Usuarios, { userId: string, userData: Partial<Usuarios> }>(
  'auth/updateInfouser',
  async ({ userId, userData }, { rejectWithValue }) => {
    try {
      const response = await holidaysApi.put<Usuarios>(`/auth/updateInfouser/${userId}`, userData);
      showToast('Información del usuario actualizada correctamente', 'success');
      startLoadUsers();
      return response.data;
    } catch (error: any) {
      console.error('Error al actualizar el usuario:', error);
      showToast(error.response.data.msg, 'error');
      return rejectWithValue(error.response?.data);
    }
  }
);






