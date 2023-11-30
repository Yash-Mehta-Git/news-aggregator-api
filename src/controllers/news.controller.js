
const { readUsers } = require("../utils/usersFile.util");
const { NEWSAPI_KEY } = require("../configs/env.config");
const {ERR_SERVER_ERROR,ERR_USER_NOT_FOUND} = require("../constants/app.constants");
const { axiosGetAPICallForSources,axiosGetAPICallForCategories } = require('../utils/newsapiCallHelper');
const URI_NEWSAPI_EVERYTHING = "https://newsapi.org/v2/everything";
const URI_NEWSAPI_TOP = "https://newsapi.org/v2/top-headlines";

async function getNews(req, res) {
    const { id, preferences } = req.user;
    let usersData = JSON.parse(JSON.stringify(readUsers()));
    const userIndex = usersData.findIndex((user) => user.id === id);
    if (userIndex === -1) {
        return res.status(404).json({ error: ERR_SERVER_ERROR });
    }
    try {
        const sources = preferences.sources.join(",");
        const newsResponse = await axiosGetAPICallForSources(URI_NEWSAPI_EVERYTHING,sources);
        res.status(200).json(newsResponse.articles);
    } catch (error) {
    console.error(error);
    return res.status(500).json({ message: ERR_SERVER_ERROR });
  }
}

async function getTopNews(req, res) {
    const { id, preferences } = req.user;
    let usersData = JSON.parse(JSON.stringify(readUsers()));
    const userIndex = usersData.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return res.status(404).json({ error: ERR_USER_NOT_FOUND });
    }
    try {
        const category = preferences.categories.join(",");
        const newsResponse = await axiosGetAPICallForCategories(URI_NEWSAPI_TOP,category);
        res.status(200).json(newsResponse.articles);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: ERR_SERVER_ERROR });
    }
}
module.exports = { getNews, getTopNews };