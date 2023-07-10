const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const usersModel = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userHelper = require("../helpers/userHelper");
const userController = require("../controllers/userController");
const jwtMiddleware = require("../middlewares/jwt");

//Home Page

router.get("/", (req, res) => {
  res.send("Hello World");
});

//Post Route To register
router.post("/register", userController.userRegistration);

//User Login
router.post("/login", userController.verifyUserlogIn);

//User details passing

router.post(
  "/userdetails",
  jwtMiddleware.verifyJWT,
  userController.userDetails
);


//User Image Details to DB

router.post("/imagedatatodb",userController.imageDataToDb)
module.exports = router;
