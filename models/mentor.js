import mongoose from "mongoose";
const mentorSchema = new mongoose.Schema(
  {
    mentorrname: {
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
      type: String,
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

export default mongoose.model("User", UserSchema);