import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextInput from '../common/TextInput';
import TextAreaInput from '../common/TextAreaInput';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile } from '../../actions/profileAction'

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
       country: '',
       skills: '',
       bio: '',
       status: '',
       handle: '',
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

    const profileData = {
      handle: this.state.handle,
      country: this.state.country,
      skills: this.state.skills,
      bio: this.state.bio,
      status: this.state.status,
    };
    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    const { errors } = this.state;
    const options = [
      { label: '* Select a user status', value: 0 },
      { label: 'mamie cuisine', value: 'mamie cuisine' },
      { label: 'curieux', value: 'curieux' },
      { label: 'chef pro', value: 'chef pro' },
      { label: 'débrouillard/débrouillarde', value: 'débrouillard/débrouillarde' },
    ];

    return (
      <div className="create-profile">
        <div className="header-background-profile">
        <div className="landing-inner-profile text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-5 mb-1">Votre profil</h1>
            </div>
          </div>

        </div>
          </div>
          </div>
        <div className="container mt-4">
          <div className="row mt-4">
            <div className="col-md-8 m-auto">
              <p className="lead text-center">Ajoutez des informations à votre profil.</p>
              <small className="d-block pb-3">*require field</small>
            </div>
          </div>
        </div>
        <form className="col-md-6 m-auto" noValidate onSubmit={this.onSubmit}>
          <TextInput
          placeholder="handle"
          name="handle"
          value={this.state.handle}
          onChange={this.onChange}
          error={errors.handle}
          info="Choose a unique pseudonyme"
          />
          <TextInput
            placeholder="your country"
            name="country"
            type="text"
            value={this.state.country}
            onChange={this.onChange}
            error={errors.country}
          />
          <SelectListGroup
            placeholder="status"
            name="status"
            value={this.state.status}
            onChange={this.onChange}
            options={options}
            error={errors.status}
            info="Give us an idea of hat you are doing here"
            />
            <TextInput
            placeholder="skills"
            name="skills"
            value={this.state.skills}
            onChange={this.onChange}
            error={errors.skills}
            info="What are you capable of ?"
            />
            <TextAreaInput
            placeholder="bio"
            name="bio"
            value={this.state.bio}
            onChange={this.onChange}
            error={errors.bio}
            info="Tell us more about your story"
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
  profile: state.profile,
  errors: state.errors
})

export default connect(mapStateToProps, { createProfile  })( withRouter(CreateProfile));
