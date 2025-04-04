import axios, { AxiosResponse } from "axios";
import { BACKEND_ORIGIN } from "../tools/Constants";
import { CacheService } from "./CacheService";

const cacheService = new CacheService();
const BaseUrl = new URL('api/path', BACKEND_ORIGIN).href;

export const apiGet = async <T>(endpoint: string, cacheable: boolean = false) => {
    if (cacheable) {
        if (!cacheService.checkEntry(endpoint)) {
            cacheService.initializeEntry<AxiosResponse<T>>(endpoint);
        }else {
            return cacheService.get<AxiosResponse<T>>(endpoint)
        }
    }

    const fullUrl = new URL(endpoint, BaseUrl).href;
    console.log('FullURL:', fullUrl);
    return axios.get<T>(fullUrl, { withCredentials: true }).then((response) => {
        if (cacheable) {
            cacheService.set<AxiosResponse<T>>(endpoint, response);
        }
        return response;
    });
}

export const apiPost = async (endpoint: string, data: object) => {
    const fullUrl = new URL(endpoint, BaseUrl).href;
    console.log('FullURL:', fullUrl);
    return axios.post(fullUrl, data, { withCredentials: true });
}