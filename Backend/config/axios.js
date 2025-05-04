// config/axios.js
require("dotenv").config();
const axios = require("axios");

const axiosInstance = axios.create({
  baseURL: process.env.GITHUB_API,
  headers: {
    Authorization: `token ${process.env.GITHUB_TOKEN}`,
    Accept: "application/vnd.github.v3+json",
  },
});

module.exports = axiosInstance;
