import Validator from "validator";
import isEmpty from "./is-empty";

module.exports = function validateRecipeInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.image_url = !isEmpty(data.image_url) ? data.image_url : "";
  data.tags = !isEmpty(data.tags) ? data.tags : "";
  data.ingredients = !isEmpty(data.ingredients) ? data.ingredients : "";
  data.product_description = !isEmpty(data.product_description)
    ? data.product_description
    : "";
  data.product_recipe = !isEmpty(data.product_recipe)
    ? data.product_recipe
    : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "name is required";
  }

  if (Validator.isEmpty(data.image_url)) {
    errors.image_url = "image_url field is required";
  }

  if (Validator.isEmpty(data.tags)) {
    errors.tags = "tags field is required";
  }

  if (Validator.isEmpty(data.ingredients)) {
    errors.ingredients = "ingredients field is required";
  }

  if (Validator.isEmpty(data.product_description)) {
    errors.product_description = "product_description field is required";
  }
  if (Validator.isEmpty(data.product_recipe)) {
    errors.product_recipe = "product_recipe field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
