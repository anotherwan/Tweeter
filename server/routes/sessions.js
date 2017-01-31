"use strict";

const userHelper      = require("../lib/util/user-helper")

const express         = require('express')
const sessionRoutes   = express.Router()
const cookieSession   = require('cookie-session')
const bcrypt          = require('bcrypt')

module.exports = function(DataHelpers) {

  sessionRoutes.post('/login', (req, res) => {
    DataHelpers.findUser(req.body.email, (err, users) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      } else if(users.length === 0) {
        return res.status(403).json({ error: 'Invalid email or password'});
      }

      const foundUser = users[0];
      // check if the passwords mismatch, if so, return an error message
      // TODO: add bcrypt for password checking
      if (req.body.password !== users[0].password) {
        return res.status(403).json({ error: 'Invalid email or password'});
      }

      req.session.email = foundUser.email;
      res.status(200).json({ email: foundUser.email });
    })
  })

  sessionRoutes.get('/logout', (req, res) => {
    req.session = null
    res.status(200).send('OK')
  })

  return sessionRoutes
}
;
