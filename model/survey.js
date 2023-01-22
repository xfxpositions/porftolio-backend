import mongoose, { Mongoose } from "mongoose";
const surveySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    questions: {
      type: Array,
      required: false,
      default: [],
    },
  },
  { timestamps: true }
);

const Survey = mongoose.model("survey", surveySchema);
export default Survey;
