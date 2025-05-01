import axios from "axios";

export const axiosInstance = axios.create({
	baseURL: "http://13.125.208.179:5011/",
});
