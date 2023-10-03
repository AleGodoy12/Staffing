const express = require('express');
const { createUser, deleteUser } = require('../controllers/usersControllers');
const router = express.Router();

router.post('/createUser', createUser);
router.delete('/deleteUser/:id_user', deleteUser);

module.exports = router;
