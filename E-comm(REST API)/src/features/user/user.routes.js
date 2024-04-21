import express from 'express';
import UserController from  '../user/user.controller.js';


//create router
const userRouter=express.Router();


const userController =new UserController();


userRouter.post("/signup",userController.signUp);
userRouter.post("/signin",userController.signIn);

export default userRouter;
