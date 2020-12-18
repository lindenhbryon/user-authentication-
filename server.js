const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const mongoose = require('mongoose');
//Set up default mongoose connection
var mongoDB = 'mongodb+srv://linden:!shoulderpress123@cluster0.xzo1a.mongodb.net/user_authentication?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
var db = mongoose.connection;
console.log("db", db);

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.use(express.static(path.join(__dirname, 'build')));

app.get('/api/home', function(req, res) {
  res.send({home: 1});
});
app.get('/api/secret', function(req, res) {
  res.send('The password is potato');
});

app.listen(process.env.PORT || 8080, () => console.log("listening on port 8080"));