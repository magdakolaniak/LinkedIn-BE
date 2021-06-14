import express from 'express';
import ProfileModel from '../profile/schema.js';

const profileRouter = express.Router();

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
