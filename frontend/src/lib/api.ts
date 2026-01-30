import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

//Ssconsole.log('API base URL:', process.env.NEXT_PUBLIC_API_URL);