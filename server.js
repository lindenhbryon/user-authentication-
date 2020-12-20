const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const cors = require('cors');
const db = require('./app/models');
const userModel = require('./app/models/user');
//Set up default mongoose connection
const bcrypt = require('bcrypt');
const saltRounds = 10;
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


app.post('/api/create-user',  (req, res) => {
  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(req.body.password, salt, (err, hash) => {
        const query = userModel.where({
          username: req.body.username
        });
        try {
          query.findOne(async (err, user) => {
            if (err) return handleError(err);
            if (user) {
              res.send({
                success: false,
                message: 'Username is already in use'
              });
            }else {
              const user = new userModel({
                username: req.body.username,
                password: hash
              });
              try {
                await user.save();
                res.send({
                  success: true,
                  message: 'User created successfully.'
                });
              } catch (err) {
                res.send({
                  success: false,
                  message: 'Something went wrong whilst creating the user, please try again.'
                });
              }
            }
          });
        } catch (err) {
          res.send({
            success: false,
            message: 'Something went wrong whilst creating the user, please try again.'
          });
        }
    });
  });
});
app.get('/api/home', (req, res) => {
  res.send({home: 1});
});
app.get('/api/secret', (req, res) => {
  res.send('The password is potato');
});

app.listen(process.env.PORT || 8080, () => console.log("listening on port 8080"));