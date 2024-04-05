import axios from "axios";

const api = axios.create({
  baseURL: process.env.API_HOST as string,
});

export default api;
