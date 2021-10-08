import axios from "axios";
import React, {useState, useEffect} from 'react';
import "./Login.css";

const Login=()=>{
    const [userName, setUserName] = useState('');
    const [pass, setPass] = useState('');
    const [registerUser, setRegisterUser] = useState("");
    const [registerPass, setRegisterPass]=useState('');
    const [logReg, setLogReg] = useState(true);


    useEffect(()=>{
        checkSignIn();
    }, [])
    const login=()=>{
        axios({
            method: "POST",
            data: {
                username: userName,
                password: pass
            },
            withCredentials: true,
            url: "http://localhost:3001/login"
        }).then(response=>{
            if(response.data==='success'){
                //reload page if server sends login successful message
                window.location.reload();
            }else{
                console.log("bad pass");
            }
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
                //this timeout is because it takes a milisecond(estimate) for homeNav to load the dashLink if signedIn
                //if user's signed in redirect to dashboard
                setTimeout(()=>{
                    let dashLink= document.getElementById("dashLink");

                    console.log(dashLink);
                    if(dashLink){
                        document.getElementById('dashLink').click();
                    }
                },100)
         
            }
        })
    }

    const renderLogin=()=>{
        if(!logReg){
            return ( 
            <div class="login-form">
                <h1>Register</h1>
                <div className="form-group">
                    <label>Username</label>
                    <input 
                        className="form-control" 
                        placeholder="create username" 
                        id="regUser" value={registerUser} autofocus 
                        onChange={e=>setRegisterUser(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input 
                        className="form-control"
                        placeholder="make password" 
                        value={registerPass} 
                        onChange={e=>setRegisterPass(e.target.value)}
                        />
                </div>
                <button className="ui button" onClick={register}>Register</button>
                <div class="card-body">
                <a href="http://localhost:3001/auth/google/">
                    <button className="ui red google button" href="http://localhost:3001/auth/google/" role="button">
                        <i class="fab fa-google"></i>
                        Sign Up with Google
                    </button>
                </a>
                </div>
                <div className="registerLogChangeDiv">
                    <p>Already have an account?</p>
                    <p><span onClick={()=>setLogReg(true)} className="clickHere">Click here to login</span></p>
                </div>
            </div>
            )
        }else{

            return( 
            <div class="login-form">

                    <h1>Log in</h1>
                    <div className="form-group">
                        <label>Username</label>
                        <input 
                            placeholder="username" 
                            value={userName} 
                            onChange={e=>setUserName(e.target.value)} 
                            className="form-control"    
                            />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input 
                            placeholder="password" 
                            type="password" 
                            value={pass} 
                            onChange={e=>setPass(e.target.value)} 
                            className="form-control"    
                            />
                    </div>
                    <button className="ui button" onClick={login}>Login</button>
                    <div className="card-body">
                    <a href="http://localhost:3001/auth/google/">
                        <button className="ui red google button" href="http://localhost:3001/auth/google/" role="button">
                            <i class="fab fa-google"></i>
                            Sign In with Google
                        </button>
                    </a>
                     </div>
                    <div className="registerLogChangeDiv">
                    <p>No account yet?</p>
                    <p><span onClick={()=>setLogReg(false)} className="clickHere">Click here to register</span></p>

                    </div>
                    </div>
            )
        }
    }
    return ( 
        <>
        <div class="sidenav">
            <div class="login-main-text">
                <h2>Application<br /> Login Page</h2>
                <p>Login or register from here to access.</p>
                {/* <div className="example">
                <p>Look around with example user/ pass</p>
                <p>user: <span className="demoSpan">example</span></p>
                <p>pass: <span className="demoSpan">example</span></p>
                </div> */}
            </div>
        </div>
      <div class="main">
         <div class="col-lg-4 logRegDiv">
               {renderLogin()}
         </div>
      </div>
    </>

    )
}

export default Login;