import axios from 'axios';
import { BASE_URL } from '../shared/constants';

const api = axios.create({
  baseURL: BASE_URL.prod,
});

export default api;
