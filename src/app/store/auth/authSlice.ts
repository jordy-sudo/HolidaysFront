import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthResponse } from '../types/authTypes';


interface AuthState {
  status: 'checking' | 'authenticated' | 'no-authenticated';
  uid: string | null;
  name: string | null;
  role:string | null;
  position: string | null;
  department: string | null;
  email: string | null;
  errorMessage: string | null;
}

const initialState: AuthState = {
  // status: 'no-authenticated',
  status: 'no-authenticated',
  uid: null,
  name: null,
  role:null,
  position:null,
  department:null,
  email:null,
  errorMessage: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthResponse>) => {
      state.status = 'authenticated';
      state.uid = action.payload.uid;
      state.name = action.payload.name;
      state.role = action.payload.role;
      state.department = action.payload.department;
      state.position = action.payload.position;
      state.email = action.payload.email;
      state.errorMessage = null;
    },
    loginSession:(state, action: PayloadAction<AuthResponse>)=>{
      state.status = 'authenticated';
      state.uid = action.payload.uid;
      state.name = action.payload.name;
      state.role = action.payload.role;
      state.errorMessage = null;
    },
    logout: (state, action: PayloadAction<{ errorMessage?: string }>) => {
      state.status = 'no-authenticated';
      state.uid = null;
      state.name = null;
      state.role = null;
      state.errorMessage = action.payload?.errorMessage || null;
    },
    checkingCredentials: (state) => {
      state.status = 'checking';
    },
  },
});

export const { login, loginSession, logout, checkingCredentials } = authSlice.actions;
export default authSlice.reducer;
