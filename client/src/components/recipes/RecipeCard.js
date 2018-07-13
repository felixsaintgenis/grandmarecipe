import React from 'react';
import { Link } from 'react-router-dom';

const RecipeCard = ({
  name,
  image_url,
  product_description
}) => {
  return (
    <div className="card mb-3">
      <img className="card-img-top" src={image_url} alt="Card image cap" />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{product_description}</p>
        <Link to="/recipe:name" className="btn btn-primary">
          See more
        </Link>
        <p className="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
      </div>
      </div>
  );
};

export default RecipeCard;
