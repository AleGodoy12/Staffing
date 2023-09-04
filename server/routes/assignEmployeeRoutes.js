const express = require('express');
const {
	assignEmployeeToProject,
	removeEmployeeFromProject,
	viewEmployeesFromSelectedProject,
} = require('../controllers/assignEmployee');
const route = express.Router();

route.get('/showEmployees', viewEmployeesFromSelectedProject);
route.post('/', assignEmployeeToProject);
route.delete('/', removeEmployeeFromProject);

module.exports = route;
