import mongoose from "mongoose";

export const connectToDatabase = async () => {
  let dbString: string = "";

  if (process.env.NODE_ENV === "development") {
    dbString = process.env.MONGO_URI_DEV!;
  }
  if (process.env.NODE_ENV === "production") {
    dbString = process.env.MONGO_URI_PROD!;
  }
  try {
    const connectionString = await mongoose.connect(dbString);
    console.log(
      "Connected to database successfully",
      connectionString.connection.host,
    );
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
};
