import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import Appitem from "./Appitem";
import { getApplications } from "../../actions/adminActions";

class getAllApp extends Component {
  componentDidMount() {
    this.props.getApplications();
  }

  render() {
    const { profiles } = this.props.profile;
    let profileItems;

    if (profiles === null) {
      profileItems = <Spinner />;
    } else {
     // if (profiles > 0) {
        profileItems = profiles.map(profile => (
          <Appitem key={profile._id} profile={profile} />
        ));
    //  } else {
        profileItems = <h4>No applications found...</h4>;
      }
   // }

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">applications</h1>
              <p className="lead text-center">
                All submitted applications
              </p>
              {profileItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

getAllApp.propTypes = {
  getApplications: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.admin
});

export default connect(
  mapStateToProps,
  { getApplications }
)(getAllApp);
