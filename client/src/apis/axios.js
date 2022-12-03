import axios from "axios";

const instance = axios.create({
  // baseURL: "http://52.196.233.251:5000",
  baseURL: "http://localhost:5000",
});

export default instance;
