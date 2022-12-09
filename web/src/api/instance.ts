import axios from "axios";

export const SERVER_ROOT_URL = "http://localhost:5000";

const instance = axios.create({
  baseURL: SERVER_ROOT_URL,
});

export default instance;
