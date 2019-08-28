const MongoClient = require('mongodb').MongoClient;
const express = require('express')
const app = express()
const port = process.env.PORT || 8000;
app.set('view engine', 'pug');
let server = require('http').Server(app);
const mongo_uri = 'mongodb://localhost:27017/';
app.use("/", (req, res) => {
  MongoClient.connect(mongo_uri, { useNewUrlParser: true })
  .then(client => {
    const db = client.db('Apparelshop');
    const collection = db.collection('apparel');
    //collection.find({}).toArray().then(response => res.status(200).json(response)).catch(error => console.error(error));
  	collection.find({}).toArray()
    .then((view) => {
      res.render('index', { view });
    }).catch(() => {res.send('Sorry! Something went wrong.'); });
  });
});
server.listen(port, () => {
    console.log("App is running on port " + port);
});