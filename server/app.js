const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const logger = require('morgan');
const session = require('express-session');
const path = require('path');

require('dotenv').config();

const loginRoutes = require('./routes/loginRoutes');
const projectRoutes = require('./routes/projectRoutes');
const assignEmployeeRoutes = require('./routes/assignEmployeeRoutes');
const downloadDataRoutes = require('./routes/downloadDataRoutes');
const userRoutes = require('./routes/userRoutes');
const employeesInfoRoutes = require('./routes/employeesInfoRoutes');
const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
	session({
		secret: 'Mensaje secreto',
		resave: false,
		saveUninitialized: false,
	})
);

app.use('/login', loginRoutes);
app.use('/', projectRoutes);
app.use('/project', assignEmployeeRoutes);
app.use('/download', downloadDataRoutes);
app.use('/users', userRoutes);
app.use('/employees', employeesInfoRoutes);

module.exports = app;
