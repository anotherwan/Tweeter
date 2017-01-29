"use strict";

const userHelper      = require("../lib/util/user-helper")

const express         = require('express')
const sessionRoutes   = express.Router()
const cookieSession   = require('cookie-session')
const bcrypt          = require('bcrypt')

module.exports = function(DataHelpers) {

  sessionRoutes.post('/login', (req, res) => {
    let foundUser = null
    let user = DataHelpers.findUser(req.body.email, (err, user) => {
        if (err) {
          res.status(500).json({ error: err.message });
        } else if (user) {
            foundUser = user[0]._id
    // else if (!foundUser || !bcrypt.compareSync(req.body.password, user.password))
        } else if (!foundUser || req.body.password !== user[0].password) {
            res.status(403).json({ error: 'Invalid email or password'})
        } else {
            req.session = user[0].email
            // res.redirect('/tweets')
        }
          return foundUser
    })
  })
  return sessionRoutes
}
