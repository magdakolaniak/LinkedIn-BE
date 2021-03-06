import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const ProfileSchema = new Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    bio: { type: String, required: true },
    title: { type: String, required: true },
    area: { type: String, required: true },
    avatar: { type: String, default: 'https://i.pravatar.cc/100' }, //have to check
    experiences: [
      { type: Schema.Types.ObjectId, required: true, ref: 'Experience' },
    ],
    
  },
  { timestamps: true }
);

export default model('Profile', ProfileSchema);
