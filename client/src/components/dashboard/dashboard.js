import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getCurrentMember } from "../../actions/memberActions";
import Spinner from "../common/Spinner";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {getCurrentPartner} from "../../actions/partnerActions"
class dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentMember();
    this.props.getCurrentPartner();
  }

  render() {
    const { user } = this.props.auth;
    const { profile } = this.props.profile;
    const  profile2  = this.props.profile2.profile;
    let dashboardContent;

    if (profile === null && profile2 === null) {
      dashboardContent = <Spinner />;
    } else {
      if (profile.name) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Welcome{" "}
              <Link to={`/api/profiles/member/${profile._id}`}>
                {profile.name}
              </Link>
            </p>
            <Link
              to="/api/profiles/edit-member"
              className="btn btn-lg btn-info"
            >
              Edit Profile
            </Link>
            <Link
              to="/api/profiles/addSkils"
              className="btn btn-lg btn-info"
            >
              add skill
            </Link>
            <Link
              to="/taskform"
              className="btn btn-lg btn-info"
            >
              add skill
            </Link>
          </div>
          
        );
      }
        else if(profile2.fieldOfWork){
          dashboardContent = (
            <div>
              <p className="lead text-muted">
                Welcome{" "}
                <Link
                className="btn btn-lg btn-info"
                to={`/api/profiles/partner/${profile2._id}`}>
                  Show Profile:{profile2.name}
                </Link>
              </p>
              <Link
                to="/api/profiles/Edit-Partner"
                className="btn btn-lg btn-info"
              >
                Edit Partner's profile
              </Link>{" "}
              <Link
              to="api/profiles/application/:id"
              className="btn btn-lg btn=info">
              Post Application
              </Link>
            </div>
          );}
          else{
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
  getCurrentPartner: PropTypes.func.isRequired,
  getCurrentMember: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  profile2: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.member,
  auth: state.auth,
  profile2: state.partner
});

export default connect(
  mapStateToProps,
  { getCurrentMember,getCurrentPartner }
)(dashboard);
