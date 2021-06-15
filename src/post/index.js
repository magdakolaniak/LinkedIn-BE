import express from "express";
import postModel from "./schema.js";

const postRouter = express.Router();

postRouter.get("/", async (req, res, next) => {
  try {
    const posts = await postModel.find().populate("user");
    res.send(posts);
  } catch (error) {
    console.log(error);
  }
});
//new changes

postRouter.get("/:id", async (req, res, next) => {
  try {
    const postId = req.params.id;
    const post = await postModel.findById(postId);
    res.send(post);
  } catch (error) {
    console.log(error);
  }
});

postRouter.post("/", async (req, res, next) => {
  try {
    const newPost = new postModel(req.body);
    const data = await newPost.save();
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

postRouter.put("/:id", async (req, res, next) => {
  try {
    const postId = req.params.id;
    const post = await postModel.findByIdAndUpdate(postId, req.body, {
      runValidators: true,
      new: true,
    });
    res.send(post);
  } catch (error) {
    console.log(error);
  }
});

postRouter.delete("/:id", async (req, res, next) => {
  try {
    const postId = req.params.id;
    const post = await postModel.findByIdAndDelete(postId);

    if (post) {
      res.status(204).send("Sucesfully deleted!");
    } else {
      res.send("Post with given ID not found");
    }
  } catch (error) {
    console.log(error);
  }
});

export default postRouter;
