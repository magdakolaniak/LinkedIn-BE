import express from 'express';
import experienceModel from './schema.js';
import profileModel from '../profile/schema.js';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { generateCV } from '../lib/pdf.js';
import { parse } from 'json2csv';

const ExperienceRouter = express.Router();

/****************UPLOAD COVER USING CLOUDINARY******************/
const cloudinaryStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'Strive-linkedIn',
  },
});

const upload = multer({ storage: cloudinaryStorage }).single('image');

ExperienceRouter.post(
  '/:userName/experiences/:expId/picture',
  upload,
  async (req, res, next) => {
    try {
      const experience = await experienceModel.findById(req.params.expId);
      experience.image = req.file.path;
      await experience.save();

      res.send(req.file.path);
    } catch (error) {
      next(error);
    }
  }
);

/****************Download PDF******************/
ExperienceRouter.get('/:userId/pdfDownload', async (req, res, next) => {
  try {
    const user = await profileModel

      .findById(req.params.userId)
      .populate('experiences');
    const { name, surname } = user;
    const pdfStream = await generateCV(user);
    res.set({
      'content-type': 'application/pdf',
      'content-disposition': `attachment; filename = ${name}_${surname}.pdf`,
    });
    pdfStream.pipe(res);
    pdfStream.end();
  } catch (error) {
    next(error);
  }
});

/***************************Download csv**********************************************/

ExperienceRouter.get('/:userName/experiences/CSV', async (req, res, next) => {
  try {
    const userData = await profileModel
      .findById(req.params.userName)
      .populate('experiences');
    const onlyExp = userData.experiences;
    const { name, surname } = userData;

    const fields = [
      '_id',
      'role',
      'company',
      'startDate',
      'endDate',
      'description',
      'area',
    ];
    const options = { fields };
    const csv = parse(onlyExp, options);
    res.setHeader(
      'Content-Disposition',
      `attachment; filename = ${name}_${surname}.csv`
    );
    res.send(csv);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

/****************UPDATE EXPERIENCES******************/
ExperienceRouter.put('/experiences/:expId', async (req, res, next) => {
  try {
    const updatedExp = await experienceModel.findByIdAndUpdate(
      req.params.expId,
      req.body,
      { runValidators: true, new: true }
    );
    if (updatedExp) {
      res.send(updatedExp);
    } else {
      res.status(404).send('Not found');
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

/****************GET EXPERIENCES ******************/
ExperienceRouter.get('/experiences', async (req, res, next) => {
  try {
    const allExperiences = await experienceModel
      .find({}, { updatedAt: 0, createdAt: 0 })

      .populate('username', {
        avatar: 1,
        name: 1,
        surname: 1,
        _id: 0,
        email: 1,
        bio: 1,
        title: 1,
      });

    res.send(allExperiences);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

/****************GET SPECIFIC EXPERIENCES******************/
ExperienceRouter.get(
  '/:userName/experiences/:expId',
  async (req, res, next) => {
    try {
      const singleExp = await experienceModel.findById(req.params.expId);
      if (singleExp) {
        res.send(singleExp);
      } else {
        res.status(404).send(`Not found `);
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

/****************DELETE EXPERIENCE******************/

ExperienceRouter.delete('/experiences/:expId', async (req, res, next) => {
  try {
    const deletedExp = await experienceModel.findByIdAndDelete(
      req.params.expId
    );
    if (deletedExp) {
      res.status(204).send('deleted');
    } else {
      res.status(404).send('Not found');
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default ExperienceRouter;
