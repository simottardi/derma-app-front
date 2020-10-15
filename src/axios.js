import axios from "axios";
import { apiUrl } from "./config/constants";
require("dotenv").config();

console.log("WHAT IS ENV", process.env.API_URL);

const instance = axios.create({
  baseURL: apiUrl
});

export default instance;
