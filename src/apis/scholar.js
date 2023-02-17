import axios from "axios";

const scholar = axios.create({
	baseURL: "https://iskotrack-server.onrender.com",
});

scholar.interceptors.request.use((request) => {
	return request;
});

export default scholar;
