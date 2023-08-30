const express = require('express');
const { showSelectedProject } = require('../controllers/assignEmployee');
const route = express.Router();

route.post('/', showSelectedProject);

module.exports = route;
