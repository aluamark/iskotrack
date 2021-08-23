import axios from "axios";

const scholar = axios.create({
  baseURL: "https://iskotrack-server.herokuapp.com",
});

scholar.interceptors.request.use((request) => {
  return request;
});

export default scholar;
