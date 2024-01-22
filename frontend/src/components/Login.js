import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
  let navigate=useNavigate();
  const [credentials,setCredentials]=useState({email:"",password:""});

  const handleSubmit=async (e)=>{
    e.preventDefault();
    const response=await fetch(`${window.location.origin}/api/auth/login`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({email:credentials.email,password:credentials.password}),
    });
    const json=await response.json();
    if(json.success){
      localStorage.setItem('token',json.authToken);
      props.showAlert('Logged in successfuly','success');
      navigate("/");
    }
    else{
      props.showAlert('Invalid cedetials','danger');
    }
    
  }
  const onChange=(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value});
  }
  return (
    <div className='mt-2'>
      <h2 className='my-2'>Login to continue to TaskMaster</h2>

      <form onSubmit={handleSubmit}>
        <div className="mt-4 ">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange} value={credentials.email} required />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name='password' onChange={onChange} value={credentials.password} required/>
        </div>
        <button type="submit" className="btn btn-success">Submit</button>
      </form>
    </div>
  )
}

export default Login
