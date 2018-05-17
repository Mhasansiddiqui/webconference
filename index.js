"use strict";
exports.__esModule = true;
var bodyParser = require('body-parser');
var databaseConnection_1 = require("./database/databaseConnection");
databaseConnection_1.connectionToDb();
var userRoute_1 = require("./route/user/userRoute");
var auth_1 = require("./route/auth/auth");
var express = require('express');
var path = require('path');
var request = require('request');
var app = express();
app.locals.webUrl = 'https://webconference.herokuapp.com';
//app.locals.webUrl =  'http://localhost:3000';
app.use(express.static(__dirname + '/web-app/public'));
app.use('/api', userRoute_1.user);
app.use('/auth', auth_1.auth);
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '/web-app/public/index.html'));
});
app.listen(process.env.PORT || 3000, function () {
    console.log('server start');
});
process.on('uncaughtException', function (ex) {
    console.log('error', ex);
});
