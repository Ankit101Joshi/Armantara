var express = require("express");
var router = express.Router();
const {check, validationResult} = require('express-validator')
const { signout, signup, signin, isSignedIn } = require("../controllers/auth");

const passwordValidations = [
    check("password", "Password should be at least 7 characters").isLength({ min: 7 }),
    check("password", "Password should contain at least one uppercase letter").matches(/^(?=.*[A-Z])/),
    check("password", "Password should contain at least one lowercase letter").matches(/^(?=.*[a-z])/),
    check("password", "Password should contain at least one number").matches(/^(?=.*\d)/),
    check("password", "Password should contain at least one special character").matches(/^(?=.*[!@#$%^&*])/)
  ];

router.post("/signup",[
    check("name","name should be at least 3 char").isLength({ min: 5 }),
    check("email","email is required").isEmail(),
    ...passwordValidations,
], signup);

router.post("/signin", [
    check("email", "Email is required").isEmail(),
    ...passwordValidations
  ], signin);

router.get("/signout", signout)


module.exports = router;
