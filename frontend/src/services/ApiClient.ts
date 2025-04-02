import axios from "axios";
import { BACKEND_ORIGIN } from "../tools/Constants";

const BaseUrl = new URL('api/path', BACKEND_ORIGIN).href;

export const apiGet = async <T>(endpoint: string) => {
    const fullUrl = new URL(endpoint, BaseUrl).href;
    console.log('FullURL:', fullUrl);
    return axios.get<T>(fullUrl, { withCredentials: true })
}

export const apiPost = async (endpoint:string, data: object)=>{
    const fullUrl = new URL(endpoint, BaseUrl).href;
    console.log('FullURL:', fullUrl);
    return axios.post(fullUrl, data, { withCredentials: true });
}