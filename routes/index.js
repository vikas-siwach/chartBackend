const router = require('express').Router();

router.use('/chart',require('../chart/chart.route'))

module.exports = router;