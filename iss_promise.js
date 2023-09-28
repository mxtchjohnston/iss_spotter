const request = require('request-promise-native');

const fetchMyIP = () => request('https://api.ipify.org?format=json');

const fetchMyCoords = (body) => {
  const ip = JSON.parse(body).ip;
  const fields = 'fields=latitude,longitude';
  const endpoint = `https://ipwho.is/${ip}?${fields}`;

  return request(endpoint);
};

const fetchFlyoverTimes = (body) => {
  const coords = JSON.parse(body);
  const endpoint = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;

  return request(endpoint);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchMyCoords)
    .then(fetchFlyoverTimes)
    .then(data => {
      return JSON.parse(data).response;
    });
};

module.exports = nextISSTimesForMyLocation;