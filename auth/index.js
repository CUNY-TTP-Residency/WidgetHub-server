const express = require('express')
const router = express.Router()
const { User } = require('../db/models');

router.post('/login', (req, res, next) => {
    User.findOne({
        where: 
        {
            email: req.body.email
        }
    })
    .then(user => {
        if(!user) {
            res.status('401')
            .send('Wrong Username/password')
        }
        else if(!user.correctPassword(req.body.password)) {
                res.status('401')
                .send('Wrong Username/password')
            }
        else {
            req.login(user, err => {
                return err ?
                next(err) :
                res.json(user)
            })
        }
    })
    .catch(err => next(err))
})

router.post('/signup', (req, res, next) => {
    User.create({
        firstName: req.body.firstName,
        email: req.body.email,
        password: req.body.password
    })
    .then(user => {
        return req.login(user, err => (err ? next(err) :res.json(user)))
    })
    .catch(err => {
        if (err.name === 'SequelizeUniqueConstraintError') {
            res.status(401).send("Email is already in use")
        }
    })
})

router.get("/me", (req, res) => {
    res.json(req.user);
  });

module.exports = router