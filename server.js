const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

app.get('/api/home', function(req, res) {
  res.send('Welcome!');
});
app.get('/api/secret', function(req, res) {
  res.send('The password is potato');
});

app.listen(process.env.PORT || 8080);