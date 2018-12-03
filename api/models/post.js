import mongoose from "mongoose";

const { Schema } = mongoose;

const commentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "users" },
  recipe: { type: Schema.Types.ObjectId, ref: "recipe" },
  body: String,
  created_at: Date
});

mongoose.model("comment", commentSchema);
