import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";
import Member from "./components/profiles/Member";
import Partner from "./components/profiles/Partner";
import Masterclass from "./components/profiles/Masterclass";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
            <Route exact path="/api/profiles/partner/:id" component={Partner}/> 
              <Route exact path="/api/profiles/member/:id" component={Member} />
              <Route exact path="/api/masterclasses/all/:id" component={Masterclass} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
