import React,{useContext,useEffect} from 'react'; 
import { Link,useNavigate } from 'react-router-dom';
import NoteContext from '../context/note/NoteContext';


export default function Navbar() {
  
  const context = useContext(NoteContext);
  const {getuser,checkAuth,username,token,settoken} = context;
  const Navigate = useNavigate();

  const handleLogout = ()=>{
    localStorage.removeItem("token");
    settoken("Null");
    Navigate("/");
   

  }
  

  useEffect(()=>{
    if(checkAuth()){
      getuser();
    }
  
  },[token])

  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link to="/" className="navbar-brand" >iNotebook</Link>

    {checkAuth() ? <div className="dropdown d-flex gap-1" >
      <Link to="/note/newnote"> <button className="btn btn-outline-primary" >AddNote</button></Link>
     
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
           {username}
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <button className="dropdown-item" onClick={handleLogout} >
                Logout
              </button>
            </li>
          </ul>
        </div> :  <div className='d-flex gap-1'>

       <Link to="/login"><button className="btn btn-primary">Login</button></Link>
      <Link to="/signup"><button className="btn btn-primary">Signup</button></Link> 

    
   </div> }

       
   
  </div>
</nav>
    
    
    </>
  )
}


