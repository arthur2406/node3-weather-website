'use strict';

const request = require('request');

const geocode = (address, callback) => {

  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYXJ0aHVyMjQwNiIsImEiOiJjazQ2OHkwdHUwZWRwM2VsOTRpeWVlZ21nIn0.P7bT5AgtirpRB5kQiVKj6A&limit=1&language=en';
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to location services', undefined);
    } else if (body.features.length === 0) {
      callback('Unable to find location. Try another search.', undefined);
    } else {
      const longitude = body.features[0].center[0];
      const latitude = body.features[0].center[1];
      const location = body.features[0].place_name;
      callback(undefined, { longitude, latitude, location });
    }
  });
};

module.exports = geocode;
