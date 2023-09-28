const nextISSTimesForMyLocation = require('./iss_promise');

const printTimes = function(times) {
  for (const time of times) {
    const date = new Date(0);
    date.setUTCSeconds(time.risetime);
    console.log(`Next pass at ${date} for ${time.duration} seconds`);
  }
};

nextISSTimesForMyLocation()
  .then(data => printTimes(data))
  .catch(err => console.log(err.message));




