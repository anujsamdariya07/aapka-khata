import axios, { AxiosInstance } from 'axios';

const baseURL =
  import.meta.env.NEXT_PUBLIC_BASE_URL || 'https://aapka-khata-server.onrender.com/api';

console.log('Axios Base URL:', baseURL);

export const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});
