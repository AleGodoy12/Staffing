const express = require('express');
const {
	viewAllProjects,
	createProject,
	editProject,
  deleteProject,
  viewOneProject,
} = require('../controllers/projectControllers');
const validateProject = require('../middlewares/validateProject');

const route = express.Router();

route.get('/', viewAllProjects);
route.get('/:id', viewOneProject);
route.post('/createProject', validateProject, createProject);
route.patch('/editProject', editProject);
route.delete('/deleteProject/:id_project', deleteProject);

module.exports = route;
