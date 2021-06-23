const fetch = require('node-fetch');
const constants = require('./constants');
const secrets = require('./secrets');

module.exports = function fetchActivityIds(limit, start) {
    return fetch(`${constants.ACTIVITY_IDS_URL}?limit=${limit}&start=${start}&_=${secrets.ACTIVITY_IDS_TIMESTAMP}`, {
        "headers": {
            "accept": "application/json, text/javascript, */*; q=0.01",
            "accept-language": "en-GB,en;q=0.9,en-US;q=0.8,nl;q=0.7",
            "nk": "NT",
            "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Google Chrome\";v=\"91\", \"Chromium\";v=\"91\"",
            "sec-ch-ua-mobile": "?0",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-app-ver": "4.44.0.14",
            "x-lang": "en-US",
            "x-requested-with": "XMLHttpRequest",
            "cookie": secrets.ACTIVITY_IDS_COOKIE
        },
        "referrer": constants.ACTIVITY_IDS_REFERRER,
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET",
        "mode": "cors"
    })
        .then(response => response.json())
        .then(activities => activities.map(activity => activity.activityId));
}
