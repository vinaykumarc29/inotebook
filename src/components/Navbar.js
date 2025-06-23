import React,{useContext} from 'react'; 
import { Link } from 'react-router-dom';
import NoteContext from '../context/note/NoteContext';


export default function Navbar() {
  
  const context = useContext(NoteContext);
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link to="/" className="navbar-brand" >iNotebook</Link>

    {context.checkAuth() ? <div className="dropdown d-flex gap-1" >
      <Link to="/note/newnote"> <button className="btn btn-outline-primary" >AddNote</button></Link>
     
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            User
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <Link to="#" className="dropdown-item" >
                Logout
              </Link>
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


