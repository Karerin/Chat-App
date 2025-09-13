import axios from 'axios';

// we are creating an axios instance to use in our entire application

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:5001/api', // replace with your backend URL
  withCredentials: true, // this allows us to send cookies in every single requests
});