import mongoose from "mongoose";
const connOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
// importing dotenv library to access .env files
import dotenv from "dotenv";
dotenv.config();

console.log(process.env.MONGO_URI);
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/API_TEST";

const connectToDB = async () => {
  try {
    const connect = await mongoose.connect(MONGO_URI, connOptions);
    if (connect) console.log(`Mongodb connected - ${connect.connection.host}`);
  } catch (err) {
    console.log(`Database error ${err}`);
  }
};

export default connectToDB;
