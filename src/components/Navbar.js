import React from 'react'; 
import { Link } from 'react-router-dom';


export default function Navbar() {
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link to="/" className="navbar-brand" >iNotebook</Link>
    <div className='d-flex gap-1'>
      <Link to="/login"><button className="btn btn-primary">Login</button></Link>
      <Link to="/signup"><button className="btn btn-primary">Signup</button></Link>

    </div>
    


   
    
  </div>
</nav>
    
    
    </>
  )
}


