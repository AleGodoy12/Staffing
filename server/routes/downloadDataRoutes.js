const express = require('express');
const {
	downloadQueries,
	downloadProjects,
	downloadSelectedInfo,
} = require('../controllers/downloadData');
const route = express.Router();

route.post('/download', downloadQueries);
route.get('/downloadProject/:project_id', downloadProjects);
route.get('/downloadSelectedInfo/:selectedQuery', downloadSelectedInfo);

module.exports = route;
