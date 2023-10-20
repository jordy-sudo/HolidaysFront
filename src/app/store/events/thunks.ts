import { createAsyncThunk } from '@reduxjs/toolkit';
import { onErrorEvents, onLoadDocuments, onLoadEvents, onLoadEventswithBoss, onLoadNotifications } from './eventSlice';
import { EventCreate, EventError, EventResponse, EventUpdate } from '../types/eventTypes';
import holidaysApi from '../../api/holidaysApi';
import { showToast } from '../../holidays/helpers/RenderToast';

export const loadEvents = createAsyncThunk(
  'event/loadEvents',
  async (_, { dispatch }) => {
    try {
      const response = await holidaysApi.get<EventResponse>('/events/vacations');
      const result = response.data;
      dispatch(onLoadEvents(result));
    } catch (error: any) {
      console.error('Error al cargar eventos:', error.response.data);
      if (error.response.data.errors) {
        dispatch(onErrorEvents(error.response.data.errors));
        for (const key in error.response.data.errors) {
          showToast(error.response.data.errors[key].msg);
        }
      }else{
        dispatch(onErrorEvents(error.response.data));
        showToast(error.response.data.msg, 'error');
      }
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
      if (error.response.data.errors) {
        dispatch(onErrorEvents(error.response.data.errors));
        for (const key in error.response.data.errors) {
          showToast(error.response.data.errors[key].msg);
        }
      }else{
        dispatch(onErrorEvents(error.response.data));
        showToast(error.response.data.msg, 'error');
      }
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
      if (error.response.data.errors) {
        dispatch(onErrorEvents(error.response.data.errors));
        for (const key in error.response.data.errors) {
          showToast(error.response.data.errors[key].msg);
        }
      }else{
        dispatch(onErrorEvents(error.response.data));
        showToast(error.response.data.msg, 'error');
      }
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
      if (error.response.data.errors) {
        dispatch(onErrorEvents(error.response.data.errors));
        for (const key in error.response.data.errors) {
          showToast(error.response.data.errors[key].msg);
        }
      }else{
        dispatch(onErrorEvents(error.response.data));
        showToast(error.response.data.msg, 'error');
      }
    }
  }
);

export const createEvent = createAsyncThunk(
  'event/createEvent',
  async(requestData: EventCreate, { dispatch })=>{
    try {
      const response = await holidaysApi.post<EventCreate>('/events',requestData);
      const result = response.data;
      showToast('Solicitud Creada', 'success');
      dispatch(loadEvents());
      dispatch(loadNotifications());
    } catch (error:any) {
      console.error('Error al crear evento:', error.response.data.errors);
      if (error.response.data.errors) {
        dispatch(onErrorEvents(error.response.data.errors));
        for (const key in error.response.data.errors) {
          showToast(error.response.data.errors[key].msg);
        }
      } else {
        dispatch(onErrorEvents(error.response.data));
        showToast(error.response.data.msg);
      }
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
      }
      dispatch(loadEvents());
      dispatch(loadNotifications());
      dispatch(loadDocuments());
    } catch (error: any) {
      console.error('Error al aceptar evento:', error.response.data.errors);
      if (error.response.data.errors) {
        dispatch(onErrorEvents(error.response.data.errors));
        for (const key in error.response.data.errors) {
          showToast(error.response.data.errors[key].msg);
        }
      } else {
        dispatch(onErrorEvents(error.response.data));
        showToast(error.response.data.msg);
      }
    }
  }
);
