import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextFieldGroupIcon from "../common/TextFieldGroupIcon";
import { editPartner, getCurrentPartner } from "../../actions/partnerActions";

class EditPartner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldOfWork:"",
      phone: "",
      email: "",
      address:"",
      twitter: "",
      facebook: "",
      linkedin: "",
      youtube: "",
      instagram: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    this.props.getCurrentPartner();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.partner) {
      const profile = nextProps.partner;
      profile.organization.name = profile.organization.name !== null ? profile.organization.name:"";
        profile.fieldOfWork = profile.fieldOfWork !== null ? profile.fieldOfWork: "";
        profile.organization.address = profile.organization.address !== null ? profile.organization.address:"";
        profile.organization.email = profile.organization.email !== null ? profile.organization.email : "";
        profile.organization.phone = profile.organization.phone !== null ? profile.organization.phone : "";
        
        profile.organization.social = Object.keys(profile.organization.social) !== 0 ? profile.organization.social : {};
        profile.twitter =
          profile.organization.social.twitter !== null ? profile.organization.social.twitter : "";
        profile.facebook =
          profile.organization.social.facebook !== null ? profile.organization.social.facebook : "";
        profile.linkedin =
          profile.organization.social.linkedin !== null ? profile.organization.social.linkedin : "";
        profile.youtube =
          profile.organization.social.youtube !== null ? profile.organization.social.youtube : "";
        profile.instagram =
          profile.organization.social.instagram !== null ? profile.organization.social.instagram : "";
  
      this.setState({
       fieldOfWork: profile.fieldOfWork,
       address: profile.organization.address,
       email : profile.organization.email,
       phone : profile.organization.phone,
       twitter: profile.twitter,
        facebook: profile.facebook,
        linkedin: profile.linkedin,
        youtube: profile.youtube,
        instagram: profile.instagram
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const partnerData = {
      fieldOfWork: this.state.fieldOfWork,
      address: this.state.address,
      email : this.state.email,
      phone : this.state.phone,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };
    if (partnerData.name == "") {
      delete partnerData.fieldOfWork;
    }
    if (partnerData.email == "") {
      delete partnerData.email;
    }
    if (partnerData.phone == "") {
      delete partnerData.phone;
    }
    if(partnerData.address == ""){
      delete partnerData.address;
    }
    if (partnerData.twitter == "") {
      delete partnerData.twitter;
    }
    if (partnerData.youtube == "") {
      delete partnerData.youtube;
    }
    if (partnerData.facebook == "") {
      delete partnerData.facebook;
    }
    if (partnerData.instagram == "") {
      delete partnerData.instagram;
    }
    if (partnerData.linkedin == "") {
      delete partnerData.linkedin;
    }
    this.props.editPartner(partnerData, this.props.history,);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Edit parnter Profile</h1>
              <p className="lead text-center">
              </p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={
                    errors.error == '"name" is required'
                      ? errors.error
                      : errors.error == '"name" is not allowed to be empty'
                      ? errors.error
                      : errors.error ==
                        '"name" length must be at least 3 characters long'
                      ? errors.error
                      : null
                  }
                />
                <TextFieldGroup
                  placeholder="fieldOfWork"
                  name="fieldofwork"
                  value={this.state.fieldOfWork}
                  onChange={this.onChange}
                  error={
                    errors.error == '"fieldOfWork" is required'
                      ? errors.error
                      : errors.error == '"fieldOfWork" is not allowed to be empty'
                      ? errors.error
                      : errors.error ==
                        '"fieldOfWork" length must be at least 3 characters long'
                      ? errors.error
                      : null
                  }
                />
                <TextFieldGroup
                  placeholder="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={
                    errors.error == '"email" is required'
                      ? errors.error
                      : errors.error == '"email" is not allowed to be empty'
                      ? errors.error
                      : errors.error ==
                        '"email" length must be at least 3 characters long'
                      ? errors.error
                      : null
                  }
                />
                <TextFieldGroup
                  placeholder="phone"
                  name="phone"
                  value={this.state.phone}
                  onChange={this.onChange}
                  error={
                    errors.error == '"phone" is required'
                      ? errors.error
                      : errors.error == '"phone" is not allowed to be empty'
                      ? errors.error
                      : errors.error ==
                        '"phone" length must be at least 3 characters long'
                      ? errors.error
                      : null
                  }
                />
                <TextFieldGroup
                placeholder="address"
                name="address"
                value={this.state.address}
                onChange={this.onChange}
                error={
                  errors.error == '"address" is required'
                    ? errors.error
                    : errors.error == '"address" is not allowed to be empty'
                    ? errors.error
                    : errors.error ==
                      '"address" length must be at least 3 characters long'
                    ? errors.error
                    : null
                }
              />
              <TextFieldGroupIcon
                    placeholder="Twitter Profile URL"
                    name="twitter"
                    icon="fab fa-twitter"
                    value={this.state.twitter}
                    onChange={this.onChange}
                    error={
                      errors.error == '"twitter" is not allowed to be empty'
                        ? errors.error
                        : errors.error == '"twitter" must be a valid uri'
                        ? errors.error
                        : null
                    }
                  />

                  <TextFieldGroupIcon
                    placeholder="Facebook Profile URL"
                    name="facebook"
                    icon="fab fa-facebook"
                    value={this.state.facebook}
                    onChange={this.onChange}
                    error={
                      errors.error == '"facebook" is not allowed to be empty'
                        ? errors.error
                        : errors.error == '"facebook" must be a valid uri'
                        ? errors.error
                        : null
                    }
                  />

                  <TextFieldGroupIcon
                    placeholder="Linkedin Profile URL"
                    name="linkedin"
                    icon="fab fa-linkedin"
                    value={this.state.linkedin}
                    onChange={this.onChange}
                    error={
                      errors.error == '"linkedin" is not allowed to be empty'
                        ? errors.error
                        : errors.error == '"linkedin" must be a valid uri'
                        ? errors.error
                        : null
                    }
                  />

                  <TextFieldGroupIcon
                    placeholder="YouTube Channel URL"
                    name="youtube"
                    icon="fab fa-youtube"
                    value={this.state.youtube}
                    onChange={this.onChange}
                    error={
                      errors.error == '"youtube" is not allowed to be empty'
                        ? errors.error
                        : errors.error == '"youtube" must be a valid uri'
                        ? errors.error
                        : null
                    }
                  />

                  <TextFieldGroupIcon
                    placeholder="Instagram Profile URL"
                    name="instagram"
                    icon="fab fa-instagram"
                    value={this.state.instagram}
                    onChange={this.onChange}
                    error={
                      errors.error == '"instagram" is not allowed to be empty'
                        ? errors.error
                        : errors.error == '"instagram" must be a valid uri'
                        ? errors.error
                        : null
                    }
                  />
                
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditPartner.propTypes = {
  editPartner: PropTypes.func.isRequired,
  getCurrentPartner: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.partner,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { editPartner, getCurrentPartner }
)(withRouter(EditPartner));
