import express from "express";
import commentsModel from "./schema.js";
import postModel from "../post/schema.js";
import ProfileModel from "../profile/schema.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const commentRouter = express.Router();

const cloudinaryStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "linkedin",
  },
});

/****************POST  COMMENTS******************/

commentRouter.post("/:id/comment", async (req, res, next) => {
  try {
    const profile = await ProfileModel.find({}).select("_id");

    console.log(profile);
    const random = profile[Math.floor(Math.random() * profile.length)];
    const randomId = random._id;
    console.log(randomId);

    const post = await postModel.findById(req.params.id);

    const newComment = { ...req.body, user: randomId };

    const comment = new commentsModel(newComment);
    const { _id } = await comment.save();
    post.comments.push(_id);
    const updatedPost = await post.save();
    res.send(updatedPost);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

/****************GET ALL COMMENTS FOR A SPECIFIED POST******************/

commentRouter.get("/:id/comment", async (req, res, next) => {
  try {
    const post = await postModel.findById(req.params.id, { comments: 1 }).populate({ path: "comments", populate: { path: "user" } });
    res.send(post.comments);
  } catch (error) {
    next(error);
  }
});

/****************UPDATE COMMENT FOR A SPECIFIED POST******************/

commentRouter.put("/comment/:commentId", async (req, res, next) => {
  try {
    const updatedComment = await commentsModel.findByIdAndUpdate(req.params.commentId, req.body, { runValidators: true, new: true });
    if (updatedComment) {
      res.send(updatedComment);
    } else {
      res.status(404).send("Not found");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

/****************DELETE COMMENT FOR A SPECIFIED POST******************/

commentRouter.delete("/comment/:commentId", async (req, res, next) => {
  try {
    const delComment = await experienceModel.findByIdAndDelete(req.params.expId);
    if (delComment) {
      res.status(204).send("deleted");
    } else {
      res.status(404).send("Not found");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});
export default commentRouter;
