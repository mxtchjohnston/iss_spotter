const { fetchMyIP, fetchCoordsByIP } = require('./iss');

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
  });
});