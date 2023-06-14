import axios from "axios";

import {baseURL} from "../constants";

const axiosService = axios.create({baseURL});

// const apiKey = process.env.API_KEY;
const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDY4ZmVmMjlkNDQxM2VkOTc4NjQ4N2EzYTQxODk1ZSIsInN1YiI6IjY0NWZhN2YzZWY4YjMyMDE1NTU0NmJkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ub7lcnsBNgtdDKJN8XMAnp7HiyVzfZMBy6dXBehd-wY'

axiosService.interceptors.request.use(res=> {
    res.headers.Authorization = `Bearer ${apiKey}`;

    return res;
})

export {
    axiosService
};