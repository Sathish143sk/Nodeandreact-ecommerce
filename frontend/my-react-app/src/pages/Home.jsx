import React from 'react'
import "./Home.css";
import HomreNavbar from "../componets/Homepage/HomeNavbar"
import Herosection from "../componets/Homepage/Herosection"
import Categroysection from "../componets/Homepage/HomeCategory"
const Home = () => {
  return (
    <div className="full-page-condent">
        <div id='page-navbar'><HomreNavbar /></div>
        <div className="page-content">
        <div><Herosection /></div>
        <div><Categroysection /></div>
        <div><Categroysection /></div>
        <div><Categroysection /></div>
      </div> 
    </div>
  )
}

export default Home