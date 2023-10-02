import axios from "axios";
import { getEnvVariables } from "../helpers/getEnviaroments";


const {apiUrl} = getEnvVariables();


const holidaysApi = axios.create({
    baseURL: apiUrl
});

holidaysApi.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      
      if (token) {
        config.headers['x-token'] = token;
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );


export default holidaysApi;