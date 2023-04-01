import mongoose from "mongoose";
const studentSchema = new mongoose.Schema(
  {
    studentname: {
      type: String,
      required: true,
      unique: true,
    },
    contactno: {
      type: Number,
      required: true,
      unique: true,
    },
     mentorassigned: {
        type: Array,
        default:[]
      },
     } );


export default mongoose.model("student", studentSchema);