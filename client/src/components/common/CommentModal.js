import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextAreaInput from '../common/TextAreaInput';
import { createComment } from '../../actions/commentsAction'

class createCommentModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
       body: '',

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

    const commentData = {
      body: this.state.body,
      userId: this.props.userId,
      recipeId: this.props.recipeId
    };
    this.props.createComment(commentData, this.props.history);
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {

  return (
    <div className="mb-4">
    <button type="button mx-auto" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
      Ajouter un commentaire
    </button>
    <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Ajouter un commentaire</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form  noValidate onSubmit={this.onSubmit}>
          <div className="modal-body">
            <TextAreaInput
            placeholder="body"
            name="body"
            value={this.state.body}
            onChange={this.onChange}
            info="The content of your comment"
            />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Fermer</button>
            <input type="submit" className="btn btn-secondary" value="Ajouter" />
          </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
}
}
const mapStateToProps = state => ({
userId: state.auth.user.id,
recipeId: state.recipes.recipe._id
})

export default connect(mapStateToProps, { createComment })( withRouter(createCommentModal));
