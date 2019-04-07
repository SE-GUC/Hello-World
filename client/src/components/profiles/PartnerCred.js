import React, { Component } from "react";
import Moment from "react-moment";

export default class PartnerCred extends Component {
  render() {
    const {
      pastEvents,
      pastProjects,
      feedback
    } = this.props.profile;

    const events = pastEvents.map(e => (
      <li key={e._id} className="list-group-item">
        <h4 className="text-center">{e.title}</h4>
        <p>
          {e.location === "" ? null : (
            <span>
              <strong>Location: </strong> {e.location}
            </span>
          )}
        </p>
        <p>
          {e.description === "" ? null : (
            <span>
              <strong>Description: </strong> {e.description}
            </span>
          )}
        </p>
      </li>
    ));

    const tasks = pastProjects.map(task => (
        <li key={task._id} className="list-group-item">
          <h4 className="text-center">Task Details</h4>
          <p>
            <strong>Monetary Compensation:</strong>{" "}
            {task.task.monetaryCompensation}
          </p>
          <p>
            <strong>Experience Level:</strong> {task.task.experienceLevel}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            <Moment format="DD/MM/YYYY">{task.task.date}</Moment>
          </p>
        </li>
      ));
    const feedbk = feedback.map(feedback => (
      <li key={feedback._id} className="list-group-item">
        <h4 className="text-center">{feedback.Member.name}</h4>
        <p>
          {feedback.review === "" ? null : (
            <span>
              <strong>review: </strong>{" "}
              {feedback.review}
            </span>
          )}
        </p>
      </li>
    ));
    
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-6">
            <h3 className="text-center text-info">Past Events</h3>
            {events.length > 0 ? (
              <ul className="list-group">{events}</ul>
            ) : (
              <p className="text-center">No Past Events Listed</p>
            )}
          </div>
          <div className="col-md-6">
            <h3 className="text-center text-info">Tasks Completed</h3>
            {tasks.length > 0 ? (
              <ul className="list-group">{tasks}</ul>
            ) : (
              <p className="text-center">No Tasks Listed</p>
            )}
          </div>
          <div className="col-md-6">
            <h3 className="text-center text-info">Feed-back</h3>
            {tasks.length > 0 ? (
              <ul className="list-group">{feedbk}</ul>
            ) : (
              <p className="text-center">No feed-backs Listed</p>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
