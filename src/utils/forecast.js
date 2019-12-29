'use strict';

const request = require('request');

const forecast = (latitude, longitutde, callback) => {
  const url = 'https://api.darksky.net/forecast/80ae88c8ea65849ee185c4a1c7ddb41d/' + latitude + ',' + longitutde;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined);
    } else if (body.error) {
      callback('Unable to find location', undefined);
    } else {
      callback(undefined, body.daily.data[0].summary + ' It is currently ' +
              body.currently.temperature + ' degress out. This high today is ' +
              body.daily.data[0].temperatureHigh + '. With a low of ' +
              body.daily.data[0].temperatureLow + '. There is a ' +
              body.currently.precipProbability + '% chance of rain.');
    }
  });
};

module.exports = forecast;

