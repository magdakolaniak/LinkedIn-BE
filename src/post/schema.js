import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const PostSchema = new Schema(
  {
    text: { type: String, required: true },
    user: [{ type: Schema.Types.ObjectId, required: true, ref: 'Profile' }],
    image: { type: String, default: 'https://picsum.photos/200/300' },
    likes: [{ type: Schema.Types.ObjectId, ref: 'Profile' }],
  },
  { timestamps: true }
);

export default model('Post', PostSchema);
