import { getCookie } from '@/utils/cookies';
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use(async (req) => {
  const token = await getCookie('accessToken');

  req.headers['Authorization'] = `Bearer ${token}`;

  return req;
});

export { api };
