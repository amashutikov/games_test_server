import mongoose, { Schema } from 'mongoose';

const tokenSchema = new mongoose.Schema(
  {
    refreshToken: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Token = mongoose.model('Token', tokenSchema);
