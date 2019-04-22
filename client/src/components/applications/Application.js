import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getApplication } from "../../actions/applicationActions";
import Spinner from "../common/Spinner";

class Application extends Component {
  componentDidMount() {
    const { id }= this.props.match.params;
    this.props.getApplication(id);
  }
  onChange(e) {
    this.props.application.needConsultancy = !this.props.application.needConsultancy
  }
  render() {
    let applicationContent;

    if (this.props.application == null) {
      applicationContent = <Spinner />;
    } else {
      const {
        partner,
        description,
        applicants,
        messages,
        needConsultancy,
        reviewed
      } = this.props.application;

      const apps = this.props.application.applicants.map((app, index) => (
        <div key={index} className="p-3">
          <i className="fa fa-check" /> {app}
        </div>
      ));

      applicationContent = (
        <div className="row">
          <div className="col-md-12">
            <div className="card card-body bg-light mb-3">
              <h3 className="text-center text-info">Details</h3>
              <p className="lead">
                <i className="fa fa-check" /> <strong>Partner name: </strong>
                <span>{partner.organization.name} </span>
                <br />
                <i className="fa fa-check" />{" "}
                <strong>Needs Consultancy: </strong>
                <span>{needConsultancy ? "Yes" : "No"} </span>
                <br />
                <i className="fa fa-check" /> <strong>Reviewed: </strong>
                <span>{reviewed ? "Yes" : "No"} </span>
                <br />
              </p>
              <hr />
              <h3 className="text-center text-info">Description</h3>
              <div className="row">
                <div className="d-flex flex-wrap justify-content-center align-items-center">
                  {description}
                </div>
              </div>
              <hr />
              <h3 className="text-center text-info">Applicants</h3>
              <div className="row">
                <div className="d-flex flex-wrap justify-content-center align-items-center">
                  {apps}
                </div>
                
                <input
                    type="checkbox"
                    class="custom-control-input"
                    id="1"
                    value={this.state.needConsultancy}
                    onChange={this.onChange}
                  >
                    <label class="custom-control-label" for="defaultUnchecked">
                      Need needConsultancy?:
                    </label>
                  </input>
                 
              
              </div>
            </div>
          </div>
        </div>
      );
    }
    return <div>{applicationContent}</div>;
  }
}

Application.propTypes = {
  getApplication: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  application: state.application.application
});

export default connect(
  mapStateToProps,
  { getApplication }
)(Application);
