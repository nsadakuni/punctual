const express = require('express');
const app = express();
const router = require('./routes.js')
const gApi = require('../googleApi.js')
require('dotenv').config()

app.use(express.json());
app.use(express.static('client/dist'));

app.use('/', router);

app.get('/googleapi', gApi.authNew)

app.listen(process.env.PORT);
console.log('Listening on port:', process.env.PORT)