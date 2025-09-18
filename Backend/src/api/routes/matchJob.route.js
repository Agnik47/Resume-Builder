const express = require('express');
const userAuth = require('../../middleware/auth.middleware');
const { matchJob } = require('../../controller/matchJob.controller');
const router = express.Router();


router.post('/match', userAuth,matchJob);

module.exports = router;