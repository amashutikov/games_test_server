import mongoose from 'mongoose';

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
    firstName: {
      type: String,
    },
    secondName: {
      type: String,
    },
    country: {
      type: String,
    },
    image: {
      type: Buffer,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model('User', userSchema);
