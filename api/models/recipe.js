import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  image_url: {
    type: String,
    required: true
  },
  tags: [String],
  ingredients: [String],
  product_description: {
    type: String,
  },
  product_recipe: {
    type: String,
  },
  published_date: {
    type: Date,
    default: Date.now
  }

});

mongoose.model ('recipes', RecipeSchema)
