import axios from "axios";

const lunacian = axios.create({
  baseURL: "https://game-api.skymavis.com/game-api/clients",
});

lunacian.interceptors.request.use((request) => {
  return request;
});

export default lunacian;
