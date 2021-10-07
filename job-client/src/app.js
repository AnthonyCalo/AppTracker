import {BrowserRouter as Router,Switch, Link,Route} from 'react-router-dom';
import JobPost from "./components/NewJobApp";
import HomeNavBar from "./components/HomeNav";
import HomeContainer from "./components/HomeContainer";
import Login from './components/Login';
import EditApp from "./components/EditApp";
import Dashboard from "./components/DashBoard";
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ProtectedRoute from './components/ProtectedRoute';

const App =()=>{
    const [auth, setAuth] = useState(false)
    const checkSignIn=()=>{
        console.log("called");
        axios.get("http://localhost:3001/signedin",{
            withCredentials: true,
            headers: {
                "Content-Type": 'application/json'
            }
        }).then(response=>{
            //respons.data ===false when not signed in 
            if(response.data===false){
                console.log("here");
                setAuth(false);
            }else{
                setAuth(true)
            }
        })
    }
    useEffect(()=>{
        checkSignIn();
    })
    // function sortByProperty(property){  
    //     return function(a,b){  
    //        if(a[property] > b[property])  
    //           return 1;  
    //        else if(a[property] < b[property])  
    //           return -1;  
       
    //        return 0;  
    //     }  
    //  }
    // console.log(itemsList.sort(sortByProperty('netWorth')))
    // function numberWithCommas(x) {
    //     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // }
    // const renderName=()=>{
    //     let sortedList = itemsList.sort(sortByProperty('id')).map(item=>{
    //         return ( 
    //             <li>{item.name}: ${numberWithCommas(item.netWorth)}</li>
    //         )
    //     })
    //     return sortedList;
    // } 

    return ( 
        <Router>
            <HomeNavBar signedIn={auth}/>
            <Switch>
            <Route exact path="/">
                    <HomeContainer />
            </Route>
            <Route exact path="/new-job">
                <JobPost />
            </Route>
            <Route exact path="/login">
                <Login />
            </Route>
            <ProtectedRoute exact path="/dashboard" component={Dashboard} isAuth={auth} />
            <ProtectedRoute exact path="/jobs/:id" component={EditApp} isAuth={auth} />
            </Switch>
        </Router>
        
    )
}


export default App;


