import axios from "axios";

export default axios.create({
  baseURL: "REQUEST_URL",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin" : "ORIGIN_REQUEST_URL",
    "Access-Control-Allow-Methods": "GET, PUT, POST, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers" : "Origin, Content-Type, Accept"
  }
});