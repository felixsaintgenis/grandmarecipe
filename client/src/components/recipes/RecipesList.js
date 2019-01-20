import React from "react";
import RecipeCard from "./RecipeCard";
import Grid from "@material-ui/core/Grid";
import "../../css/Recipe.css";

const RecipesList = ({ recipes }) => {
  return (
    <div className="recipes-page">
      <div className="container">
        <div className="row">
          {recipes
            ? recipes.map(recipe => {
                return (
                  <Grid item key={recipe} sm={12} md={4} lg={4}>
                    <RecipeCard
                      key={recipe._id}
                      name={recipe.name}
                      image_url={recipe.image_url}
                      product_description={recipe.product_description}
                      id={recipe._id}
                      tags={recipe.tags}
                    />
                  </Grid>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};

export default RecipesList;
