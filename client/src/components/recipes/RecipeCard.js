import React from 'react';
import { Link } from 'react-router-dom';
import "../../css/Recipe.css";

const RecipeCard = ({
  name,
  image_url,
  product_description,
  id,
  tags
}) => {
  return (
    <div className="card mb-3">
      <Link to={`/recipe/${id}`} style={{ textDecoration: 'none' }}>
      <img className="card-img-top" src={image_url} alt="Card cap" />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{product_description}</p>
        <p className="card-text"><small className="text-muted tags">{tags}</small></p>
      </div>
      </Link>
      </div>
  );
};

export default RecipeCard;
