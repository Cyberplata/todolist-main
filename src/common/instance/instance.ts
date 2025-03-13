import axios from "axios"
import { API_KEY, BASE_URL } from "common/config/config"

export const instance = axios.create({
   baseURL: BASE_URL,
   headers: {
      "API-KEY": API_KEY,
   },
})

instance.interceptors.request.use(function (config) {
   config.headers.Authorization = `Bearer ${localStorage.getItem("sn-token")}`
   // config.headers["Authorization"] = `Bearer ${localStorage.getItem("sn-token")}`
   return config
})
