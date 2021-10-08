import React, {useState, useEffect} from 'react';
import "./HomeContainer.css";
import { Link } from 'react-router-dom';
import axios from "axios"


const HomeContainer=()=>{

    return ( 
        <div className="homeContainer">
            <div className="section1">
                <h1 className="homeSubTitle">Job Application Tracking</h1>
                <p>Simple online application tracking software. Analyze application data with personalized dashboard</p>

                <Link to="/login"><button className="getStartedBtn">Click here to Signin/ Register</button></Link>
                <br/>


            </div>
           
            
            
            
        </div>
    )
}
export default HomeContainer;
