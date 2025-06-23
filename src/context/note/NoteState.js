import React, { useState,  } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const notesInitial = [];

  const token = localStorage.getItem("token");
  const checkAuth = () => {
    if (!token) {
      return false;
    }
    return true;
  };

  const [notes, setnotes] = useState(notesInitial);


  // fetches the notes
  const fetchnotes = async () => {
    try {
      let response = await fetch("http://localhost:5000/note/fetchallnotes", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });
      let notes = await response.json();
      console.log(notes);
      setnotes(notes);
    } catch (error) {}
  };

  //creates new node
  const createnote = async(Title,Desc,Tag)=>{

    try{

    const response = await fetch("http://localhost:5000/note/addnote",{
      method:"Post",
      headers:{
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body:JSON.stringify({
        "Title":Title,
        "Description":Desc,
        "Tag":Tag
      })
    });
    if(response.ok){
      console.log("Note Created!");
    }
    }catch(error){
      console.log(error);
    }

  }

  //updates the notes
  const updatenote = async (id, Title, Desc ,Tag) => {
    try{
    await fetch(`http://localhost:5000/note/updatenote/${id}`, {
      method: "Put",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body:JSON.stringify({
        
        "Title": Title,
        "Description": Desc,
        "Tag": Tag,
      })
    });
    
  }catch(error){
    console.log(error);
  }
  };


  //deleting notes

  const deletenote = async(id)=>{

    try{
      const response = await fetch(`http://localhost:5000/note/deletenote/${id}`,{
       method:"Delete",
       headers:{
         "auth-token":token,
         "Content-Type": "application/json",
       }
     });
 
     if(response.ok){
       console.log("Note:",id," Deleted!!");
     }
      
    }catch(error){
      console.log(error);
    }

  }



  return (
    <NoteContext.Provider value={{ notes, setnotes, checkAuth, fetchnotes ,updatenote ,deletenote , createnote}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
