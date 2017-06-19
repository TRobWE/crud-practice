const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set('view engine', 'ejs')


//app.listen(PORT, () => {
//	console.log(`Listening on port: ${PORT}`);
//})

//app.get('/', (req, res) => {
//	res.sendFile(`${__dirname}/index.html`);
//})

var db;

MongoClient.connect('mongodb://trobwe:crud@ds131312.mlab.com:31312/crud-practice', (err, database) => {
  if (err)
    return console.log(err);
  console.log('DB is connected');
  db = database;
  app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
  })
})

app.post('/translate', (req, res) => {
  db.collection('translate').save(req.body, (err, result) => {
    if (err) {
      return console.log(err);
    }

    console.log('saved to database', req.body);
    res.redirect('/')
  })
})

app.get('/', (req, res) => {
  // res.sendFile(path.join(__dirname, 'index.html'));
  var cursor = db.collection('translate').find()
  // console.log(cursor);
  cursor.toArray(function(err, results) {
    if (err) {
      return console.log(err);
    }
    console.log(results);
  // send HTML file populated with quotes here
    res.render('index.ejs', {translate: results});
  })
})






console.log('Cooking with grease!');
