import axios from "axios";

export default axios.create({
  baseURL: "https://axieinfinity.com/graphql-server-v2/graphql",
});
