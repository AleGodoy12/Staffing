const express = require('express');
const {
	viewAllProjects,
	createProject,
	editProject,
	deleteProject,
} = require('../controllers/projectControllers');
const route = express.Router();

route.get('/', viewAllProjects);
route.post('/createProject', createProject);
route.patch('/editProject', editProject);
route.delete('/deleteProject', deleteProject);

module.exports = route;
