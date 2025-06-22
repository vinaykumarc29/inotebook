import React ,{useContext, useState , useEffect} from 'react';
import NoteContext from "../context/note/NoteContext";
import Noteitem from './Noteitem';
import NoteView from './NoteView';


export default function Notes() {

  const context = useContext(NoteContext);
  const {notes,setnotes,fetchnotes} = context;
  useEffect(()=>{
    fetchnotes();
  },[]);



  const [selectedNote, setselectedNote] = useState(null)

  const handleClick = (note)=>{
    console.log("Note opened");
    setselectedNote(note);
  
  }


  
  return (
    <>
     {selectedNote && <NoteView note={selectedNote} />}

    <div className='container row '>

      <h1>Notes</h1>
      {notes.map((note)=>{
        return <Noteitem note={note} key={note._id} onCardClick = {handleClick}/> 
        
      })}
      
    </div>
  </>
  )
}
