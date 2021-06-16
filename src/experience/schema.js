import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const experienceSchema = new Schema(
  {
    role: { type: String, required: true },
    company: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    description: { type: String, required: true },
    area: { type: String, required: true },
    username: { type: Schema.Types.ObjectId,  ref: 'Profile' }, 
    image: {
      type: String,
      default:
        'https://res.cloudinary.com/dmqsfltrf/image/upload/v1607933865/linkedin/d5ncpqvqrjwdxixjuyjr.ico',
    },
  },
  { timestamps: true }
);

export default model('Experience', experienceSchema);
