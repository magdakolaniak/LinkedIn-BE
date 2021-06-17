import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const commentsSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: 'Profile' },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

export default model('Comments', commentsSchema);
