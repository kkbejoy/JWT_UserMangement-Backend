const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const adminController = require("../controllers/adminController");

//Admin Login Verification
router.post("/login", adminController.verifyAdmin);

//Fetching user Details to admin Dashboard
router.get("/userslist", adminController.fetchUserDetails);

//Delete User

router.delete("/deleteuser", adminController.deleteUser);

//Edit user
router.put("/edituser", adminController.editUser);

module.exports = router;
