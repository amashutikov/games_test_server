import mongoose, { Schema } from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: {
      required: true,
      type: String,
      unique: true,
    },
    password: {
      required: true,
      type: String,
    },
    activationToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const User = mongoose.model('User', userSchema);
