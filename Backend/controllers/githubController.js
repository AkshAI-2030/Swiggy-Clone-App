// controllers/githubController.js
const axios = require("axios");

const username = "AkshAI-2030"; // You can later externalize this

const getUserProfile = async () => {
  const response = await axios.get(`https://api.github.com/users/${username}`);
  return response.data;
};

const getRepos = async () => {
  const response = await axios.get(
    `https://api.github.com/users/${username}/repos`
  );
  return response.data;
};

module.exports = {
  getUserProfile,
  getRepos,
};
