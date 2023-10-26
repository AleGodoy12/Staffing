const express = require('express');
const route = express.Router();
const {
	employeesWithoutAssignation,
	employeesWithAssignation,
} = require('../controllers/employeesInfo');

route.get('/noAssigned', employeesWithoutAssignation);
route.get('/assigned', employeesWithAssignation);

module.exports = route;
