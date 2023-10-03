const express = require('express');
const {
	createUser,
	deleteUser,
	getProjectManagerInfo,
} = require('../controllers/usersControllers');
const router = express.Router();

router.get('/getProjectManagerInfo/:id_user', getProjectManagerInfo);
router.post('/createUser', createUser);
router.delete('/deleteUser/:@id_employee', deleteUser);

module.exports = router;
