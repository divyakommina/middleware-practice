const userRouter = require("express").Router();

const userController = require("../Controller/UserController");

userRouter.post("/registerUser", userController.registerUser);
userRouter.get("/getDetailsByEmail", userController.getDetailsByEmail);
userRouter.post("/login",userController.login);
userRouter.get("/getDetailsbyEmailId", userController.getDetailsbyEmailId);

userRouter.post("/loginUser",userController.loginUser);
module.exports = userRouter;