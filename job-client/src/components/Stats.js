import React, {useState, useEffect} from 'react'
import "./Stats.css";
import Chart from "react-google-charts";

const Stats=(props)=>{
    const [interviews, setInterviews]= useState(0);
    const [offers, setOffers]= useState(0);
    const [open, setOpen]=useState(0);
    const [jobTypeStats, setJobTypeStats] = useState([]);
    useEffect(()=>{
        setInterviews(0);
        setOffers(0);
        setOpen(0);

    },[]);
    var total_apps = props.jobs.length
    const getBoolStats=()=>{
        
        props.jobs.forEach(job=>{
            
            if(job.interview===true){
                setInterviews(prev=>{
                    return ( prev+1)
                } );
            }
            if(job.offer===true){
                setOffers(prev=>{
                    return (prev+1)
                })
            }
            if(job.open===true){
                setOpen(prev=>{
                    return(prev+1)
                });
            }
        })
        
    }
    const getJobTypeStats=()=>{
        //getting data for chart
        //each counts the number of each job title
        let typeList={}
        props.jobs.forEach(job=>{
            if(typeList[job.jobTitle]===undefined){
                typeList[job.jobTitle]=1
            }else{
                typeList[job.jobTitle]+=1
            }
        })
        let typeKeys=Object.keys(typeList);
        let jobTypeStatsListFormat=[["job", "apps"]];
        
        typeKeys.forEach(key=>{
           jobTypeStatsListFormat.push([key, typeList[key]]);
        })
        setJobTypeStats(jobTypeStatsListFormat);
    }

    useEffect(()=>{
        getBoolStats();
        getJobTypeStats();
    }, [props.jobs]);
    const [expand, setExpand]=useState(false);
    const renderStatsPage=()=>{
        const expandClick=()=>{
            if (expand){
                setExpand(false);
            }else{
                setExpand(true);
            }
        }
        const options = {
            title: "Job Title's",
            is3D: true

          };
        if(!expand){
            return ( 
                <div className="statsDash">
                <h1>DashBoard</h1>
                    <div className="dashStats">
                        <div className="indivStat">
                            <h1>{total_apps}</h1>
                            <h2 className="statLabel_h2">Total Apps</h2>
                        </div>
                        <div className="indivStat">
                        <h1>{interviews}</h1>
                        <h2 className="statLabel_h2">Interviews</h2>
                        </div>
                        <div className="indivStat">
                        <h1>{open}</h1>
                        <h2 className="statLabel_h2">Open</h2>
                        </div>
                        <div className="indivStat">
                        <h1>{offers}</h1>
                        <h2 className="statLabel_h2">Offers</h2>
                        </div>
                        <div className="expandBtn">
                         <span onClick={()=>{expandClick()}}>Expand</span>
                        </div>
                    </div>

                </div>
            )
        }else{
            return ( 
            <>
            <div className="statsDash">
                <h1>DashBoard</h1>
                <div className="dashStats">
                    <div className="indivStat">
                        <h1>{total_apps}</h1>
                        <h2 className="statLabel_h2">Total Apps</h2>
                    </div>
                    <div className="indivStat">
                    <h1>{interviews}</h1>
                    <h2 className="statLabel_h2">Interviews</h2>
                    </div>
                    <div className="indivStat">
                    <h1>{open}</h1>
                    <h2 className="statLabel_h2">Open</h2>
                    </div>
                    <div className="indivStat">
                    <h1>{offers}</h1>
                    <h2 className="statLabel_h2">Offers</h2>
                    </div>
                    
                </div>
            </div>
                <div className="charts_div">
                    <div className="pieChart">
                        <Chart
                            width={500}
                            height={400}
                            chartType="ColumnChart"
                            loader={<div>Loading Chart</div>}
                            data={[
                                ['Status', 'Number of type', { role: "style" }],
                                    ['Rejections', total_apps-(offers+open), "color: red"],
                                    ['Interviews',  interviews, "color: blue"],
                                    ['Waiting', open, "color: yellow"],
                                    ['Offers', offers, "color: green"]
                            ]}
                            options={{
                            title: 'Interviews vs Offers',
                            chartArea: { width: '60%' },
                            }}
                            legendToggle
                        />
                    </div>
                    <div className="barChart">
                        <Chart
                            width={500}
                            height={400}
                            chartType="PieChart"
                            loader={<div>Loading Chart</div>}
                            data={
                                jobTypeStats
                            }
                            options={
                            options
                            }
                            legendToggle
                        />
                    </div>
                    <div className="shrinkBtn">
                    <span onClick={()=>{expandClick()}}>Shrink</span>
                </div>
                </div>
                
                </>
                
            )
        }
    }
    return ( 
        <>
        {renderStatsPage()}
        </>
    )
}

export default Stats;