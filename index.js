const { nextISSTimesForMyLocation } = require('./iss');

const printTimes = function(times) {
  for (const time of times) {
    const date = new Date(0);
    date.setUTCSeconds(time.risetime);
    console.log(`Next pass at ${date} for ${time.duration} seconds`);
  }
};

nextISSTimesForMyLocation((error, times) => {
  if (error) {
    return console.log(error);
  }

  printTimes(times);
});