const express = require('express');
const router = express.Router();

// Login/LandingPage
// @route GET/

router.get('/', (req, res) => {
    res.render('login');
});

router.get('/dashboard', (req, res) => {
    res.render('dashboard');
});

module.exports = router;
