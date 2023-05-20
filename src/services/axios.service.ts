import axios from "axios";

import {API_KEY, baseURL} from "../constants";

const axiosService = axios.create({baseURL});

axiosService.interceptors.request.use(res=> {
    res.headers.Authorization = API_KEY;

    return res;
})

export {
    axiosService
};