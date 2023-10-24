const express = require('express');
const {
	createUser,
	deleteUser,
	getProjectManagerInfo,
	viewFreeProjectManagerEmployee,
	getUsers
} = require('../controllers/usersControllers');
const router = express.Router();

router.get('/getProjectManagerInfo/:id_user', getProjectManagerInfo);
router.post('/createUser', createUser);
router.delete('/deleteUser/:id_employee', deleteUser);
router.get('/getProjectManagersInfo', viewFreeProjectManagerEmployee);
router.get('/getUsersInfo', getUsers);

module.exports = router;
