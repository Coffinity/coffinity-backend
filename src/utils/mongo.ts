import "dotenv/config";
import mongoose from "mongoose";
async function connect() {
  const dbUri = process.env.DB_URI as string;
  try {
    await mongoose.connect(dbUri);
    console.log("Connected to Database");
  } catch (error) {
    throw error;
  }
}

export default connect;
