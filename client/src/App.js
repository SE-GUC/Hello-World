import React, { Component } from "react";
import "./App.css";
import axios from 'axios' 
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";
import EducationalOrganizationProfile from "./components/EducationalOrganizationProfile";

class App extends Component {
 /*state ={
   EOProfiles: [
     {
    id:1,
    title:"no"
   },
   {
    id:2,
    title:"noo"
   },
   {
    id:3,
    title:"nooo"
   },
   {
    id:4,
    title:"noooo"
   }
  ]
 }*/
 
 componentDidMount(){
  axios.get('http://localhost:5000/api/profiles/education/courses/5c9f6fc00e57b6046a44987f').then(res => console.log(res.data))
 }

  render() {
    return (
      <div className="koko" >
        <h1>koko</h1> 
      </div>
    );
  }
}

export default App;
