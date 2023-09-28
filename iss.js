const request = require('request');
const endpoint = "https://api.ipify.org";

const fetchMyIP = function(callback) {
  request(endpoint, (error, resp, body) => {
    if (resp.statusCode !== 200) {
      callback(Error(resp.statusCode));
      return;
    }
    callback(error, body)
  });
};

module.exports = { fetchMyIP };