const express = require('express');
const app = express();
const router = require('./routes.js')


app.use(express.json());
app.use(express.static('client/dist'));

app.use('/', router);

app.listen(3000);