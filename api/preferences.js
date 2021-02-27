const express = require('express');
const router = express.Router();
const { Preferences } = require('../db/models');

router.put('/:id', (req, res, next) => {
    Preferences.findByPk(req.params.id)
    .then(preferences => {
        preferences.update({
            clock: req.body.clock,
            toDoList: req.body.toDoList,
            weather: req.body.weather,
            news: req.body.news,
            covid: req.body.covid,
        })
        preferences.save();
        res.status(200).send(preferences)
    })
    .catch(err => {
        res.status(500).json({
            message: "error",err
        })
    })
})

module.exports = router