import axios from "axios";


const BASE_URL = "http://localhost:5000"; //replace with config based url here

export const ApiGet = (endpoint:string)=>{

    const fullUrl = new URL(endpoint, BASE_URL).toString();
    console.log(fullUrl);
    return axios.get(fullUrl, { withCredentials: true })
}

export const ApiPost = (endpoint:string, data:any)=>{
    const fullUrl = new URL(endpoint, BASE_URL).toString();
    console.log(fullUrl);
    return axios.post(fullUrl, data, { withCredentials: true });
}