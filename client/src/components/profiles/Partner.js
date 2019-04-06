import react , {component} from react;
import {getPartner} from "../../actions/partnerActions"
import { connect } from "react-redux";
import PropTypes from "prop-types";
class Partner extends component(){
    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.getPartner(id);
}render() {
    const { profile } = this.props;
    let profileContent;

    if (profile === null) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div>
          <MemberHeader profile={profile} />
          <MemberAbout profile={profile} />
          <MemberCred profile={profile} />
        </div>
      );
    }
    return <div>{profileContent}</div>;
  }
}

Member.propTypes = {
  getMember: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.member.profile
});

export default connect(
  mapStateToProps,
  { getMember }
)(Member);
