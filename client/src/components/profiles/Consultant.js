import React, { Component } from "react";
import { getConsultant } from "../../actions/consultantActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import ConsultantHeader from "./ConsultantHeader";
import ConsultantCred from "./ConsultantCred";
import ConsultantAbout from "./ConsultantAbout";


class Consultant extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getConsultant(id);
  }
  render() {
    const { profile } = this.props;
    let profileContent;

    if (profile == null || Object.keys(profile) == 0) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div>
          <ConsultantHeader profile={profile} />
          <ConsultantAbout profile={profile} />
          <ConsultantCred profile={profile} />
        </div>
      );
    }
    return <div>{profileContent}</div>;
  }
}

Consultant.propTypes = {
  getConsultant: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.consultant.profile
});

export default connect(
  mapStateToProps,
  { getConsultant }
)(Consultant);
