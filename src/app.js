import express from "express";
import cors from "cors";
const app = express();

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

console.log("path is => " + process.env.PORT);

app.use(cors());
app.use(express.json());

import surveyView from "../view/surveyView.js";
//routes
app.use(surveyView);

const connectDb = async () => {
  const connectionUrl = process.env.MONGODB;
  if (!connectionUrl) {
    console.log("connection url not found");
  }
  mongoose.connect(connectionUrl, (err) => {
    if (err) console.log(err);
    else console.log("connected mongodb");
  });
};

const port = process.env.PORT || 10000;

app.listen(port, async () => {
  await connectDb();
  console.log(`listening on ${port}`);
});
