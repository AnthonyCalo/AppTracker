import React, {useState, useEffect} from 'react';
import "./HomeContainer.css";
import { Link } from 'react-router-dom';
import axios from "axios"


const HomeContainer=()=>{
    const [authed, setAuthed] = useState(false);
    useEffect(()=>{
        const checkSignIn=()=>{
            axios.get("http://localhost:3001/signedin",{
                withCredentials: true,
                headers: {
                    "Content-Type": 'application/json'
                }
            }).then(response=>{
                //respons.data ===false when not signed in 
                if(response.data===false){
                    console.log("here")
                    return(false);
                }else{
                    console.log(response.data)
                    setAuthed(true);
                }
            })
        }
        checkSignIn();
    }, [])
    const renderHome=()=>{
        if(authed){
            return( 
                <h1>SIGNED IN</h1>
            )
        }else{
            return( 
                <h1>NOT SIGNED IN</h1>
            )
        }
    }
    return ( 
        <div className="homeContainer">
            <div className="section1">
                <h1 className="homeSubTitle">Job Application Tracking</h1>
                <p>Simple online application tracking software. Utilize to view statistics and track applications</p>

                <Link to="/login"><button className="getStartedBtn">Click here to Signin/ Register</button></Link>

                {renderHome()}
                <img src="/images/placeholderImg.PNG" className="homeScreenshotImg"></img>

            </div>
            <div className="section2">
            <h1>View data in your dashboard</h1>
            <p>Track response data interviews</p>
            <p>Dashboard shows you percentage of applications that recieve hits. Lets you know how often interviews convert to an offer</p>
            <img src="/images/dashboardPH.PNG" className="dashBoardImg"></img>
            </div>
            <div className="section3">
            <h1>Easy to update and insert data</h1>
            <img src="/images/dashboardPH.PNG" className="dashBoardImg"></img>
            <h1>Secure password protected</h1>
            </div>
            
            
            
        </div>
    )
}
export default HomeContainer;
