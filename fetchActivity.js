const mkdirp = require('mkdirp');
const unzipper = require('unzipper');
const fetch = require('node-fetch');
const constants = require('./constants');
const secrets = require('./secrets');

module.exports = function fetchActivity(id, outputDir) {
    return mkdirp(outputDir)
        .then(() => fetch(`${constants.ACTIVITY_URL}/${id}`, {
            "headers": {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                "accept-language": "en-GB,en;q=0.9,en-US;q=0.8,nl;q=0.7",
                "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Google Chrome\";v=\"91\", \"Chromium\";v=\"91\"",
                "sec-ch-ua-mobile": "?0",
                "sec-fetch-dest": "document",
                "sec-fetch-mode": "navigate",
                "sec-fetch-site": "same-origin",
                "sec-fetch-user": "?1",
                "upgrade-insecure-requests": "1",
                "cookie": secrets.ACTIVITY_COOKIE
            },
            "referrer": `${constants.ACTIVITY_REFERRER}/${id}`,
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": "GET",
            "mode": "cors"
        }))
        .then(response => {
            response.body.pipe(unzipper.Extract({path: outputDir}));
            return id;
        });
}
