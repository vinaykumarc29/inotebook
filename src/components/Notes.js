import React ,{useContext, useState , useEffect,} from 'react';
import NoteContext from "../context/note/NoteContext";
import Noteitem from './Noteitem';
import NoteEditor from './NoteEditor';
import {useNavigate} from 'react-router-dom'



export default function Notes() {

  const context = useContext(NoteContext);
  const navigate = useNavigate();

  const {notes,setnotes,fetchnotes,token,checkAuth} = context;
  useEffect(()=>{
    if(checkAuth())
    fetchnotes();
  },[token]);

  const handleClick = (note)=>{
    navigate(`/note/${note._id}`);
  
  }


  
  return (
    <>
    <div className='container row '>

      <h1>Notes</h1>
      {notes.map((note)=>{
        return <Noteitem note={note} key={note._id} onCardClick = {handleClick}/> 
        
      })}
      
    </div>
  </>
  )
}
