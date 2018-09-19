import React, { Component } from 'react';
import { connect } from 'react-redux';

class Profile extends Component {

  render() {
    return (
      <div className="profile mt-5">
        <h2>Informations:</h2>
              <div className="card-group mt-5">
  <div className="card">
    <div className="card-body">
      <h5 className="card-title">Pseudo</h5>
      <p className="card-text">{this.props.profile.profile.handle}</p>
    </div>
  </div>
  <div className="card">
    <div className="card-body">
      <h5 className="card-title">Country</h5>
      <p className="card-text">{this.props.profile.profile.country}</p>
    </div>
  </div>
  <div className="card">
    <div className="card-body">
      <h5 className="card-title">Status</h5>
      <p className="card-text">{this.props.profile.profile.status}</p>
    </div>
  </div>
  <div className="card">
  <div className="card-body">
  <h5 className="card-title">skills</h5>
  <p className="card-text">{this.props.profile.profile.skills}</p>
  </div>
  </div>
  <div className="card">
  <div className="card-body">
  <h5 className="card-title">création du compte</h5>
  <p className="card-text">{this.props.profile.profile.date}</p>
  </div>
  </div>
</div>
<div className="card-group mt-5">
<div className="card">
<div className="card-body">
<h5 className="card-title">bio</h5>
<p className="card-text">{this.props.profile.profile.bio}</p>
</div>
</div>
</div>
          </div>


    );
  }
}




const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps)(Profile);
