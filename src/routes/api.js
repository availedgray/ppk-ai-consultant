const express = require('express');
const router = express.Router();
const consultantController = require('../controllers/consultantController');
const rateLimiter = require('../middleware/rateLimiter');

router.post('/pet-consultant', 
    rateLimiter,
    (req, res) => consultantController.generateConsultation(req, res)
);

module.exports = router;