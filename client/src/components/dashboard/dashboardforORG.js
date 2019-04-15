import { getCurrentOrganization } from "../../actions/OrganizationActions";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Spinner from "../common/Spinner";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class dashboardforORG extends Component {
    componentDidMount() {
      this.props.getCurrentOrganization();
    }
  
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
                <Link to={`/api/profiles/organization/${profile._id}`}>
                  {profile.name}
                </Link>
              </p>
              <Link
                to="/api/profiles/create-Partner"
                className="btn btn-lg btn-info"
              >
                Create Partner's profile
              </Link>
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
  
  dashboardforORG.propTypes = {
    getCurrentOrganization: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    profile: state.organization,
    auth: state.auth
  });
  
  export default connect(
    mapStateToProps,
    { getCurrentOrganization }
  )(dashboardforORG);
  