import axios from "axios";
import { BACKEND_ORIGIN } from "../tools/Constants";

export const apiGet = (endpoint:string)=>{
    const fullUrl = new URL(endpoint, BACKEND_ORIGIN).toString();
    console.log(fullUrl);
    return axios.get(fullUrl, { withCredentials: true })
}

export const apiPost = (endpoint:string, data:any)=>{
    const fullUrl = new URL(endpoint, BACKEND_ORIGIN).toString();
    console.log(fullUrl);
    return axios.post(fullUrl, data, { withCredentials: true });
}