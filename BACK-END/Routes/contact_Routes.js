const { Router } = require('express');
const router = Router();
const { Insert, GetData } = require('../controllers/contact_cotroler');

// Contact Routes
router.post("/contact-us", Insert);
router.get("/contact-us", GetData);

module.exports = router;
