import axios from "axios";

const graphql = axios.create({
  baseURL: "https://axieinfinity.com/graphql-server-v2/graphql",
});

graphql.interceptors.request.use((request) => {
  return request;
});

export default graphql;
