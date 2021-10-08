import axios from 'axios';
import React, {useState} from 'react';
import "./formApp.css"

const JobPost=()=>{
    const handleSubmit=(event)=>{
        console.log("HERE SUBMITTED FORM")
        event.preventDefault();
        let payload = {
            company: company,
            date: date,
            jobTitle: jobTitle,
            notes: notes,
            offer: offer,
            phoneScreen: phone,
            interview: interview,
            open: open
        }
        console.log(payload);
        axios("http://localhost:3001/job-app",{
            method: "POST",
            data: payload,
            withCredentials: true,
            headers: {
                "Content-Type": 'application/json'
            }
        });
        document.getElementById("dashLink").click();
    }
    const [company, setCompany] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [date, setDate] = useState(new Date());
    const [notes, setNotes] = useState("");
    const [interview, setInterview] = useState(false);
    const [phone, setPhone] = useState(false);
    const [offer, setOffer] = useState(false);
    const [open, setOpen] = useState(true);
    
    const getTrueFalse=(bool)=>{
        if(bool==='true'){
            return(true);
        }else{
            return(false);
        }
    }

    const setBool=(category ,bool)=>{
        if(category==="interview"){
            setInterview(getTrueFalse(bool));
        }else if(category==="phone"){
            setPhone(getTrueFalse(bool));
        }else if(category==="open"){
            setOpen(getTrueFalse(bool));
        }else if(category==="offer"){
            setOffer(getTrueFalse(bool));
        }
    }
    return ( 
        <div className="newJobFormDiv">
            <div className="formDiv">
            <div class="innerForm">
                <h2 className="formTitle">Create New Job</h2>
                <hr/>
                <form>
                <label for="field1"><span>Company Name<span class="required">*</span></span>
                    <input 
                        type="text"
                        class="input-field"
                        name="field1"
                        value={company}
                        onChange={(e)=>{setCompany(e.target.value)}} /></label>
                <label for="field2">
                    <span>Job Title <span class="required">*</span></span>
                    <input 
                        type="text" 
                        class="input-field" 
                        name="field2"
                        value={jobTitle}
                        onChange={(e)=>setJobTitle(e.target.value)} />
                </label>
                <label for="field3"><span>Date <span class="required">*</span></span>
                    <input 
                        type="text"
                        class="input-field"
                        name="date" 
                        type='date'
                        value={date}
                        onChange={(e)=>setDate(e.target.value)} />
                </label>
                <div className="fourBools"> 
                    <label for="field4"><span>Interview</span>
                        <select name="field4" value={interview} onChange={(e)=>setBool("interview" ,e.target.value)} class="select-field">
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </label>
                    <label for="field5"><span>Phone Screen</span>
                        <select name="field5" value={phone} onChange={(e)=>setBool("phone", e.target.value)} class="select-field">
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </label>
                    <label for="field6"><span>Offer</span>
                        <select name="field6" value={offer} onChange={(e)=>setBool("offer",e.target.value)} class="select-field">
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </label>
                </div>
                <label for="field6"><span>Open</span>
                    <select name="field6" value={open} onChange={(e)=>setBool("open",e.target.value)} class="select-field">
                        <option value="true">Open</option>
                        <option value="false">Closed</option>
                    </select>
                </label>
                <label for="field7"><span>Notes</span>
                    <textarea 
                        name="field7" 
                        class="textarea-field" 
                        value={notes} 
                        onChange={(e)=>{setNotes(e.target.value)}}
                    ></textarea>
                </label>
                <div className="buttonDiv">
                <button onClick={handleSubmit} className="submitBtn ">Submit</button>
                <button onClick={()=>{document.getElementById("dashLink").click()}} className="submitBtn cancelBtn">Discard</button>
                </div>

            </form>
            </div>
            </div>
        </div>
    )
}

export default JobPost;