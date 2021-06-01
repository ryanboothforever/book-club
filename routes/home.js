const express = require('express');
// Use the express.Router class to create modular, mountable route handlers. A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a “mini-app”.
const router = express.Router();
const homeController = require('../controllers/home');
const authController = require('../controllers/auth');
const entriesController = require('../controllers/posts');
const { ensureAuth, ensureGuest } = require('../middleware/auth');

router.get('/', homeController.getIndex);
router.get('/signup', authController.getSignup);
router.post('/signup', authController.postSignup);
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.get('/logout', authController.logout);
router.get('/profile', ensureAuth, entriesController.getProfile);
router.get('/feed', ensureAuth, entriesController.getFeed);
router.get('/entry', entriesController.getEntry);

module.exports = router;
