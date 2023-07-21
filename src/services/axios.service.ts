import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;
const apiKey = process.env.REACT_APP_API_KEY;

const axiosService = axios.create({baseURL});

axiosService.interceptors.request.use(res=> {
    res.headers.Authorization = `Bearer ${apiKey}`;

    return res;
})

export {
    axiosService
};