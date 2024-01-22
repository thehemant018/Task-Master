import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
  let nevigate=useNavigate();
  const [credentials, setCredentials] = useState({name:"",email:"",password:""});
  const handleSubmit=async (e)=>{
    e.preventDefault();
    const{name,email,password}=credentials;

    const response=await fetch(`${window.location.origin}/api/auth/createuser`,{
      method:"POST",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name,email,password}),
    });
    const json=await response.json();
    if(json.success){
      localStorage.setItem('token',json.authToken);
      nevigate('/');
      props.showAlert('Account created successfuly','success')
    }
    else{
      props.showAlert('Invalid cedetials','danger');
    }
  }
  const onChange=(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value});
  }
  return (
    <div className='container mt-2'>
      <h2 className='my-2'>Create an account to use  TaskMaster</h2>
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name='name' onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange} required />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' onChange={onChange} minLength={5} required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
  )
}

export default Signup
