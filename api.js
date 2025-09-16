import axios from "axios";

const api = axios.create({
  baseURL: "https://movies-api-q5an.onrender.com",
});

export default api;
