import { createAsyncThunk } from '@reduxjs/toolkit';
import { login, logout, checkingCredentials, loginSession } from './authSlice';
import holidaysApi from '../../api/holidaysApi';
import { AuthResponse, Credentials } from '../types/authTypes';
import { onLogout } from '../events/eventSlice';




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




