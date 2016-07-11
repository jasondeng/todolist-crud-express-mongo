const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();

app.use(bodyParser.urlencoded({ extended:true }));

var config = require('./env.json');

MongoClient.connect(config.MONGO_URI, (err, db) => {
    if(err) return console.log(err);

    app.listen(3000, () => {
        console.log('Server listening on port 3000');
    })
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.post('/quotes', (req, res) => {
    console.log(req.body);
})
