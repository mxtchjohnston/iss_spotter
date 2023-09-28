const request = require('request');

const fetchMyIP = function(callback) {
  const endpoint = "https://api.ipify.org";

  request(endpoint, (error, resp, body) => {
    if (resp.statusCode !== 200) {
      callback(Error(resp.statusCode));
      return;
    }
    callback(error, body);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  const fields = 'fields=latitude,longitude';
  const endpoint = `https://ipwho.is/${ip}?${fields}`;

  request(endpoint, (error, resp, body) => {
    if (error) callback(error);
    if (resp.statusCode !== 200) callback(Error(`Status code: ${resp.statusCode}`));
    callback(null, body);
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP };