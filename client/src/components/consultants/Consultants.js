import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import ConsultantItem from "./ConsultantItem";
import { getConsultant } from "../../actions/consultantActions";

class Consultant extends Component {
  componentDidMount() {
    this.props.getConsultant();
  }

  render() {
    const { profiles } = this.props.profile;
    let profileItems;

    if (profiles === null) {
      profileItems = <Spinner />;
    } else {
      if (profiles.length > 0) {
        profileItems = profiles.map(profile => (
          <ConsultantItem key={profile._id} profile={profile} />
        ));
      } else {
        profileItems = <h4>No profiles found...</h4>;
      }
    }

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Developer Profiles</h1>
              <p className="lead text-center">
                Browse and connect with developers
              </p>
              {profileItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Consultant.propTypes = {
  getConsultant: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.consultant
});

export default connect(
  mapStateToProps,
  { getConsultant }
)(Consultant);