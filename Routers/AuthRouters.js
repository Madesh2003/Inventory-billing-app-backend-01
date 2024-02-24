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


function Signin_User(req, res, next){
  const { email, password } = req.body;
  console.log(req.body);
  let query = {};

  if (email) {
    query = {
      email: email,
    };
  }


  try {
    const response = AuthModel.findOne(query);
    if (response && response._id) {
      bcrypt.compare(password, response.password).then(function (result) {
        if (result) {
          const token = jwt.sign({ role: ["customer"] }, secret, {
            expiresIn: "5h",
          });
          res.status(200).json({
            success: true,
            message: "Account sign in successful",
            token: token,
          });
        } else {
          res.status(401).json({
            success: false,
            message: "Email ID or Phone Number or Password is wrong",
          });
        }
      });
    } else {
      return res.status(201).json({
        success: true,
        message: "Account does not exists",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error,
    });
  }
}



module.exports = {
    Create_User,
    Signin_User
}