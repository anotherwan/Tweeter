"use strict";

const userHelper      = require("../lib/util/user-helper")

const express         = require('express')
const sessionRoutes   = express.Router()
const cookieSession   = require('cookie-session')
const bcrypt          = require('bcrypt')

module.exports = function(DataHelpers) {

  sessionRoutes.post('/login', (req, res) => {
    DataHelpers.findUser(req.body.email, (err, user) => {
      if (user.length === 0) {
        res.status(403).json({ error: 'Invalid email or password'});
      } else if (err) {
        res.status(500).json({ error: err.message });
      } else {
        let foundUser = user[0];
        if (req.body.password !== user[0].password) {
          res.status(403).json({ error: 'Invalid email or password'});
        }
        else {
          req.session.email = foundUser.email;
          res.status(200).json({email: foundUser.email });
        }
      }
    })
  })

  sessionRoutes.get('/logout', (req, res) => {
    req.session = null
    res.status(200).send('OK')
  })

  return sessionRoutes
}
;
