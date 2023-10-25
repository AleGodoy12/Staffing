const express = require('express');
const {
	assignEmployeeToProject,
	removeEmployeeFromProject,
  viewEmployeesFromSelectedProject,
  viewLeaderFromSelectedProject,
	viewFreeEmployees,
	viewEmployeesInfo,
} = require('../controllers/assignEmployee');
const route = express.Router();

route.get('/showEmployees/:id_project', viewEmployeesFromSelectedProject);
route.get('/viewEmployeesInfo', viewEmployeesInfo);
route.get('/viewFreeEmployees/:selected_project', viewFreeEmployees);
route.get('/viewLeaderProject/:selected_project', viewLeaderFromSelectedProject);
route.post(
	'/:project_id/:employee_id/:hours_to_assign',
	assignEmployeeToProject
);
route.delete('/:project_id/:employee_id', removeEmployeeFromProject);

module.exports = route;
