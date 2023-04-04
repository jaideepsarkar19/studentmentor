import mongoose from "mongoose";
const mentorSchema = new mongoose.Schema(
  {
    mentorname: {
      type: String,
      required: true,
      unique: true,
    },
    contactno: {
      type: Number,
      required: true,
      unique: true,
    },
    courses: {
      type: Array,
      required: true,
    },
    studentenrolled: {
        type: Array,
        default:[]
        
      },
      studentsunenrolled: {
        type: Array,
        default:[]
      },
      language: {
        type: Array,
              },

  },
  { timestamps: true}
);

export default mongoose.model("mentor", mentorSchema);