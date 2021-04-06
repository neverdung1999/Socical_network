const express = require('express');
const router = express.Router();
const verifyToken = require('../config/verifyToken');

const userController = require('../app/controllers/UserController');

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/verifyToken", verifyToken, userController.verifyToken);
router.post("/appenAddfr", userController.appenAddfr);
router.get("/listAllFriend", userController.listAllFriend);

module.exports = router;