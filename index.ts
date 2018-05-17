
var bodyParser = require('body-parser');

import { connectionToDb } from './database/databaseConnection';
connectionToDb();

import { user } from './route/user/userRoute'
import { auth } from './route/auth/auth'

let express = require('express');
let path = require('path');
let request = require('request');


let app = express();

app.locals.webUrl = 'https://webconference.herokuapp.com';
//app.locals.webUrl =  'http://localhost:3000';

app.use(express.static(__dirname + '/web-app/public'));
app.use('/api', user);
app.use('/auth', auth);

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '/web-app/public/index.html'));
    
})



import { Response, Express, Request } from 'express'
import { Executor } from './web-app/node_modules/@types/selenium-webdriver/http';


app.listen(process.env.PORT || 3000, () => {
    console.log('server start');
})

process.on('uncaughtException', function (ex) {
    console.log('error', ex)
})