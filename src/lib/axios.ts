import axios from "axios";

export const api = axios.create({
  baseURL: "https://palm-planner-server.onrender.com",
});
