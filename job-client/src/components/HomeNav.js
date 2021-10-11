import "./HomeNav.css";
import {Link} from "react-router-dom";
import {useState, useEffect} from 'react';
import axios from "axios";

const HomeNavBar = (props) => {
    const [user, setUser]= useState("")
    
    const signOut = ()=>{
        //simple logout
        fetch("https://job-app-tracker-calo.herokuapp.com/logout",{
            method: "GET",
            withCredentials: true,
            headers: {
                "Content-Type": 'application/json',
                'Access-Control-Allow-Origin': 'https://job-app-tracker-calo.herokuapp.com/'
            }
        }).then(response=>{
            //reload the page to call a use effect that will register signout
            window.location.reload();
        })
    }
    const renderHome=()=>{
        if(props.signedIn){
            return ( 
                <header className='navbar'>
                    <div className='navbar__title navbar__item'><Link to="/">Free Job Tracker</Link></div>
                    <div className='navbar__item'><Link to="/dashboard" id="dashLink">{user} DashBoard</Link></div>
                    <div className='navbar__item'><Link onClick={signOut}>Logout</Link></div>        

                </header>
            )
        }else{
            return ( 
                <header className='navbar'>
                    <div className='navbar__title navbar__item'><Link to="/">Free Job Tracker</Link></div>
                    <div className='navbar__item'><Link to="/login">SignIn/ Register</Link></div>        
                </header>
            )
        }
    }
    return (
    <div>
        {renderHome()} 
    </div>
    )
    };

export default HomeNavBar;