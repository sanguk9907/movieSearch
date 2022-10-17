import axios from "axios";
const key = "3cf148810eae178af2afb1a072cfe76d";
const instance = axios.create({
  baseURL: "http://localhost:5000",
  params: {
    api_key: key,
  },
});

export default instance;
