import mongoose from "mongoose";

const { Schema } = mongoose;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  skills: {
    type: String,
    required: true,
    max: 40
  },
  country: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  bio: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  favorites: [{ type: Schema.Types.ObjectId, ref: "recipes" }],
  likes: [{ type: Schema.Types.ObjectId, ref: "recipes" }]
});

mongoose.model("profile", ProfileSchema);
