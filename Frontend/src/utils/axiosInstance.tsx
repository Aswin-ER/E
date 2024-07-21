import axios from "axios";

const isBrowser = typeof window !== "undefined";

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}`,
  timeout: 1000,
  withCredentials: true,
  headers: {
    authorization: isBrowser ? `Bearer ${localStorage?.getItem("accessToken")}` : "",
  },
});

export default axiosInstance;
