import React ,{useState} from 'react'
import {useNavigate} from 'react-router-dom'

export default function Login() {
  const [credentials, setcreadentials] = useState({Email:"",Password:""});
  let navigate = useNavigate();

  const handlelogin = async(e)=>{
      e.preventDefault();

    try{

      const response = await fetch("http://localhost:5000/user/login",{
       method:"post",
       headers:{
         "Content-Type": "application/json"
       },
       body:JSON.stringify({Email:credentials.Email, Password:credentials.Password})
      });
   
      const data = await response.json();

      console.log(data.authToken);

      if(response.ok){
        localStorage.setItem("token",data.authToken);
        navigate("/");
      }else{
        alert("Invalid credentials")
      }

    }catch(error){
      alert("error",error);
      console.log("error",error);
    }



}


  return (
    <div className='container mt-5 rounded-5 p-3' style={{backgroundColor:"white"}} >
       <form onSubmit={handlelogin}>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
        <input type="email" onChange={(e)=>{setcreadentials({...credentials,Email:e.target.value})}} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
      </div>
      
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
        <input type="password"  onChange={(e)=>{setcreadentials({...credentials,Password:e.target.value})}} className="form-control" id="exampleInputPassword1"/>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    </div>
  )
}
