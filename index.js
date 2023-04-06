import express from "express";
//import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
import mongoose from "mongoose"
import student from './models/student.js'
import mentor from "./models/mentor.js"
import bodyParser from 'body-parser'
const app = express();
dotenv.config();
app.use(express.json());
const PORT = process.env.PORT;
app.use(bodyParser.urlencoded({ extended: false }))
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
  res.send("<h1>Welcome to Student Mentor Backend<h1>");
});
app.post("/createstudent", async function (req, res) {
  const { studentname, contactno, mentorassigned } = req.body
  const newstudent = new student({
    studentname: studentname,
    contactno: contactno,
    mentorassigned: mentorassigned
  })
  await newstudent.save()
  res.status(200).send(newstudent)
});
app.post("/creatementor", async function (req, res) {
  const { mentorname, contactno, rating, courses, language, studentenrolled, studentunenrolled } = req.body;
  const newmentor = new mentor({
    mentorname: mentorname,
    contactno: contactno,
    rating: rating,
    courses: courses,
    language: language,
    studentenrolled: studentenrolled,
    studentunenrolled: studentunenrolled
  })
  await newmentor.save()
  res.status(200).send(newmentor)
})
//student assigned to mentor
app.get("/nomentorassigned", async function (req, res) {
  const a = await student.find({}, { et: { mentorassigned: 0 } })
  res.send(a)
});

app.put("/assignstudent/:mentorid", async (req, res) => {
  const mentorid = req.params["mentorid"]
  const students= req.body
  for (const sp in students) {
    console.log(students[sp])
    const result = await mentor.findOneAndUpdate({ _id: mentorid }, { $push: { studentenrolled: sp } })
   const abcd = await student.findOneAndUpdate({ _id: sp }, { $push: { mentorassigned: mentorid } })} 
  
  res.send(result)
})






// app.use("/", booksRouter);


app.listen(PORT, () => {
  connect();
  console.log(`Server is running on ${PORT}`)
})