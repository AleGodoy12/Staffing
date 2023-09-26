const express = require('express');
const {
	downloadQueries,
	downloadProjects,
} = require('../controllers/downloadData');
const route = express.Router();

route.post('/download', downloadQueries);
route.get('/downloadProject/:project_id', downloadProjects);

module.exports = route;
