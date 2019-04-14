import React, { Component } from 'react'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextFieldGroupIcon from "../common/TextFieldGroupIcon"; 
import { postTask } from "../../actions/taskActions"

 class TaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {

        application: "",
        levelOfCommitment:"",
        monetaryCompensation:"",
        experienceLevel:"",
        skills:""

        };
    
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
      }
      componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({ errors: nextProps.errors });
        }
      }
    
    onSubmit(e) {
        e.preventDefault();
    
        const taskData = {

         application: this.state.application,
         levelOfCommitment : this.state.levelOfCommitment,
         monetaryCompensation : this.state.monetaryCompensation,
         experienceLevel : this.state.experienceLevel,
         skills: this.state.skills
        
        };
        this.props.postTask(taskData, this.props.history);
    }
        onChange(e) {
            this.setState({ [e.target.name]: e.target.value });
          }
    

  render() {
    return (
     
        <div className="create-task">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create task </h1>
              <p className="lead text-center">tell us about the task</p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* application ID"
                  name="application"
                  value={this.state.application}
                  onChange={this.onChange}
                //   error={
                //     errors.error == '"application" is required'
                //       ? errors.error
                //       : errors.error == '"application" is not allowed to be empty'
                //       ? errors.error
                //       : null
                //   }
                />
                <TextFieldGroup
                  placeholder="* levelOfCommitment"
                  name="levelOfCommitment"
                  value={this.state.levelOfCommitment}
                  onChange={this.onChange}
                //   error={
                //     errors.error == '"age" must be a number'
                //       ? errors.error
                //       : null
                //   }
                />
                <TextFieldGroup
                  placeholder="* monetaryCompensation"
                  name="monetaryCompensation"
                  value={this.state.monetaryCompensation}
                  onChange={this.onChange}
                //   error={
                //     errors.error == '"phone" must be a number'
                //       ? errors.error
                //       : null
                //   }
                />
                <TextFieldGroup
                  placeholder="* experienceLevel"
                  name="experienceLevel"
                  value={this.state.experienceLevel}
                  onChange={this.onChange}
                //   error={
                //     errors.error == '"email" is not allowed to be empty'
                //       ? errors.error
                //       : errors.error == '"email" must be a valid email'
                //       ? errors.error
                //       : null
                //   }
                />
                <TextFieldGroup
                  placeholder="* Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                //   error={
                //     errors.error == '"skills" is not allowed to be empty'
                //       ? errors.error
                //       : null
                //   }
                  info="Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP)"
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
    )
  }
}
TaskForm.propTypes = {
    task: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    task: state.task,
    errors: state.errors
  });
  
  export default connect(
    mapStateToProps,
    { postTask }
  )(withRouter(TaskForm));