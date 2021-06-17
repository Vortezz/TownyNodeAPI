/////////////////////////////////////////////
/*                                         */
/*    This Code was created by Vortezz     */
/*  You can use it for commercial use BUT  */
/*      you can't sell it at yout own      */
/*    /!\ I'm not affiliated with Towny    */
/*                                         */
/////////////////////////////////////////////

//Express server creation
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Config importation
const config = require('./config.json');
const dbconfig = require('./utils/dbconfig.js');

//MYSQL Configuration
const mysql = require('mysql2');
var connection = mysql.createConnection(dbconfig);
connection.connect();

//Import requests module
const { resident, residents } = require('./classes/resident');
const { town, towns } = require('./classes/town');
const { nation, nations } = require('./classes/nation');

//Utils
require(`colors`)
var min = 0;

//Routing
app.get('/api' || '', (req, res) => {
    res.send(config.welcomePhrase);
});

app.get(`/${config.baseURL}/${config.residentURL}/one/:name`, function (req, res) {
    resident(req.params.name).then(data => {
        res.json(data.responseJSON)
        res.status(data.responseCode)
        if (config.logConnections) console.log(data.responseJSON.error ? `[${req.url.red}] No resident found for name ${req.params.name.yellow} requested !` : `[${req.url.green}] ${req.params.name.yellow} requested !`)
    }).catch(error => { return console.log(`[${`ERROR`.red}] ` + error) })
});

app.get(`/${config.baseURL}/${config.townURL}/one/:name`, function (req, res) {
    town(req.params.name).then(data => {
        res.json(data.responseJSON)
        res.status(data.responseCode)
        if (config.logConnections) console.log(data.responseJSON.error ? `[${req.url.red}] No town found for name ${req.params.name.yellow} requested !` : `[${req.url.green}] ${req.params.name.yellow} requested !`)
    }).catch(error => { return console.log(`[${`ERROR`.red}] ` + error) })
});

app.get(`/${config.baseURL}/${config.nationURL}/one/:name`, function (req, res) {
    nation(req.params.name).then(data => {
        res.json(data.responseJSON)
        res.status(data.responseCode)
        if (config.logConnections) console.log(data.responseJSON.error ? `[${req.url.red}] No nation found for name ${req.params.name.yellow} requested !` : `[${req.url.green}] ${req.params.name.yellow} requested !`)
    }).catch(error => { return console.log(`[${`ERROR`.red}] ` + error) })
});

app.get(`/${config.baseURL}/${config.residentURL}/all/:order`, function (req, res) {
    if (req.query.min) min = req.query.min;
    residents(req.params.order, min).then(data => {
        res.json(data.responseJSON)
        res.status(data.responseCode)
        if (config.logConnections) console.log(data.responseJSON.error ? `[${req.url.red}] Error : ${data.responseJSON.error} !` : `[${req.url.green}] Residents data requested !`)
    }).catch(error => { return console.log(`[${`ERROR`.red}] ` + error) })
});

app.get(`/${config.baseURL}/${config.townURL}/all/:order`, function (req, res) {
    if (req.query.min) min = req.query.min;
    towns(req.params.order, min).then(data => {
        res.json(data.responseJSON)
        res.status(data.responseCode)
        if (config.logConnections) console.log(data.responseJSON.error ? `[${req.url.red}] Error : ${data.responseJSON.error} !` : `[${req.url.green}] Towns data requested !`)
    }).catch(error => { return console.log(`[${`ERROR`.red}] ` + error) })
});

app.get(`/${config.baseURL}/${config.nationURL}/all/:order`, function (req, res) {
    if (req.query.min) min = req.query.min;
    nations(req.params.order, min).then(data => {
        res.json(data.responseJSON)
        res.status(data.responseCode)
        if (config.logConnections) console.log(data.responseJSON.error ? `[${req.url.red}] Error : ${data.responseJSON.error} !` : `[${req.url.green}] Nations data requested !`)
    }).catch(error => { return console.log(`[${`ERROR`.red}] ` + error) })
});

app.listen(config.port, () => console.log(`[${`START`.yellow}] Server started on ${config.port} !`))