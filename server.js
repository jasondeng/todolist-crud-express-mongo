const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();

app.use(bodyParser.urlencoded({ extended:true }));

var config = require('./env.json');

var db;
MongoClient.connect(config.MONGO_URI, (err, database) => {
    if(err) return console.log(err);
    db = database;
    app.listen(3000, () => {
        console.log('Server listening on port 3000');
    })
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
    db.collection('quotes')
        .find()
        .toArray(function (err, results) {
            console.log(results);
    });
});

app.post('/quotes', (req, res) => {
    db.collection('quotes')
        .save(req.body, (err,results) => {
            if(err) return console.log(err);

            console.log('Saved to database');
            res.redirect('/');
    })
});
