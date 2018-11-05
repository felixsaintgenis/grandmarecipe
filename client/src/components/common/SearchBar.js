import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';
import TextInput from '../common/TextInput';
import RecipeCard from '../recipes/RecipeCard'
import { getAllRecipes } from '../../actions/recipesAction';
import '../../css/SearchBar.css';

class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      searchContent: '',
      tagContent: null,
      recipeArray: []
    };
    this.displaySearchMatches = this.displaySearchMatches.bind(this);
    this.displayTagMatches = this.displayTagMatches.bind(this);
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

   searchWithTag (wordToMatch, recipes) {
     return recipes.filter(recipe => {
       const regex = new RegExp(wordToMatch, 'gi');
       if (wordToMatch)
       return recipe.tags.toString().match(regex)
     })
    }

  async displaySearchMatches (e) {
  await this.setState({ searchContent: e.target.value });
  const recipeArray = await this.findMatches(this.state.searchContent, this.props.recipes.recipes);
    this.setState({ recipeArray: recipeArray })
    }
    
  async displayTagMatches (tagContent) {
  await this.setState({ tagContent: tagContent.value });
  const newRecipeArray = await this.searchWithTag(this.state.tagContent, this.props.recipes.recipes);
    this.setState({ recipeArray: newRecipeArray })
    }
  render() {
    const { tagContent } = this.state;
    const options = [
      { value: 'jus', label: 'jus' },
      { value: 'detox', label: 'detox' },
      { value: 'antioxidant', label: 'antioxidant' },
      { value: 'smoothie', label: 'smoothie' },
      { value: 'thé', label: 'thé' },
       { value: 'energy', label: 'energy' }
    ]
    return (
      <div className="search-component">
        <div className="container">
        <div className="row">
          <div className="col-12">
        <TextInput
          placeholder="search by name"
          name="searchBar"
          type="text"
          onKeyUp={this.displaySearchMatches}
        />
        </div>
        </div>
        <div className="row">
        <div className="col-12">
        <div className="form-group">
          <Select
            value={tagContent}
            components={makeAnimated()}
            placeholder="select by tag..."
            options={options}
            onChange={this.displayTagMatches}
          />
    </div>
    </div>
    </div>
  </div>
        {this.state.recipeArray.length !== 0 ? <h2>Search results for {this.state.tagContent}</h2> : null}
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
    {this.state.recipeArray.length !== 0 ? <hr /> : null}
      </div>
    );
  };
};

const mapStateToProps = (state) => ({
  recipes: state.recipes
});

export default connect(mapStateToProps, { getAllRecipes })(SearchBar);
