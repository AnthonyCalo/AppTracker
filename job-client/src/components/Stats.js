import React, {useState, useEffect} from 'react'
import "./Stats.css";
import Chart from "react-google-charts";

const Stats=(props)=>{
    console.log(props.jobs)
    const [interviews, setInterviews]= useState(0);
    const [offers, setOffers]= useState(0);
    const [open, setOpen]=useState(0);
    useEffect(()=>{
        setInterviews(0);
        setOffers(0);
        setOpen(0);

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
    useEffect(()=>{
        getBoolStats();
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
                    <div className="expandBtn">
                        <span onClick={()=>{expandClick()}}>Expand</span>
                    </div>
                </div>
                <h1>EXPANDED</h1>
            </div>
                <div className="charts_div">
                <Chart
                    width={600}
                    height={400}
                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                        ['Task', 'Hours per Day'],
                            ['Interviews',  interviews],
                            ['Offers', offers],
                            ['Rejections', total_apps-(interviews+open)],
                            ['Waiting', open]
                    ]}
                    options={{
                    title: 'Interviews vs Offers',
                    chartArea: { width: '50%' }
                    }}
                    legendToggle
                />
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