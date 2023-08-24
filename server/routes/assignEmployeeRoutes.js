const express = require('express');
const {
	showSelectedProject,
	assignEmployee,
} = require('../controllers/assignEmployee');
const route = express.Router();

route.get('/', showSelectedProject);
route.post('/', assignEmployee);

module.exports = route;
