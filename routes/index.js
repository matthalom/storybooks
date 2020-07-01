const express = require('express');
const router = express.Router();

// Login/LandingPage
// @route GET/

router.get('/', (req, res) => {
    res.render('login', {
        layout: 'login'
    });
});

router.get('/dashboard', (req, res) => {
    res.render('dashboard', {
        layout: 'main'
    });
});

module.exports = router;
