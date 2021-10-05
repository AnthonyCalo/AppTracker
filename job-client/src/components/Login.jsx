import axios from "axios";
import React, {useState} from 'react'

const Login=()=>{
    const [userName, setUserName] = useState('');
    const [pass, setPass] = useState('');
    const [registerUser, setRegisterUser] = useState("");
    const [registerPass, setRegisterPass]=useState('');
    const login=()=>{
        
        axios({
            method: "POST",
            data: {
                username: userName,
                password: pass
            },
            withCredentials: true,
            url: "http://localhost:3001/login"
        }).then(res=>{
            console.log(res.data);
            
        })
    };
    const register=()=>{
        fetch("http://localhost:3001/register", {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
                        "Accept": 'application/json' },
            body:JSON.stringify({
                username: registerUser,
                password: registerPass
            })
        })
        .then(response=>response.json())
        .then(body=>{
            console.log(body.message);
        })
    };
    const checkSignIn=()=>{
        axios.get("http://localhost:3001/signedin",{
            withCredentials: true,
            headers: {
                "Content-Type": 'application/json'
            }
        }).then(response=>{
            //respons.data ===false when not signed in 
            if(response.data===false){
                return(false);
            }else{
                console.log(response.data)
                return(true);
            }
        })
    }
    const signOut = ()=>{
        //simple logout
        axios.get("http://localhost:3001/logout",{
            withCredentials: true,
            headers: {
                "Content-Type": 'application/json'
            }
        }).then(response=>{
            //reload the page to call a use effect that will register signout
            window.location.reload();
        })
    }
    const getJobs=()=>{
        axios.get("http://localhost:3001/user-jobs",{
            withCredentials: true,
            headers: {
                "Content-Type": 'application/json'
            }
        }).then(response=>{
            //reload the page to call a use effect that will register signout
            window.location.reload();
        })
    }
    return ( 
        <>
    <div className="loginDiv">
        <div className="ui form">
            <h1>Register</h1>
            <div className="field">
                <label>Username</label>
                <input placeholder="create username" id="regUser" value={registerUser} autofocus onChange={e=>setRegisterUser(e.target.value)} />
            </div>
            <div className="field">
                <label>Password</label>
                <input placeholder="make password" value={registerPass} onChange={e=>setRegisterPass(e.target.value)} />
            </div>
            <button className="ui button" onClick={register}>Register</button>
        </div>
        <div className="ui form">
            <h1>Log in</h1>
            <div className="field">
                <label>Username</label>
                <input placeholder="username" value={userName} onChange={e=>setUserName(e.target.value)} />
            </div>
            <div className="field">
                <label>Password</label>
                <input placeholder="password" type="password" value={pass} onChange={e=>setPass(e.target.value)} />
            </div>
            <button className="ui button" onClick={login}>Submit</button>
            </div>
        <button onClick={checkSignIn}>CheckAuth</button>
        <button onClick={signOut}>Sign Out</button>
        <hr />
        <button onClick={getJobs}>Get Jobs Test</button>
    </div>
    <div class="col-sm-4">
      <div class="card">
        <div class="card-body">
          <a class="btn btn-block btn-google" href="http://localhost:3001/auth/google/" role="button">
            <i class="fab fa-google"></i>
            Sign Up with Google
          </a>
        </div>
      </div>
    </div>
    </>

    )
}

export default Login;