import React from 'react';
import { Link } from 'react-router-dom';

const RecipeCard = ({
  name,
  image_url,
  product_description,
  id
}) => {
  return (
    <div className="card mb-3">
      <img className="card-img-top" src={image_url} alt="Card image cap" />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{product_description}</p>
        <Link to={`/recipe/${id}`} className="btn btn-info">
              View more
            </Link>
        <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
      </div>
      </div>
  );
};

export default RecipeCard;
