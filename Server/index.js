const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connect = require("./Config/db");
const router = require('./Route/userRoutes');
const Ressourcerouter = require('./Route/RessourceRoute');
const app = express();

//connect to database
connect();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if ('OPTIONS' == req.method) {
       res.sendStatus(200);
     }
     else {
       next();
     }});

app.use(bodyParser.json());
app.use('/',router);
app.use('/',Ressourcerouter);

const PORT = 5000;
const localhost = 'localhost';
app.listen(PORT, localhost,() =>{
    console.log(`Server is Running on ${PORT}`);
})