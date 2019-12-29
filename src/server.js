'use strict'

const express = require('express');

const app = express();

app.use((req, res, next) => {
  console.log(req);
  next();
});

app.get('/', (req, res, next) => {
  res.send('Welcome home');
});

app.get('/home', (req, res, next) => {
  res.send('Home page');
})

app.listen(3000);
