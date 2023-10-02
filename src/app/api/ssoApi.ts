import axios from "axios";
import { getEnvVariables } from "../helpers/getEnviaroments";


const {ssoUrl} = getEnvVariables();

const ssoApi = axios.create({
    baseURL: ssoUrl
});

ssoApi.interceptors.request.use(config =>{
    return config
});



export default ssoApi;