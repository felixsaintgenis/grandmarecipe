import express from "express";
import {
  get_all_remedies,
  get_last_three_remedies,
  get_remedie_by_id,
  add_a_remedie,
  add_a_comment_to_a_remedie,
  toggle_a_like_to_a_remedie
} from "../controllers/recipesController";

require("../models/recipe");
require("../models/post");
require("../models/user");

const router = express.Router();

// @route GET api/recipes/
// @description get all the remedies
// @access public

router.get("/", get_all_remedies);

// @route GET api/recipes/lastThreeRecipes
// @description get last three remedies
// @access public

router.get("/lastThreeRecipes", get_last_three_remedies);

// @route GET api/recipes/:id
// @description get a remedie by id
// @access public

router.get("/:id", get_remedie_by_id);

// @route POST api/recipes/add
// @description add a remedie
// @access public

router.post("/add", add_a_remedie);

// @route POST api/recipes/:recipeid/:userid/comment/create
// @description add a comment to a remedie
// @access public

router.post("/:recipeid/:userid/comment/create", add_a_comment_to_a_remedie);

// @route POST api/recipes/:recipeid/:userid/like
// @description toggle a like to a remedie
// @access public

router.post("/:recipeid/:userid/like", toggle_a_like_to_a_remedie);

export default router;
