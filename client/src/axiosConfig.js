// src/axiosConfig.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3030",  // ✅ Must match backend port
});

export default axiosInstance;
