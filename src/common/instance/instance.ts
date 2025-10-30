import axios from "axios"
import { AUTH_TOKEN } from "../constants"

export const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "API-KEY": import.meta.env.VITE_API_KEY,
    Authorization: `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`,
  },
})

instance.interceptors.request.use(function (config) {
  config.headers["Authorization"] = `Bearer ${localStorage.getItem(AUTH_TOKEN)}`
  return config
})
