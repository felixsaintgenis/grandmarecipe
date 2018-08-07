import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextInput from '../common/TextInput';
import RecipeCard from '../recipes/RecipeCard'
import { getAllRecipes } from '../../actions/recipesAction';
import '../../css/SearchBar.css';

class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      searchContent: '',
      recipeArray: []
    };
    this.displayMatches = this.displayMatches.bind(this);
  };


  componentDidMount() {
    this.props.getAllRecipes();
  };

  findMatches (wordToMatch, recipes) {
    return recipes.filter(recipe => {
      const regex = new RegExp(wordToMatch, 'gi');
      if (wordToMatch )
      return recipe.name.match(regex)
    })
  }

  async displayMatches (e) {
  await this.setState({ searchContent: e.target.value });
    const recipeArray = await this.findMatches(this.state.searchContent, this.props.recipes.recipes);
    this.setState({ recipeArray: recipeArray })
    }

  render() {

    return (
      <div className="search-component">
        <TextInput
          placeholder="search by name"
          name="searchBar"
          type="text"
          onKeyUp={this.displayMatches}
        />
        {this.state.recipeArray.length != 0 ? <h2>Search results</h2> : null}
        <div className="row">
    {this.state.recipeArray && this.state.recipeArray.map((recipe, index) => {
      return(
        <div className="col-4 search-results">
        <RecipeCard
        key={index}
        name={recipe.name}
        image_url={recipe.image_url}
        product_description={recipe.product_description}
        id={recipe._id}
        />
      </div>
      )
    })}
    </div>
    {this.state.recipeArray.length != 0 ? <hr /> : null}
      </div>
    );
  };
};

const mapStateToProps = (state) => ({
  recipes: state.recipes
});

export default connect(mapStateToProps, { getAllRecipes })(SearchBar);
