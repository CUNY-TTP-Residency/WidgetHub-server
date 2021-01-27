const router = require('express').Router();
require('dotenv').config()

// Mounts players api calls from api file on /api/players
router.use('/covid', require('./covid'));
router.use('/news', require('./news'));
router.use('/weather', require('./weather'))

module.exports = router;