import React from 'react'
import { Link } from 'react-router-dom';


export default function NoteView(props) {
  const { note } = props;
  return (
    <div className="container  d-flex justify-content-center align-items-center my-3 flex-column   " style={{ backgroundColor: "#e6f1f1", width: "100vw", height: "100vh" }}>

      <div className="mt-4 mb-2 align-self-start">
        <Link to="/" className="fs-5 link-dark text-decoration-none">
          <i className="fa-solid fa-arrow-left"></i> Go Back To Notes
        </Link>
      </div>

      <div className=' note rounded-3 fs-5 p-3 my-5 align-self-center '
        contentEditable={false}
        suppressContentEditableWarning
        style={{
          width: "70vw",
          height: "85vh",
          lineHeight: "1.6",
          backgroundColor: "white",

        }}
      >


        <div className="title" contentEditable={true} style={{ maxheight: "7%" }}>
          <h1><b>{note.Title}</b></h1>
        </div>
        <div className="note-info my-3">
          <h6>Last Edited :29/11/2024 at 5:00pm </h6>
        </div>
        <div className=" note-tag conatiner d-flex flex-row align-items-center">

          <p className="my-1 ">Tag:</p>

          <select className="form-sm-select  bg-primary text-light rounded-5 mx-2  text-center" style={{ width: "auto" }} aria-label="Default select example">
            <option className="bg-light text-dark" selected="General">General</option>
            <option className="bg-light text-dark" value="Personal">Personal</option>
            <option className="bg-light text-dark" value="Work">Work</option>
            <option className="bg-light text-dark" value="Important">Important</option>
          </select>

        </div>


        <div className="Description mt-4 ">

          <div className="text-editing-tools rounded-top" style={{
            backgroundColor: "#e6f1f1",
            height: "8vh"
          }}>
          </div>

          <div className="description-body">
            <textarea name="note-description" className=" form-control rounded-bottom" id="note-description" style={{ height: "40vh", width: "100%", borderTopLeftRadius: "0", borderTopRightRadius: "0" }}>
              {note.Description}

            </textarea>
          </div>

          <div class=" note-buttons d-flex justify-content-end mt-3 gap-2 ">
            <button class="btn btn-primary " type="button">save</button>
            <button class="btn btn-outline-danger" type="button">Delete</button>
          </div>


        </div>
      </div>



    </div>


  )
}
