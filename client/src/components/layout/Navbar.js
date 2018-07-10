import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authAction';

class Navbar extends Component {

  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser()
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a
            href="#"
            onClick={this.onLogoutClick.bind(this)}
            className="nav-link">
            <img
              src={user.avatar}
              alt={user.name}
              style= {{ width: '25px'}}
              title="You must have a gravatar connected to your email to have a profile image" />
            Log out
         </a>
        </li>
      </ul>
    )
    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/Login" className="nav-link">
            Login
          </Link>
        </li>
      </ul>
    )
    return (
      <nav className="navbar navbar-expand-sm navbar-dark mb-4">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            GrandMaRemedies
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon"/>
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Find remedies
                </Link>
              </li>
            </ul>
            {isAuthenticated ? authLinks : guestLinks}

          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
    auth: state.auth,
})
export default connect(mapStateToProps, { logoutUser })(Navbar);
