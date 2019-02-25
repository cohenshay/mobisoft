'use strict';

const express = require('express');
const path = require('path');
const mongodb = require('mongodb');
const dbConfig = require('./config/db');
const twoFactorAuthConfig = require("./config/2fa.json");
const jwtAuthenticator = require('./helpers/jwtAuthenticator');
const cookieParser = require('cookie-parser');
const Nexmo = require('nexmo');
const nexmo = new Nexmo({
  apiKey: twoFactorAuthConfig.apiKey,
  apiSecret: twoFactorAuthConfig.apiSecret
});
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
app.post('/register',jwtAuthenticator, (req, res) => {
  // A user registers with a mobile phone number
  let phoneNumber = req.body.number;
  console.log(phoneNumber);
  nexmo.verify.request({number: phoneNumber, brand: 'NexmoVerifyTest'}, (err, 
  result) => {
    if(err) {
      res.sendStatus(500);
    } else {
      let requestId = result.request_id;
      if(result.status == '0') {
        res.render('verify', {requestId: requestId}); // Success! Now, have your user enter the PIN
      } else {
        res.status(401).send(result.error_text);
      }
    }
  });
});
app.post('/verify', (req, res) => {
  let pin = req.body.pin;
  let requestId = req.body.requestId;
 
  nexmo.verify.check({request_id: requestId, code: pin}, (err, result) => {
    if(err) {
      // handle the error
    } else {
      if(result && result.status == '0') { // Success!
        res.status(200).send('Account verified!');
        res.render('status', {message: 'Account verified! 🎉'});
      } else {
        // handle the error - e.g. wrong PIN
      }
    }
  });
});
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
