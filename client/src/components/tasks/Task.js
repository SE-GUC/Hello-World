import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getTask } from "../../actions/taskActions";
import Spinner from "../common/Spinner";

class Task extends Component {
  componentDidMount() {
    const { id, taskID } = this.props.match.params;
    this.props.getTask(id, taskID);
  }
  render() {
    let taskContent;

    if (this.props.task === null) {
      taskContent = <Spinner />;
    } else {
      const {
        application,
        levelOfCommitment,
        experienceLevel,
        skills,
        monetaryCompensation,
        reviewed,
        applicants,
        extra
      } = this.props.task;

      const theSkills = skills.map((skill, index) => (
        <div key={index} className="p-3">
          <i className="fa fa-check" /> {skill}
        </div>
      ));
      const exs = extra.map((x, index) => (
        <div key={index} className="p-3">
          <i className="fa fa-check" /> {x}
        </div>
      ));

      taskContent = (
        <div className="row">
          <div className="col-md-12">
            <div className="card card-body bg-light mb-3">
              <h3 className="text-center text-info">Details</h3>
              <p className="lead">
                <i className="fa fa-check" />{" "}
                <strong>Level Of Commitment: </strong>
                <span>{levelOfCommitment} </span>
                <br />
                <i className="fa fa-check" />{" "}
                <strong>Monetary Compensation: </strong>
                <span>{monetaryCompensation} </span>
                <br />
                <i className="fa fa-check" />{" "}
                <strong>Experience Level: </strong>
                <span>{experienceLevel} </span>
                <br />
                <i className="fa fa-check" /> <strong>Reviewed: </strong>
                <span>{reviewed ? "Yes" : "No"} </span>
                <br />
              </p>
              <hr />
              <h3 className="text-center text-info">Skills</h3>
              <div className="row">
                <div className="d-flex flex-wrap justify-content-center align-items-center">
                  {theSkills}
                </div>
              </div>
              <hr />
              <h3 className="text-center text-info">Extra Attributes</h3>
              <div className="row">
                <div className="d-flex flex-wrap justify-content-center align-items-center">
                  {exs}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return <div>{taskContent}</div>;
  }
}

Task.propTypes = {
  getTask: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  task: state.task.profile
});

export default connect(
  mapStateToProps,
  { getTask }
)(Task);
