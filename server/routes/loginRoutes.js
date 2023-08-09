const express = require('express');
const route = express.Router();
const { showLogin, loginUser } = require('../controllers/loginControllers');
const validateLogin = require('../middlewares/validateLogin');

route.get('/', showLogin);
route.post('/', validateLogin, loginUser);

module.exports = route;
