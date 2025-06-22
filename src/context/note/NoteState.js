import  React,{useState,useEffect} from "react";
import NoteContext from "./NoteContext";

const NoteState = (props)=>{
  
    const notesInitial = [];

    const token = localStorage.getItem("token");
    const checkAuth = ()=>{

    if(!token){
      return false;
    }
    return true
  }

  const [notes, setnotes] = useState(notesInitial)

  const fetchnotes = async()=>{
    try{

      let response = await fetch("http://localhost:5000/note/fetchallnotes",{
         method:"get",
       headers:{
         "Content-Type": "application/json",
         "auth-token" : token
       },
      });
      let notes =await response.json()
      console.log(notes);
      setnotes(notes);
    }catch(error){
      
    }
  }
    

    return(
       < NoteContext.Provider value={{notes,setnotes,checkAuth,fetchnotes}} >

        {props.children}
       
       </NoteContext.Provider>


    )
};

export default NoteState;