const express = require('express');
const {
	assignEmployeeToProject,
	removeEmployeeFromProject,
	viewEmployeesFromSelectedProject,
	viewFreeEmployes,
} = require('../controllers/assignEmployee');
const route = express.Router();

route.get('/showEmployees', viewEmployeesFromSelectedProject);
route.get('/viewFreeEmployes', viewFreeEmployes);
route.post('/', assignEmployeeToProject);
route.delete('/', removeEmployeeFromProject);

module.exports = route;
