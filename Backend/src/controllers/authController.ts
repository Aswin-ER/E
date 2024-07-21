  import { Request, Response } from "express";
import { User, UserOutput } from "../models/types/userModel.types";
import bcrypt from "bcrypt";
import Auth from "../services/authService";
import { funJwt } from "../utils/jwtFuc";

const signUpController = {
  // User Signup
  userSignUp: async (
    req: Request<{email:string, password:string, username:string}>,
    res: Response<{ data: UserOutput | null; message: string}>
  ) => {
    try {
      const { email, username, password } = req.body;

      const authService = new Auth();

      // Bcrypted password before instering into db
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const userDetails: User | null = await authService.createUser(
        username,
        hashedPassword,
        email
      );

      console.log(userDetails);

      if (userDetails) {
        return res.status(200).json({
          data: {
            username: userDetails?.username,
            email: userDetails?.email,
          },
          message: "User Signup Successfull...!",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        data: {
          email: "",
          username: "",
        },
        message: "Internal server Error!",
      });
    }
  },

  // User Login
  userSignin: async (
    req: Request<{email: string, password: string}>,
    res: Response<{ data: UserOutput; message: string }>
  ) => {
    try {
      const { email, password } = req.body;

      const authService = new Auth();

      const userDetails = await authService.userSignin(email);

      if (!userDetails) {
        return res.status(400).json({
          data: { email: "", username: "", accessToken: ""},
          message: "Invalid User Details...!",
        });
      }

      if (userDetails?.password) {
        const validPassword = await bcrypt.compare(
          password,
          userDetails?.password
        );

        if (!validPassword) {
          return res.status(400).json({
            data: {
              email: "",
              username: "",
              accessToken: "",
            },
            message: "Invalid User Password...!",
          });
        }

        //get tokens and give to client
        const { tokens } = await funJwt(userDetails?.username);

        //set cookies
        res.cookie("accessToken", tokens?.access_token, {
          httpOnly: true,
          maxAge: 3600000, // 1hrs
          path: "/",
        });

        return res.status(200).json({
          data: {
            email: userDetails?.email,
            username: userDetails?.username,
            accessToken: tokens?.access_token,
          },
          message: "Signin Successfully...!",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        data: { email: "", username: "", accessToken: ""},
        message: "Internal server Error!",
      });
    }
  },

  //Logout
  logout: async (
    req: Request<{}>,
    res: Response<{ success: boolean; message: string }>
  ) => {
    try {
      res.clearCookie("accessToken", {
        path: "/",
        httpOnly: true,
        expires: new Date(0),
      });

      res.status(200).json({
        success: true,
        message: "Logout Successfully!",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Internal server Error!",
      });
    }
  },
};

export default signUpController;
