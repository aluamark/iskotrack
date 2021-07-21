import axios from "axios";

export default axios.create({
  baseURL: "https://game-api.skymavis.com/game-api/clients",
});
