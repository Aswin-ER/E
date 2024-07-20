import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    const mongoUrl: any = process.env.MONGO_URL;
    await mongoose.connect(mongoUrl);
    console.log("Database Connected");
  } catch (error) {
    console.error(error, "Database Error");
    process.exit(1);
  }
};
