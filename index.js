import express from "express";
import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
import mongoose from "mongoose"
import student from './models/student.js'
import mentor from "./models/mentor.js"
const app = express();
dotenv.config();

app.use(express.json());
const PORT = process.env.PORT;
//interceptor /converting body to json

// const MONGO_URL = process.env.MONGO_URL;

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
app.get("/createstudent",async function (req,res){
  const newstudent= new student({"studentname": "jai ",
  "contact no": "9112300100 ",
  "mentorassigned": []
  })
  
  await newstudent.save()
  res.status(200).send( newstudent)
})
app.get("/creatementor",async function (req,res){
  const newmentor= new mentor({ "mentorname": "john ",
  "contact no": "910000010 ",
  "rating": 8.8,
  "courses": [ "Fullstack developer","MERNSTACK developer"],
  "language": [ "english","tamil" ],
  "studentenrolled":[],
  "studentunenrolled":[]
  })
  await newmentor.save()
  res.status(200).send( newmentor)
})



// app.use("/", booksRouter);


app.listen(PORT,()=> {
  connect();
  console.log(`Server is running on ${PORT}`)})