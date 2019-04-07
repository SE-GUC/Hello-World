import React , {Component} from "react";
import { getPartner } from "../../actions/partnerActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import PartnerHeader from "./MemberHeader";
import PartnerCred from "./MemberCred";
import PartnerAbout from "./MemberAbout";
class Partner extends Component {
    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.getPartner(id);
}
render() {
    const { profile } = this.props;
    let profileContent;

    if (profile === null) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div>
          <PartnerHeader profile={profile} />
          <PartnerAbout profile={profile} />
          <PartnerCred profile={profile} />
        </div>
      );
    }
    return <div>{profileContent}</div>;
  }
}

Partner.propTypes = {
  getPartner: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.partner.profile
});

export default connect(
  mapStateToProps,
  { getPartner }
)(Partner);
