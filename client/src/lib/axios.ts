import axios from "axios";

export const axiosIntance = axios.create({
    baseURL: process.env.BASE_URL,
});