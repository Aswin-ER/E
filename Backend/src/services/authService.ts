import { User } from "../models/types/userModel.types";
import userModel from "../models/userModel";

class Auth {
  async createUser(
    username: string,
    password: string,
    email: string
  ): Promise<User | null> {
    try {
      await userModel.create({
        username,
        password,
        email,
      });

      const userDetails: User | null = await userModel.findOne({
        email: email,
        password: password,
      });

      console.log(userDetails);
      return userDetails;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create user.");
    }
  }

  async userSignin(email: string): Promise<User | null> {
    try {
      const user = await userModel.findOne({
        email,
      });

      return user;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create user.");
    }
  }
}

export default Auth;
