import {BrowserRouter as Router,Switch, Link,Route} from 'react-router-dom';
import JobPost from "./components/NewJobApp";
import HomeNavBar from "./components/HomeNav";
import HomeContainer from "./components/HomeContainer";
import Login from './components/Login';
import EditApp from "./components/EditApp";
import Dashboard from "./components/DashBoard";
const App =()=>{
    
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
            <HomeNavBar />
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
            <Route exact path="/dashboard">
                <Dashboard />
            </Route>
            <Route path="/jobs/:id">
                <EditApp />
            </Route>
            </Switch>
        </Router>
        
    )
}


export default App;


