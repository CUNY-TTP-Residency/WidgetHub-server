const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', (req, res, next) => {
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=brooklyn&units=imperial&appid=${process.env.WEATHER}`)
    .then(weather => {
        res.status(200).json(weather.data.main)
    })
    .catch(err => {
        res.status(400).send(err.message)
    })
})

module.exports = router