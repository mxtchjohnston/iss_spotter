const request = require('request-promise-native');

const fetchMyIP = () => request('https://api.ipify.org?format=json');

//fetchMyIP().then(body => console.log(typeof body));