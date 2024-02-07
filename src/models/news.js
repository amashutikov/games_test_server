import mongoose, { Schema } from 'mongoose';

const dataSchema = new Schema({
  title: String,
  title_image: String,
  body: String,
});

export const NewsModel = mongoose.model('News', dataSchema);
