import express from "express";
import authController from "../controllers/authController";
import { validateLogin, validateSignup } from "../middleware/express-validator";

const authRouter = express.Router();

authRouter.post("/signup", validateSignup, authController.userSignUp);

authRouter.post('/signin', validateLogin, authController.userSignin);

authRouter.get("/logout", authController.logout);

export default authRouter;
