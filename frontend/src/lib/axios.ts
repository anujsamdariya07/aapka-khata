import axios, { AxiosInstance } from 'axios';

const baseURL =
  import.meta.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000/api';

console.log('Axios Base URL:', baseURL);

export const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});
