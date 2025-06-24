import React,{useEffect, useRef} from 'react'

export default function Toasts(props) {
  const Toastref = useRef(null);


  useEffect(()=>{
    if(props.show && Toastref.current){
      const toast = new window.bootstrap.Toast(Toastref.current);
      toast.show();

      setTimeout(()=>{toast.hide()},3000);
      
    }
  },[props.show])


  return (
   
<div className="toast-container  position-fixed top-0 end-0 p-3" >
  <div id="liveToast" className="toast text-bg-primary" role="alert" aria-live="assertive" aria-atomic="true" ref={Toastref}>
    <div className="toast-header">
      {/* <img src="..." className="rounded me-2" alt="..."/> */}
      <strong className="me-auto">iNotebook</strong>
      <small>just now</small>
      <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div className="toast-body">
      {props.message}
    </div>
  </div>
</div>
  
  )
}
