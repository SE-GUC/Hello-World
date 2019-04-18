import React, { Component } from "react";
import { Link } from "react-router-dom";
import Spinner from "../common/Spinner";
import PropTypes from "prop-types";
import { connect } from "react-redux";
class dashboard extends Component {

  render() {
    const { user } = this.props.auth;
    const { profile } = this.props.profile;

    let dashboardContent;

    if (profile == null) {
      dashboardContent = <Spinner />;
    } else {
      if (profile.name) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Welcome{" "}
              <Link to={`/api/api/applications/admin/${profile._id}`}>
                {profile.name}
              </Link>
            </p>
            
          </div>
          
        );
      } else {
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>
              You have not created a profile yet, Create a profile as a Member
              or an Organization
            </p>
            <Link
              to="/api/profiles/create-member"
              className="btn btn-lg btn-info"
            >
              Create Member
            </Link>{" "}
            <Link
              to="/api/profiles/create-organization"
              className="btn btn-lg btn-info"
            >
              Create Organization
            </Link>
          </div>
        );
      }
    }
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
)(dashboardforAdmin);
