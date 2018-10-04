import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextInput from '../common/TextInput';
import TextAreaInput from '../common/TextAreaInput';
import SelectListGroup from '../common/SelectListGroup';
import { createRecipe } from '../../actions/recipesAction';

class CreateRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
       name: '',
       image_url: '',
       tags: [],
       ingredients: [],
       product_description: '',
       product_recipe: '',
       errors: {}
    }
      this.onChange = this.onChange.bind(this)
      this.onSubmit = this.onSubmit.bind(this)
  }


  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({errors: nextProps.errors})
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const recipeData = {
      name: this.state.name,
      image_url: this.state.image_url,
      tags: this.state.tags,
      ingredients: this.state.ingredients,
      product_description: this.state.product_description,
      product_recipe: this.state.product_recipe

    };
    this.props.createRecipe(recipeData);
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    const { errors } = this.state;
    const options = [
      { label: '* Select a tag', value: 0 },
      { label: 'thé', value: 'thé' },
      { label: 'antioxydant', value: 'antioxydant' },
      { label: 'energy', value: 'energy' },
      { label: 'jus', value: 'jus' },
      { label: 'smoothie', value: 'smoothie' }
    ];

    return (
      <div className="create-profile">
        <div className="header-background-profile">
        <div className="landing-inner-profile text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-5 mb-1">Nouvelle recette</h1>
            </div>
          </div>

        </div>
          </div>
          </div>
        <div className="container mt-4">
          <div className="row mt-4">
            <div className="col-md-8 m-auto">
            <p className="lead text-center">Ajouter une nouvelle recette !</p>
            </div>
          </div>
        </div>
        <form className="col-md-6 m-auto" noValidate onSubmit={this.onSubmit}>
          <TextInput
          placeholder="nom de la recette"
          name="name"
          value={this.state.name}
          onChange={this.onChange}
          error={errors.name}
          />
          <TextInput
            placeholder="copier/coller l'url de l'image"
            name="image_url"
            type="text"
            value={this.state.image_url}
            onChange={this.onChange}
            error={errors.image_url}
            info="Seulement les images en dessous de 2mb sont acceptées"
          />
          <SelectListGroup
            placeholder="mot-clés de votre remède..."
            name="tags"
            value={this.state.tags}
            onChange={this.onChange}
            options={options}
            error={errors.tags}
            info="seulement un tag pour l'instant"
            />
            <TextInput
            placeholder="ingrédients de votre remède..."
            name="ingredients"
            value={this.state.ingredients}
            onChange={this.onChange}
            error={errors.ingredients}
            info="séparez les ingrédients d'une virgule et sans espace"
            />
            <TextAreaInput
            placeholder="description de votre produit..."
            name="product_description"
            value={this.state.product_description}
            onChange={this.onChange}
            error={errors.product_description}
            />
            <TextAreaInput
            placeholder="description de la recette..."
            name="product_recipe"
            value={this.state.product_recipe}
            onChange={this.onChange}
            error={errors.product_recipe}
            />
            <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
          </form>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  errors: state.errors
})

export default connect(mapStateToProps, { createRecipe })( withRouter(CreateRecipe));
