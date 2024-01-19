import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthResponse } from '../types/authTypes';


interface AuthState {
  status: 'checking' | 'authenticated' | 'no-authenticated';
  uid: string | null;
  name: string | null;
  role:string | null;
  position: string | null;
  department: string | null;
  vacationDays: number | null;
  dateOfJoining : string | null;
  email: string | null;
  errorMessage: string | null;  
  errorUsersMassive: [];
  activeUsers:[];
}

const initialState: AuthState = {
  // status: 'no-authenticated',
  status: 'no-authenticated',
  uid: null,
  name: null,
  role:null,
  position:null,
  department:null,
  vacationDays:null,
  dateOfJoining:null,
  email:null,
  errorMessage: null,
  errorUsersMassive: [],
  activeUsers:[],
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
      state.vacationDays = action.payload.vacationDays;
      state.dateOfJoining = action.payload.dateOfJoining;
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
    onLoadUsers: (state, action: PayloadAction<[]>) => {
      state.activeUsers = action.payload;
    },
    checkingCredentials: (state) => {
      state.status = 'checking';
    },
    onErrorUsersMassive:(state, action: PayloadAction<[]>)=>{
      state.errorUsersMassive = action.payload;
    }
  },
});

export const { login, loginSession, logout, onLoadUsers,onErrorUsersMassive,checkingCredentials, } = authSlice.actions;
export default authSlice.reducer;
