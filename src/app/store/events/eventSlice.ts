import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EventResponse, Event, EventError } from '../types/eventTypes';

interface EventState {
  events: Event[];
  eventsWithBoss: Event[];
  notifications:Event[];
  documents:Event[];
  usersxBoss:[];
  isLoadingEvents: boolean;
  errorMessage: string | null;
}

const initialState: EventState = {
  events: [],
  notifications:[],
  eventsWithBoss:[],
  documents:[],
  usersxBoss:[],
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
    onLoadEventswithBoss: (state, action: PayloadAction<EventResponse>) => {
      state.isLoadingEvents = false;
      state.eventsWithBoss = action.payload.eventos; 
    },
    onLoadNotifications:(state, action: PayloadAction<EventResponse>)=>{
      state.isLoadingEvents = false;
      state.notifications = action.payload.eventos; 
    },
    onLoadUsersxBoss:(state, action: PayloadAction<[]>)=>{
      state.isLoadingEvents = false;
      state.usersxBoss = action.payload; 
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

export const { onLoadEvents, 
  onErrorEvents, 
  onLoadNotifications,
  onLoadDocuments,
  onLoadEventswithBoss, 
  onLogout,
  onLoadUsersxBoss,
  } = eventSlice.actions;
export default eventSlice.reducer;


  
