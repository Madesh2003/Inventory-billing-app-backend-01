const { Create_User, Signin_User } = require('../Routers/AuthRouters');

const AuthRouter = require("express").Router()

AuthRouter.post("/create", Create_User);
AuthRouter.post("/signin", Signin_User);

module.exports = AuthRouter;
