import express from 'express';
import ProfileModel from '../profile/schema.js';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const profileRouter = express.Router();
const cloudinaryStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'linkedin',
  },
});

profileRouter.get('/', async (req, res, next) => {
  try {
    const profile = await ProfileModel.find();
    res.send(profile);
  } catch (error) {
    console.log(error);
  }
});

profileRouter.get('/:id', async (req, res, next) => {
  try {
    const profileId = req.params.id;
    const profile = await ProfileModel.findById(profileId);
  } catch (error) {
    console.log(error);
  }
});

profileRouter.post('/', async (req, res, next) => {
  try {
    const newProfile = new ProfileModel(req.body);
    const data = await newProfile.save();
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

profileRouter.post(
  '/:id/picture',
  multer({ storage: cloudinaryStorage }).single('picture'),
  async (req, res, next) => {
    try {
      const profileId = req.params.id;
      const avatarUrl = `${req.file.path}`;
      const profileToUpdate = await ProfileModel.findById(profileId);
      profileToUpdate.avatar = avatarUrl;
      const newProfile = await profileToUpdate.save();

      res.send(newProfile);
    } catch (error) {
      console.log(error);
    }
  }
);

profileRouter.put('/:id', async (req, res, next) => {
  try {
    const profileId = req.params.id;
    const profile = await ProfileModel.findByIdAndUpdate(profileId, req.body, {
      runValidators: true,
      new: true,
    });
    res.send(profile);
  } catch (error) {
    console.log(error);
  }
});

profileRouter.delete('/:id', async (req, res, next) => {
  try {
    const profileId = req.params.id;
    const profile = await ProfileModel.findByIdAndDelete(profileId);
    if (profile) {
      res.status(204).send('deleted');
    } else {
      res.send('post not found');
    }
  } catch (error) {
    console.log(error);
  }
});

export default profileRouter;
