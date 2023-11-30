const {default: axios} = require('axios');
const { NEWSAPI_KEY } = require("../configs/env.config");

function axiosGetAPICallForSources(url,sources) {
    return new Promise((resolve, reject) => {
        axios.get(url,{
            params:{
                sources,
                apiKey: NEWSAPI_KEY
            }
        }).then(resp => {
            return resolve(resp.data);
        }).catch(err => {
            return reject(err);
        });
    });
}

function axiosGetAPICallForCategories(url,category) {
    return new Promise((resolve, reject) => {
        axios.get(url,{
            params:{
                category,
                apiKey: NEWSAPI_KEY
            }
        }).then(resp => {
            return resolve(resp.data);
        }).catch(err => {
            return reject(err);
        });
    });
}

module.exports = {
    axiosGetAPICallForSources,axiosGetAPICallForCategories
};