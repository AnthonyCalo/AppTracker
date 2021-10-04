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
    const parameters = useParams();
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
            selectElement("interviewSelect", 'true');
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
            offer: false,
            phoneScreen: phone,
            interview: interview,
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
                <label for="field4"><span>Interview</span>
                    <select 
                        name="field4" 
                        value={interview} 
                        onChange={(e)=>setInterview(e.target.value)} 
                        class="select-field"
                        id="interviewSelect">
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </label>
                <label for="field4"><span>Phone Screen</span>
                    <select name="field4"
                            value={phone}
                            onChange={(e)=>setPhone(e.target.value)}
                            class="select-field"
                            id="phoneSelect">
                        <option value="true">Yes</option>
                        <option value="false">No</option>
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