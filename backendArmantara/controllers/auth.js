const User = require("../models/user");
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { expressjwt } = require('express-jwt');

exports.signup = async (req, res) => {
 const errors = validationResult(req)

 if(!errors.isEmpty()){
    return res.status(422).json({
        error: errors.array()[0].msg
    })
 }
 
    try {
    const user = new User(req.body);
    await user.save();
    res.json({
       name: user.name,
       email: user.email,
       id: user._id
    });
  } catch (err) {
    res.status(400).json({
      error: "Unable to signup",
      details: err.message,
    });
  }
};




exports.signin = async (req, res) => {
  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        error: errors.array()[0].msg
      });
    }

    const { email, password } = req.body;

    // Check if the user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        error: "User email does not exist"
      });
    }

    // Verify the password
    const isPasswordValid = await user.authenticate(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        error: "Email and password do not match"
      });
    }

    // Create token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);

    // Put token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 });

    // Send response to front-end
    const { _id, name, role } = user;
    return res.json({
      token,
      user: { _id, name, role, email }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal server error"
    });
  }
};


exports.signout = (req, res) => {
    res.clearCookie("token")
    res.json({
        message: "User Signed Out Successfully"
    })
};

//Protected Routes
exports.isSignedIn = expressjwt({
    secret: process.env.SECRET,
    userProperty: "auth",
    algorithms: ["HS256"] // Specify the algorithms used for JWT verification
  });

//custome Middlewares
exports.isAuthenticated = (req, res, next) => {
  const checker = req.profile && req.auth && req.profile._id  == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED"
    });
  }
  next();
};


exports.isAdmin = (req, res, next) => {
    if(req.profile.role === 0){
        return res.status(403).json({
            error: "Admin Access"
        })
    }
    next();
}