const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser')
const routes = require('./api/routes');
const config = require('./config');
const app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const router = routes();
app.use(config.BASE_API_PATH, router);


module.exports = app;
