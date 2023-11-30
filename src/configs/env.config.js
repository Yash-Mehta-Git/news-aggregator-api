require("dotenv").config();

const { PORT, JWT_SECRET, NEWSAPI_KEY } = process.env;

module.exports = {
  PORT,
  JWT_SECRET,
  NEWSAPI_KEY
};
