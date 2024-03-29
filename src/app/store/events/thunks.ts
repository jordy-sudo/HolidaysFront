import { createAsyncThunk } from '@reduxjs/toolkit';
import { onErrorEvents, onLoadDocuments, onLoadEvents, onLoadEventswithBoss, onLoadNotifications, onLoadUsersxBoss } from './eventSlice';
import { EventCreate, EventError, EventResponse, EventUpdate } from '../types/eventTypes';
import holidaysApi from '../../api/holidaysApi';
import { showToast } from '../../holidays/helpers/RenderToast';

const handleApiError = (error: any, dispatch: any) => {
  dispatch(onErrorEvents(error.response?.data?.errors || error.response?.data));
  showToast(error.response?.data?.msg || 'Error al cargar eventos', 'error');
};

const dispatchCommonActions = (dispatch: any, ...actions: any[]) => {
  actions.forEach(action => dispatch(action()));
};

export const loadEvents = createAsyncThunk(
  'event/loadEvents',
  async (_, { dispatch }) => {
    try {
      const response = await holidaysApi.get<EventResponse>('/events/vacations');
      const result = response.data;
      dispatch(onLoadEvents(result));
    } catch (error: any) {
      console.error('Error al cargar eventos:', error.response.data);
      handleApiError(error, dispatch);
    }
  }
);

export const loadEventswithBoss = createAsyncThunk(
  'event/loadEventswithBoss',
  async (_, { dispatch }) => {
    try {
      const response = await holidaysApi.get<EventResponse>('/events/employee-vacations');
      const result = response.data;
      dispatch(onLoadEventswithBoss(result));
    } catch (error: any) {
      console.error('Error al cargar eventos:', error.response.data);
      handleApiError(error, dispatch);
    }
  }
);

export const loadUserswithBoss = createAsyncThunk(
  'event/listUsersxBoss',
  async (_, { dispatch }) => {
    try {
      const response = await holidaysApi.get('/events/listUsersxBoss');
      const result = response.data;
      dispatch(onLoadUsersxBoss(result.eventos));
    } catch (error: any) {
      console.error('Error al cargar eventos:', error.response.data);
      handleApiError(error, dispatch);
    }
  }
);

export const loadNotifications = createAsyncThunk(
  'event/loadEvents',
  async (_, { dispatch }) => {
    try {
      const response = await holidaysApi.get<EventResponse>('/events/notifications');
      const result = response.data;
      dispatch(onLoadNotifications(result));
    } catch (error: any) {
      console.error('Error al cargar eventos:', error.response.data);
      handleApiError(error, dispatch);
    }
  }
);

export const loadDocuments = createAsyncThunk(
  'event/loadDocuments',
  async (_, { dispatch }) => {
    try {
      const response = await holidaysApi.get<EventResponse>('/events/documents');
      const result = response.data;
      dispatch(onLoadDocuments(result));
    } catch (error: any) {
      console.error('Error al cargar documentos:', error.response.data);
      handleApiError(error, dispatch);
    }
  }
);

export const createEvent = createAsyncThunk(
  'event/createEvent',
  async(requestData: EventCreate, { dispatch })=>{
    try {
      await holidaysApi.post<EventCreate>('/events',requestData);
      showToast('Solicitud Creada', 'success');
      dispatchCommonActions(dispatch, loadEvents, loadNotifications);
    } catch (error:any) {
      console.error('Error al crear evento:', error.response.data.errors);
      handleApiError(error, dispatch);
    }
  }
);

export const createEventEmployee = createAsyncThunk(
  'event/createEventEmployee',
  async(requestData: any, { dispatch })=>{
    try {
      await holidaysApi.post<EventCreate>('/events/event-employee',requestData);
      showToast('Solicitud Creada', 'success');
      dispatchCommonActions(dispatch, loadEvents, loadNotifications);
    } catch (error:any) {
      console.error('Error al crear evento:', error.response.data.errors);
      handleApiError(error, dispatch);
    }
  }
);

export const aceptEvent = createAsyncThunk(
  'event/aceptEvent',
  async ({ eventId, requestData }: { eventId: string, requestData: EventUpdate }, { dispatch }) => {
    try {
      const response = await holidaysApi.patch<EventError>(`/events/update-status/${eventId}`, requestData);
      const result = response.data;
      if(requestData.camp !== 'show'){
        showToast(result.msg, 'success');
        dispatchCommonActions(dispatch, loadEvents, loadNotifications, loadDocuments, loadEventswithBoss);
      }
    } catch (error: any) {
      console.error('Error al aceptar evento:', error.response.data.errors);
      handleApiError(error, dispatch);
    }
  }
);
