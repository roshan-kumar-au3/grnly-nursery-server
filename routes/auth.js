const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { createUserSessionHandler, getUserSessionsHandler, invalidateUserSessionHandler } = require('../controller/session.controller');
const { createUserHandler } = require('../controller/auth.controller');
const { requiresUser } = require('../utils/jwt');

// register user
router.post('/register',
	body('email').isEmail(),
	body('password').isLength({ min: 6 }), createUserHandler);

// login user
router.post('/login', body('email').isEmail(),
	body('password').isLength({ min: 6 }), createUserSessionHandler);

// Get the user's sessions
router.get("/sessions", requiresUser, getUserSessionsHandler);

// Logout
router.delete("/sessions", requiresUser, invalidateUserSessionHandler);

module.exports = router;
