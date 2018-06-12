import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  handle: {
    type: String,
    required: true,
    max:40
  },
  location: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  bio: {
    type: String
  },
  social: {
    facebook: {
      type: String
    },
    twitter: {
      type: String
    },
    youtube: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }

});

mongoose.model ('profile', ProfileSchema)
