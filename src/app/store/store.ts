import { configureStore } from '@reduxjs/toolkit'
import authSlice from './auth/authSlice'
import sidebarSlice from './sidebar/sidebarSlice'
import eventSlice from './events/eventSlice'


export const store = configureStore({
  reducer: {
    auth: authSlice,
    sidebar:sidebarSlice,
    event:eventSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch