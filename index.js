import express from "express";
import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
import mongoose from "mongoose"
const app = express();
dotenv.config();

app.use(express.json());
const PORT = process.env.PORT;
//interceptor /converting body to json

const MONGO_URL = process.env.MONGO_URL;

//Mongo connection
// async function createConnection() {
//   const client = new MongoClient(MONGO_URL);
//   await client.connect();
//   console.log("client",client);
//   console.log("MongoDB is connected");
//   return client;
// }
const connect = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
  } catch (error) {
    throw error;
  }
};

// export const client = await createConnection();
// req => what we send to Server
// res => what we receive from server

app.get("/", function (req, res) {
  res.send("Hello Everyone🥳");
});

// app.use("/", booksRouter);


app.listen(PORT,()=> {
  connect();
  console.log(`Server is running on ${PORT}`)})