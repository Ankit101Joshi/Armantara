const User = require("../models/user");

exports.getUserById = async (req, res, next, id) => {
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(400).json({
          error: "No user was found in the database",
        });
      }
      console.log(user)
      req.profile = user;
      next();
    } catch (err) {
      return res.status(500).json({
        error: "Internal server error",
      });
    }
  };
  
//salt and encrypted password are set undefiened for currect logged in user
exports.getUser = (req, res) => {
req.profile.salt = undefined;
req.profile.encry_password = undefined;
    return res.json(req.profile);
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      { _id: req.profile._id },
      { $set: req.body },
      { new: true, useFindAndModify: false }
    );

    if (!user) {
      return res.status(400).json({
        error: "You are not authorized to update this user profile",
      });
    }

    user.salt = undefined;
    user.encry_password = undefined;

    return res.json(user);
  } catch (err) {
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};


// exports.getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find().exec();
//     if (!users || users.length === 0) {
//       return res.status(400).json({
//         error: "No Users Found",
//       });
//     }
//     return res.json(users);
//   } catch (err) {
//     return res.status(500).json({
//       error: "Internal Server Error",
//     });
//   }
// };

