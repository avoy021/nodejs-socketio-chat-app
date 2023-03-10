const express = require('express');
const passport = require('passport');
const router = express.Router();

// authentication with google strategy
// route GET /auth/google
router.get('/google', passport.authenticate('google', { scope : ['profile']}));

// google auth callback
// route GET /auth/google/callback
router.get('/google/callback', passport.authenticate('google', {failureRedirect:
    '/'}), (req, res) => {
        res.redirect('/dashboard');
    });

module.exports = router;
