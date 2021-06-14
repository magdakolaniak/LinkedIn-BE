import mongoose from "mongoose";
const { Schema, model } = mongoose;

const experienceSchema = new Schema(
  {
    role: { type: String, required: true },
    company: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String },
    description: { type: String, required: true },
    area: { type: String, required: true },
    username: { type: String, required: true },
    image: { type: String, },
  },
  { timestamps: true }
);

export default model("experience", experienceSchema);

/* {
  "_id": "5d925e677360c41e0046d1f5",  //server generated
  "role": "CTO",
  "company": "Strive School",
  "startDate": "2019-06-16T22:00:00.000Z",
  "endDate": "2019-06-16T22:00:00.000Z", //could be null
  "description": "Doing stuff here and there",
  "area": "Berlin",
  "username": "admin",
  "createdAt": "2019-09-30T19:58:31.019Z",  //server generated
  "updatedAt": "2019-09-30T19:58:31.019Z",  //server generated
  "image": ... //server generated on upload, set a default here
} */
