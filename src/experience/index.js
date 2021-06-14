import express from "express"; // third party module(needs to ne installed)
import experienceModel from "./schema.js";
// import { validationResult } from "express-validator";
// import createError from "http-errors";
// import { blogPostsValidation } from "./validation.js";
// import multer from "multer";
// import { v2 as cloudinary } from "cloudinary";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import { generatePDFStream } from "../lib/pdf.js";
// import { pipeline } from "stream";
// import { Transform } from "json2csv";

const ExperienceRouter = express.Router();

/****************POST Experience******************/

ExperienceRouter.post("/", async (req, res, next) => {
  try {
    const newExperience = new experienceModel(req.body);

    const mongoRes = await newExperience.save();
    res.status(201).send(mongoRes);
  } catch (error) {
    next(error);
  }
});

/****************GET EXPERIENCES******************/
ExperienceRouter.get("/profile/userName/experiences", async (req, res, next) => {
  try {
    const allExperiences = await experienceModel.find();

    res.send(allExperiences);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

/****************GET EXPERIENCES******************/
ExperienceRouter.get("/:id", async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
    next(error);
  }
});

/****************UPDATE EXPERIENCES******************/
ExperienceRouter.put("/:id", async (req, res, next) => {
  try {
    // const singlePost = await experienceModel.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true });
    // res.send(singlePost);
  } catch (error) {
    next(error);
  }
});

/****************DELETE EXPERIENCE******************/
ExperienceRouter.delete("/:id", async (req, res, next) => {
  try {
    // const singlePost = await experienceModel.findByIdAndDelete(req.params.id);
    // if (singlePost) {
    //   res.status(204).send();
    // }
  } catch (error) {
    next(error);
  }
});

/****************Download PDF******************/
ExperienceRouter.get("/pdfDownload", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
/******************************Export CSV******************************************/
ExperienceRouter.get("/pdftocsv", async (req, res, next) => {
  try {
    // await generatePDF();
    // res.send("generated");
  } catch (error) {
    next(error);
  }
});

/***************************Download csv**********************************************/
ExperienceRouter.get("/csvDownload", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

/****************UPLOAD COVER USING CLOUDINARY******************/
// const cloudinaryStorage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "Strive",
//   },
// });

// const upload = multer({ storage: cloudinaryStorage }).single("cover");

ExperienceRouter.post("/:id/uploadCover", upload, async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

export default ExperienceRouter;
