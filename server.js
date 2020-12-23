const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const cors = require('cors');
const db = require('./app/models');

const routes = require('./app/routes/index');

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

db.mongoose.connect(db.url, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });


app.use('/', routes);


app.listen(process.env.PORT || 8080, () => console.log("listening on port 8080"));