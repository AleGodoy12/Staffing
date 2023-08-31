const express = require('express');
const {
	assignEmployeeToProject,
	removeEmployeeFromProject,
} = require('../controllers/assignEmployee');
const route = express.Router();

route.post('/', assignEmployeeToProject);
route.delete('/', removeEmployeeFromProject);

module.exports = route;
