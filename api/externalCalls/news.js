const express = require('express')
const router = express.Router()
const axios =  require('axios')

router.get('/', (req, res, next) => {
    axios.get(`http://api.mediastack.com/v1/news?countries=us&limit=5&access_key=${process.env.NEWS}`)
    .then(news => {
        res.status(200).send(news.data)
    })
    .catch(error => {
        res.status(400).send(error)
    })
})

module.exports = router