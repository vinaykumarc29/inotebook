import  React,{useState} from "react";
import NoteContext from "./NoteContext";

const NoteState = (props)=>{
  const checkAuth = ()=>{
    const token = localStorage.getItem("token");

    if(!token){
      return false;
    }
    return true

  }

    const notesInitial = [
        
  {
    "_id": "681277a71e504248e46fc063",
    "Title": "Second Note",
    "Description": "this is second note !!",
    "Tag": "General",
    "user": "6811b0d2bd99401f31a58599",
    "Date": "2025-04-30T19:19:03.897Z",
    "__v": 0
  },
  {
    "_id": "681277a71e504248e46fc063",
    "Title": "Third Note",
    "Description": "this is first note !!",
    "Tag": "General",
    "user": "6811b0d2bd99401f31a58599",
    "Date": "2025-04-30T19:19:03.897Z",
    "__v": 0
  },{
    "_id": "681277a71e504248e46fc063",
    "Title": "first Note",
    "Description": "this is first note !!",
    "Tag": "General",
    "user": "6811b0d2bd99401f31a58599",
    "Date": "2025-04-30T19:19:03.897Z",
    "__v": 0
  },{
    "_id": "681277a71e504248e46fc063",
    "Title": "first Note",
    "Description": "this is first note !!",
    "Tag": "General",
    "user": "6811b0d2bd99401f31a58599",
    "Date": "2025-04-30T19:19:03.897Z",
    "__v": 0
  },{
    "_id": "681277a71e504248e46fc063",
    "Title": "first Note",
    "Description": "this is first note !!",
    "Tag": "General",
    "user": "6811b0d2bd99401f31a58599",
    "Date": "2025-04-30T19:19:03.897Z",
    "__v": 0
  },{
    "_id": "681277a71e504248e46fc063",
    "Title": "first Note",
    "Description": "this is first note !!",
    "Tag": "General",
    "user": "6811b0d2bd99401f31a58599",
    "Date": "2025-04-30T19:19:03.897Z",
    "__v": 0
  },
  {
    "_id": "681277a71e504248e46fc063",
    "Title": "first Note",
    "Description": "this is first note !!",
    "Tag": "General",
    "user": "6811b0d2bd99401f31a58599",
    "Date": "2025-04-30T19:19:03.897Z",
    "__v": 0
  },{
    "_id": "681277a71e504248e46fc063",
    "Title": "first Note",
    "Description": "this is first note !!",
    "Tag": "General",
    "user": "6811b0d2bd99401f31a58599",
    "Date": "2025-04-30T19:19:03.897Z",
    "__v": 0
  },{
    "_id": "681277a71e504248e46fc063",
    "Title": "first Note",
    "Description": "this is first note !!",
    "Tag": "General",
    "user": "6811b0d2bd99401f31a58599",
    "Date": "2025-04-30T19:19:03.897Z",
    "__v": 0
  },{
    "_id": "681277a71e504248e46fc063",
    "Title": "first Note",
    "Description": "this is first note !!",
    "Tag": "General",
    "user": "6811b0d2bd99401f31a58599",
    "Date": "2025-04-30T19:19:03.897Z",
    "__v": 0
  },{
    "_id": "681277a71e504248e46fc063",
    "Title": "first Note",
    "Description": "this is first note !!",
    "Tag": "General",
    "user": "6811b0d2bd99401f31a58599",
    "Date": "2025-04-30T19:19:03.897Z",
    "__v": 0
  },{
    "_id": "681277a71e504248e46fc063",
    "Title": "first Note",
    "Description": "this is first note !!",
    "Tag": "General",
    "user": "6811b0d2bd99401f31a58599",
    "Date": "2025-04-30T19:19:03.897Z",
    "__v": 0
  },
    ]

    
  const [notes, setnotes] = useState(notesInitial)

    return(
       < NoteContext.Provider value={{notes,setnotes,checkAuth}} >

        {props.children}
       
       </NoteContext.Provider>


    )
};

export default NoteState;