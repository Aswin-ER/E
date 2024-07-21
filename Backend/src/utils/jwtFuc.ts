import jwt from "jsonwebtoken";
interface tsToken {
  access_token: string;
}

export const funJwt = (username: string) => {

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  // access token
  const access_token = jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  // setting tokens
  const tokens: tsToken = {
    access_token: access_token
  };

  return { tokens: tokens };
  
};
