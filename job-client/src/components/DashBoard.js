import React, {useState, useEffect} from 'react';
import axios from "axios";
import "./Dashboard.css"
import {Link} from "react-router-dom";
import Stats from "./Stats";
import Filter from './Filter';

const Dashboard=()=>{
//UseState Hooks_____________________________________________________________________________________
    const [jobs, setJobs] = useState([]);
    const [sortProperty, setProperty]=useState('date');
    const [openFilter, setOpenFilter]=useState('both');
    
//Sub Functions_____________________________________________________________________________________
    function sortByProperty(property){  
        return function(a,b){  
        if(a[property] > b[property])  
            return 1;  
        else if(a[property] < b[property])  
            return -1;  
    
        return 0;  
        }  
    }
    const getUserJobs=()=>{
        axios.get("http://localhost:3001/user-jobs",{
            withCredentials: true,
            headers: {
                "Content-Type": 'application/json'
            }
        }).then(response=>{
            //reload the page to call a use effect that will register signout
            setJobs(response.data);
        })
    }
    const openFilterFunction=(filterObject)=>{
        console.log(filterObject);
        setOpenFilter(filterObject)
    }
    //
    const filterHandleSort=(value)=>{
        console.log('called');
        setProperty(value);
    }
//useEffect Hooks_________________________________________________________________________________________________
    useEffect(()=>{
        getUserJobs()
    }, [])
    useEffect(()=>{
        let companyHeader = document.getElementById("compHeader");
        let jobHeader = document.getElementById("jobTitleHeader");
        let dateHeader = document.getElementById("dateHeader");
        if(sortProperty==='company'){
            companyHeader.innerHTML="Company&#9660;"
            jobHeader.innerHTML="Job Title";
            dateHeader.innerHTML="Date"
        }else if (sortProperty==="jobTitle"){
            companyHeader.innerHTML="Company"
            jobHeader.innerHTML="Job Title&#9660;";
            dateHeader.innerHTML="Date"
        }else if (sortProperty==="date"){
            companyHeader.innerHTML="Company"
            jobHeader.innerHTML="Job Title";
            dateHeader.innerHTML="Date&#9660;"
        }
    }, [sortProperty])
//renderFunctions_______________________________________________________________________   
    const renderJobs=(sortBy)=>{
        
        function numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        let jobsList=( 
            <div></div>
        )
        
        const renderTF=(item)=>{
            if(item===true){
                return("Open");
            }else{
                return("Closed");
            }
        }
        if(jobs){
            jobs.sort(sortByProperty(sortBy));
            let counter=0;
            jobsList = jobs.map(job=>{
                switch(openFilter){
                    case "both":
                        if(counter%2===0 || counter===0){
                            counter++;
                            return(
                                <tr>
                                    <td> <Link to={`/jobs/${job._id}`}>{job.company}</Link></td>
                                    <td>{job.jobTitle}</td>
                                    <td>{job.date.slice(0,10)}</td>
                                    <td>{renderTF(job.open)}</td>
                                    <td><Link to={`/jobs/${job._id}`}>Edit</Link></td>
                                </tr> 
                                    
                            )
                        }else{
                            counter++;
                            return(
                                <tr className="darkRow">
                                    <td><Link to={`/jobs/${job._id}`}>{job.company}</Link></td>
                                    <td>{job.jobTitle}</td>
                                    <td>{job.date.slice(0,10)}</td>
                                    <td>{renderTF(job.open)}</td>
                                    <td><Link to={`/jobs/${job._id}`}>Edit</Link></td>
                                </tr> 
                                    
                            )
                        }
                    case "closed":
                        if(job.open===false){
                            console.log(job);
                            if(counter%2===0 || counter===0){
                                counter++;
                                return(
                                    <tr>
                                        <td> <Link to={`/jobs/${job._id}`}>{job.company}</Link></td>
                                        <td>{job.jobTitle}</td>
                                        <td>{job.date.slice(0,10)}</td>
                                        <td>{renderTF(job.open)}</td>
                                        <td><Link to={`/jobs/${job._id}`}>Edit</Link></td>
                                    </tr> 
                                        
                                )
                            }else{
                                counter++;
                                return(
                                    <tr className="darkRow">
                                        <td><Link to={`/jobs/${job._id}`}>{job.company}</Link></td>
                                        <td>{job.jobTitle}</td>
                                        <td>{job.date.slice(0,10)}</td>
                                        <td>{renderTF(job.open)}</td>
                                        <td><Link to={`/jobs/${job._id}`}>Edit</Link></td>
                                    </tr> 
                                        
                                )
                            }
                            }else{
                                return;
                            }
                    case "open":
                        if(job.open===true){
                            console.log(job);
                            if(counter%2===0 || counter===0){
                                counter++;
                                return(
                                    <tr>
                                        <td> <Link to={`/jobs/${job._id}`}>{job.company}</Link></td>
                                        <td>{job.jobTitle}</td>
                                        <td>{job.date.slice(0,10)}</td>
                                        <td>{renderTF(job.open)}</td>
                                        <td><Link to={`/jobs/${job._id}`}>Edit</Link></td>
                                    </tr> 
                                        
                                )
                            }else{
                                counter++;
                                return(
                                    <tr className="darkRow">
                                        <td><Link to={`/jobs/${job._id}`}>{job.company}</Link></td>
                                        <td>{job.jobTitle}</td>
                                        <td>{job.date.slice(0,10)}</td>
                                        <td>{renderTF(job.open)}</td>
                                        <td><Link to={`/jobs/${job._id}`}>Edit</Link></td>
                                    </tr> 
                                        
                                )
                            }
                        }else{
                            return;
                            }
                    default:
                        return    
                            
                    }
                    
                
                
            })
            return jobsList;
        }
        
        return (
            <div>
                no jobs
            </div>
        );
    }
    return ( 
        <div className="dashContainer">
            <Stats jobs={jobs} />
            <hr />
            <Link to="/new-job"><button className="createBtn"><span className="plus">&#43;</span>Create New</button></Link>
        <div className="filterTableDiv">
            <Filter openFilterFunction={openFilterFunction} filterHandleSort={filterHandleSort} sortProps={sortProperty}/>
            <div class="tableFixHead">
            <table>
            <thead>
            <tr>
                <th className="sortableHeader" id="compHeader" onClick={(e)=>setProperty('company')}>Company&#9660;</th>
                <th className="sortableHeader" id="jobTitleHeader" onClick={(e)=>setProperty('jobTitle')}>Job Title</th>
                <th className="sortableHeader" id="dateHeader" onClick={(e)=>setProperty('date')}>Date</th>
                <th>Open</th>
                <th>Edit</th>
            </tr>
            </thead>
            <tbody>
            {renderJobs(sortProperty)}
            </tbody>
        </table>
        </div>
      </div>

            
        </div>
    )
}

export default Dashboard;

