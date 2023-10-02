import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EventResponse, Event, EventError } from '../types/eventTypes';

interface EventState {
  events: Event[];
  notifications:Event[];
  documents:Event[];
  isLoadingEvents: boolean;
  errorMessage: string | null;
}

const initialState: EventState = {
  events: [],
  notifications:[],
  documents:[],
  isLoadingEvents: true,
  errorMessage: null,
};

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    onLoadEvents: (state, action: PayloadAction<EventResponse>) => {
      state.isLoadingEvents = false;
      state.events = action.payload.eventos; 
    },
    onLoadNotifications:(state, action: PayloadAction<EventResponse>)=>{
      state.isLoadingEvents = false;
      state.notifications = action.payload.eventos; 
    },
    onLoadDocuments:(state, action: PayloadAction<EventResponse>)=>{
      state.isLoadingEvents = false;
      state.documents = action.payload.eventos; 
    },
    onErrorEvents:(state,action: PayloadAction<EventError>)=>{
      state.errorMessage = action.payload.msg;
    },
    onLogout:(state)=>{
      state.documents =[];
      state.events =[];
      state.notifications =[];
    }
    // onCreateEvent:(state,action: PayloadAction<EventCreate>)=>{
    //   state.
    // }    
  },
});

export const { onLoadEvents, onErrorEvents, onLoadNotifications,onLoadDocuments, onLogout } = eventSlice.actions;
export default eventSlice.reducer;