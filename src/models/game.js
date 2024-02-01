import mongoose, { Schema } from 'mongoose';

const dataSchema = new Schema({
  id: Number,
  totalRating: Number,
  weightedRating: Number,
  genres: [Number],
});

export const DataModel = mongoose.model('Data', dataSchema);
