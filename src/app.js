'use strict';

const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

//Define paths for Express confing
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (reg, res) => {
  res.render('index', {
    title: 'Weather app',
    name: 'Arthur Ryzhyy'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Arthur Ryzhhy'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    helpMessage: 'This is a help message',
    title: 'Help',
    name: 'Arthur Ryzhyy'
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address'
    });
  }

  geocode(req.query.address, (error,  { longitude, latitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        location,
        address: req.query.address,
        forecast: forecastData
      });
      //console.log(location);
      //console.log('Data', forecastData);
    });
  });
});

app.get('/help/*', (req, res) => {
  res.render('404page', {
    title: 'Help',
    name: 'Arthur Ryzhyy',
    message: 'Help article not found'
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide search term'
    });
  }
  console.log(req.query.search);
  res.send({
    products: []
  });
});

app.get('*', (req, res) => {
  res.render('404page', {
    title: 'Help',
    name: 'Arthur Ryzhyy',
    message: 'Page not found'
  });
});

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});



