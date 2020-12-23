const routes = require('express').Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const userModel = require('../models/user');
const crypto = require("crypto");
routes.post('/api/create-user',  (req, res) => {
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
  routes.post('/api/login', (req, res) => {
    const query = userModel.where({
      username: req.body.username
    });
    try {
      query.findOne((err, user) => {
        if (err) return handleError(err);
        if (user) {
          const hash = user.password;
          bcrypt.compare(req.body.password, hash, function(err, result) {
            if(result){
            var id = crypto.randomBytes(20).toString('hex');
              res.send({
                success: true,
                message: 'Login successful!',
                token: id
              });
            }else {
              res.send({
                success: false,
                message: 'The password entered does not match this account.'
              });
            }
        });
        }else {
          res.send({
            success: false,
            message: 'Username does not exists'
          });
        }
      });
    } catch(err){
      res.send({
        success: false,
        message: 'Something went wrong whilst loggin in, please try again.'
      });
    }
  });


module.exports = routes;