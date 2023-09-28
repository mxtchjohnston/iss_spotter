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

const fetchISSFlyOverTimes = function(coords, callback) {
  const endpoint = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;

  request(endpoint, (error, resp, body) => {
    if (error) callback(error);
    if (resp.statusCode !== 200) callback(Error(`Status code: ${resp.statusCode}`));
    callback(null, JSON.parse(body).response);
  });
};

const nextISSTimesForMyLocation  = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      console.log("It didn't work!" , error);
      return;
    }
  
    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        console.log(error);
        return;
      }
  
      const obj = JSON.parse(coords);
      console.log(obj);
      fetchISSFlyOverTimes(obj, (error, times) => {
        if (error) {
          console.log(error);
          return;
        }
        callback(null, times);
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };