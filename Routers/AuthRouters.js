const AuthModel = require("../Models/AuthModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

require('dotenv').config();

const secret = process.env.JWT_SECRET_KEY;


function Create_User(req, res, next){
  if (req.body.password) {
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
      if (hash) {
        const NEW_USER = new AuthModel({ ...req.body, password: hash });
        NEW_USER.save()
          .then((response) => {
            if (response._id) {
              return res.status(200).json({
                success: true,
                message: "Account created successfully",
              });
            } else {
              return res.status(400).json({
                success: true,
                message: "Something went wrong",
                error: err,
              });
            }
          })
          .catch((error) =>
            res.status(200).json({
              success: false,
              error: error,
            })
          );
      } else {
        return res.status(500).json({
          success: false,
          message: "Something went wrong",
        });
      }
    });
  }
}


async function Signin_User(req, res, next) {
  const { email, password } = req.body;

  try {
    const response = await AuthModel.findOne({email});
    if (response) {
      const result = await bcrypt.compare(password, response.password);
      if (result) {
        const token = jwt.sign({ role: ["customer"] }, secret, {
          expiresIn: "5h",
        });
        res.status(200).json({
          success: true,
          message: "Account sign in successful",
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Email ID or Phone Number or Password is wrong",
        });
      }
    } else {
      return res.status(200).json({
        success: true,
        message: "Account does not exist",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
}




module.exports = {
    Create_User,
    Signin_User
}