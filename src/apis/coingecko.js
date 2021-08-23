import axios from "axios";

const coingecko = axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
});

coingecko.interceptors.request.use((request) => {
  return request;
});

export default coingecko;
