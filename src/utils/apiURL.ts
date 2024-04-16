import { env } from "@/envConfig";
import axios from "axios";

const api = axios.create({
  baseURL: env.API_HOST as string,
});

export default api;
