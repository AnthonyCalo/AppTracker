import React, {useState, useEffect} from 'react'
import "./Stats.css";

const Stats=(props)=>{
    console.log(props.jobs)
    const [interviews, setInterviews]= useState(0);
    const [offers, setOffers]= useState(0);
    useEffect(()=>{
        setInterviews(0);
    },[])
    var total_apps = props.jobs.length
    const getBoolStats=()=>{
        console.log("here")
        props.jobs.forEach(job=>{
            if(job.interview===true){
                setInterviews(prev=>{
                    return ( prev+1)
                } );
            }
        })
    }
    useEffect(()=>{
        getBoolStats();
    }, [props.jobs]);
    return ( 
        <div className="statsDash">
        <h1>DashBoard</h1>
            <div className="dashStats">
                <div className="indivStat">
                    <h1>{total_apps}</h1>
                    <h2>Total Apps</h2>
                </div>
                <div className="indivStat">
                <h1>{interviews}</h1>
                <h2>Interviews</h2>
                </div>
            </div>
        </div>
    )
}

export default Stats;