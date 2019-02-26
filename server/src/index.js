'use strict';

const express = require('express');
const path = require('path');
const mongodb = require('mongodb');
const dbConfig = require('./config/db');
const twoFactorAuthConfig = require("./config/2fa.json");
const jwtAuthenticator = require('./helpers/jwtAuthenticator');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cookie, authorization");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Constants
const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';

const CLIENT_BUILD_PATH = path.join(__dirname, '../../client/build');


// Static files
app.use(express.static(CLIENT_BUILD_PATH));

const client = mongodb.MongoClient;

client.connect(dbConfig.DB, function(err, db) {
    if(err) {
        console.log('database is not connected',err)
    }
    else {
        console.log('connected!!')
    }
});
const redisClient = require('./redis-client');
//routes
const authRouter = require('./routes/auth');
app.use('/auth', authRouter);


app.get('/store/:key', async (req, res) => {
  const { key } = req.params;
  const value = req.query;
  await redisClient.setAsync(key, JSON.stringify(value));
  return res.send('Success');
});

app.get('/getKey/:key', async (req, res) => {
  const { key } = req.params;
  const rawData = await redisClient.getAsync(key);
  return res.json(JSON.parse(rawData));
});


// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.join(CLIENT_BUILD_PATH, 'index.html'));
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
