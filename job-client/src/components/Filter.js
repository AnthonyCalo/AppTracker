import "./Filter.css";
import {useState, useEffect} from 'react';

const Filter=(props)=>{
    const [open, setOpen]=useState(true);
    const [closed, setClosed]=useState(true);
    const [sortProperty, setProperty]=useState('company');

    const handleSortPropertyChange=(value)=>{
        setProperty(value);
        props.filterHandleSort(value);
    }
    useEffect(()=>{
        if(props.sortProps){
            setProperty(props.sortProps)
        }
    }, [props.sortProps])
    

    const handleChange=(value)=>{
        if(value==="open"){
            if(open&&closed){
                setOpen(!open);
                props.openFilterFunction('closed')
            }else if(open){
                setOpen(!open)
                props.openFilterFunction('neither')
            }else if(closed){
                setOpen(!open);
                props.openFilterFunction('both')
            }else{
                setOpen(!open);
                props.openFilterFunction('open')
            }
        }else{
            if(open&&closed){
                setClosed(!closed);
                props.openFilterFunction('open')
            }else if(closed){
                setClosed(!closed)
                props.openFilterFunction('neither')
            }else if(open){
                setClosed(!closed);
                props.openFilterFunction('both')
            }else{
                setClosed(!closed);
                props.openFilterFunction('closed')
            }
        }
      
    }

    return( 
        <div className="filterDiv">
        <h2>Filters</h2>
            <div className="filterTitle">
                <h3>Sort By</h3>
            </div>
            <select 
                name="sortPropertySelector"
                value={sortProperty} 
                className="sortByFilter"
                id="openSelector"
                onChange={(e)=>{handleSortPropertyChange(e.target.value)}}>
                <option value="company">Company</option>
                <option value="jobTitle">Job Title</option>
                <option value="date">Date</option>
            </select>
            <div className="filterTitle">
            <h3>Status</h3>
            </div>
            <div id="checkboxes">
                <label for="openFilter" className="openFilter">
                    <input type="checkbox"  id="openFilter" checked={open} onChange={(e)=>{handleChange(e.target.value)}} value="open"/>Open
                </label>
                <label for="two">
                    <input type="checkbox" id="closedFilter" checked={closed} value="closed" onChange={(e)=>{handleChange(e.target.value)}}/>Closed
                </label>
            </div>
        </div>
    )
}


export default Filter;

