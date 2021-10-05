import axios from 'axios';
import { useParams } from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import "./editApp.css";

const EditApp=()=>{
    //useState hooks. Also form values
    const [company, setCompany] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [date, setDate] = useState(new Date());
    const [notes, setNotes] = useState("");
    const [interview, setInterview] = useState(false);
    const [phone, setPhone] = useState(false);
    const [reject, setRejection] = useState(false);
    const [offer, setOffer] = useState(false);
    const [open, setOpen] = useState(false);
    
    const params=useParams();

    const getJob= async()=>{
        console.log("function called")
        console.log(params.id);
        axios("http://localhost:3001/onejob",{
                method: "POST",
                data:{
                    jobId: params.id
                },
                withCredentials: true
            }).then(response=>{
            setCompany(response.data.company)
            console.log(response.data);
            setJobTitle(response.data.jobTitle);
            setDate(response.data.date.slice(0,10));
            setPhone(response.data.phoneScreen);
            setNotes(response.data.notes);
            setInterview(response.data.interview);
            setOpen(response.data.open);
            setRejection(response.data.reject);
            setOffer(response.data.offer);
        });
    }
    useEffect(()=>{
        getJob();
        function selectElement(id, valueToSelect) {    
            let element = document.getElementById(id);
            element.value = valueToSelect;
        }
        console.log(phone);
        if(phone==true){
            selectElement("phoneSelector", 'true');
        }
        if(interview==true){
            selectElement("interviewSelector", 'true');
        }
        if(offer==true){
            selectElement("offerSelector", "true")
        }
        console.log(open);
        if(open==true){
            console.log("openSelector")
            selectElement("openSelector", "true")
        }
        if(reject==true){
            console.log("its true")
            selectElement("rejectSelector", "true")
        }else{
            console.log("reject:", reject);
        }

        
    },[])
    const handleSubmit=(event)=>{
        console.log("HERE SUBMITTED FORM")
        event.preventDefault();
        let payload = {
            id: params.id,
            company: company,
            jobTitle: jobTitle,
            notes: notes,
            offer: offer,
            phone: phone,
            interview: interview,
            reject: reject,
            open: open

        }
        console.log(payload);
        axios("http://localhost:3001/update-job",{
            method: "POST",
            data: payload,
            withCredentials: true,
            headers: {
                "Content-Type": 'application/json'
            }
        });
        document.getElementById("dashLink").click();

    }
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
        }else if(category==="rejection"){
            setRejection(getTrueFalse(bool));
        }else if(category==="open"){
            setOpen(getTrueFalse(bool));
        }else if(category==="offer"){
            console.log("OFFER");
            console.log(bool);
            setOffer(getTrueFalse(bool));
        }
    }
    return ( 
        <div className="newJobFormDiv">
            <div className="formDiv">
            <div class="innerForm">
                <h2 className="formTitle">Update this Application</h2>
                <hr/>
                <form>
                <label for="field1"><span>Company Name</span>
                    <input 
                        type="text"
                        class="input-field"
                        name="field1"
                        value={company}
                        onChange={(e)=>{setCompany(e.target.value)}} /></label>
                <label for="field2">
                    <span>Job Title </span>
                    <input 
                        type="text" 
                        class="input-field" 
                        name="field2"
                        value={jobTitle}
                        onChange={(e)=>setJobTitle(e.target.value)} />
                </label>
                <label for="field3"><span>Date Applied</span>
                    <input 
                        type="text"
                        class="input-field"
                        name="date" 
                        value={date}
                        onChange={(e)=>setDate(e.target.value)} />
                </label>
                <div className="fourBools"> 
                    <label for="field4"><span>Interview</span>
                        <select 
                            name="field4" 
                            value={interview} 
                            onChange={(e)=>setBool("interview" ,e.target.value)} 
                            class="select-field"
                            id="interviewSelector"
                        >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                        </select>
                    </label>
                    <label for="field5"><span>Phone Screen</span>
                        <select 
                            name="field5"
                            value={phone} 
                            onChange={(e)=>setBool("phone", e.target.value)} 
                            class="select-field"
                            id="phoneSelector"
                            >
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </label>
                    <label for="field7"><span>Offer</span>
                        <select 
                            name="field7" 
                            value={offer} 
                            onChange={(e)=>setBool("offer", e.target.value)} 
                            class="select-field"
                            id="offerSelector">
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </label>
                    <label for="field8"><span>Rejection</span>
                        <select 
                            name="field8" 
                            value={reject}
                            onChange={(e)=>setBool("rejection", e.target.value)} 
                            class="select-field"
                            id="rejectSelector">
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </label>
                </div>
                <label for="field6"><span>Open</span>
                    <select 
                        name="field6"
                        value={open} 
                        onChange={(e)=>setBool("open",e.target.value)} 
                        class="select-field"
                        id="openSelector">
                        <option value="true">Open</option>
                        <option value="false">Closed</option>
                    </select>
                </label>
                <label for="field5"><span>Notes</span>
                    <textarea name="field5" class="textarea-field" value={notes} onChange={(e)=>{setNotes(e.target.value)}}></textarea></label>
                


            </form>
            <div className="buttonDiv">
                <button onClick={handleSubmit} className="submitBtn">Submit</button>
                <button onClick={()=>{document.getElementById("dashLink").click()}} className="submitBtn cancelBtn">Cancel Update</button>
            </div>
            </div>
            </div>
        </div>
    )
}

export default EditApp;