import "./HomeNav.css";
import {Link} from "react-router-dom";
import {useState, useEffect} from 'react';
import axios from "axios";

const HomeNavBar = () => {
    const [signedIn, setSignIn] = useState(false);
    const [user, setUser]= useState("")
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
                    console.log("here");
                    setSignIn(false);
                }else{
                    setUser(response.data.username)
                    setSignIn(true);
                }
            })
        }
        checkSignIn();
    }, []);
    const renderHome=()=>{
        if(signedIn){
            return ( 
                <header className='navbar'>
                    <div className='navbar__title navbar__item'><Link to="/">Free Job Tracker</Link></div>
                    <div className='navbar__item'><Link to="/new-job">New App</Link></div>        
                    <div className='navbar__item'><Link to="/dashboard" id="dashLink">{user}'s DashBoard</Link></div>        
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