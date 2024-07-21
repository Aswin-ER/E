import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const verifyJwtToken = (req: any, res: Response, next: NextFunction) => {
  try {
    let token = req.headers["authorization"];

    if (token == null) {
      return res.status(401).json({ message: "No token provided" });
    }

    jwt.verify(
      token,
      process.env.JWT_SECRET as string,
      (err: any, user: any) => {
        if (err) {
          return res.status(403).json({ message: "Invalid token" });
        }

        console.log(user, "user token here");

        // Attach the user information to the request object
        req.userDetails = user;
        next();
      }
    );
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default verifyJwtToken;
