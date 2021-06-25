import axios from "axios";

export default axios.create({
  baseURL: "https://iskotrack-server.herokuapp.com",
});
