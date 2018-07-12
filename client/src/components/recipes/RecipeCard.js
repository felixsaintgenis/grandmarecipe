import React from 'react';

const RecipeCard = ({
  name,
  image_url,
  product_description
}) => {
  return (
    <div class="card" style="width: 18rem;">
      <img class="card-img-top" src={image_url} alt="Card image cap"/>
      <div class="card-body">
        <h5 class="card-title">{name}</h5>
        <p class="card-text">{product_description}</p>
        <a href="#" class="btn btn-primary">See more</a>
      </div>
    </div>

  );
};

export default RecipeCard;
