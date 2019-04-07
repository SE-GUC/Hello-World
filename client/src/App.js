import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";
import axios from 'axios' 
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";

import Member from "./components/profiles/Member";
import Partner from "./components/profiles/Partner";
import Consultant from "./components/profiles/Consultant";
import Application from "./components/applications/Application";
import Task from "./components/tasks/Task";


class App extends Component {
 componentDidMount(){
  axios.get('http://localhost:5000/api/profiles/education/courses/5c9f6fc00e57b6046a44987f').then(res => console.log(res.data))
 }

  render() {
    return (

      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/api/profiles/member/:id" component={Member} />
              <Route
                exact
                path="/api/profiles/partner/:id"
                component={Partner}
              />
              <Route
                exact
                path="/api/profiles/consultant/:id"
                component={Consultant}
              />
              <Route
                exact
                path="/api/applications/admin/:id/:appID"
                component={Application}
              />
              <Route
                exact
                path="/api/applications/consultant/:id/:appID"
                component={Application}
              />
              <Route
                exact
                path="/api/tasks/admin/:id/:taskID"
                component={Task}
              />
              <Route
                exact
                path="/api/tasks/member/:id/:taskID"
                component={Task}
              />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>

    );
  }
}

export default App;
