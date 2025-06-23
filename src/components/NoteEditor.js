import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import NoteContext from "../context/note/NoteContext";
import Alert from "./Alert";

export default function NoteView(props) {
  const { iscreate } = props;
  const navigate = useNavigate();
  const context = useContext(NoteContext);
  const { notes, fetchnotes, updatenote, deletenote ,createnote } = context;

  const { id } = useParams();
  const [note, setnote] = useState(null);
  const [saved, setsaved] = useState(true);
  const [showmodal, setshowmodal] = useState(false);
  const [TriggerDelete, SetTriggerDelete] = useState(false);

  const [Tag, setTag] = useState("General");
  const [Title, setTitle] = useState(null);
  const [Desc, setDesc] = useState(null);

  useEffect(() => {
    fetchnotes(); // fetch data on mount
  }, []);

  useEffect(() => {
    if (iscreate) {
      setnote({});
      setTitle("");
      setDesc("");
      setTag("General");

    } else {

      const foundnote = notes.find((note) => {
        return note._id === id;
      });

      setnote(foundnote);

      if (foundnote) {
        setTag(foundnote.Tag);
        setTitle(foundnote.Title);
        setDesc(foundnote.Description);
      }
    }
  }, [id, notes]);

  useEffect(() => {
    if (
      note &&
      (Title !== note.Title || Desc !== note.Description || Tag !== note.Tag)
    ) {
      setsaved(false);
    }
  }, [Title, Desc, Tag, note]);

  if (!note) {
    return (
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ backgroundColor: "#e6f1f1", width: "100vw", height: "100vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const handlesave = () => {
    if(iscreate){
      createnote(Title,Desc,Tag);
    }else{
      updatenote(id, Title, Desc, Tag);
    }
    setsaved(true);
    navigate("/");
  };

  const handleexit = () => {
    if (saved) {
      navigate("/");
    } else {
      setshowmodal(true);
    }
  };

  const handledelete = () => {
    SetTriggerDelete(true);
  };

  return (
    <div
      className="container  d-flex justify-content-center align-items-center my-3 flex-column   "
      style={{ backgroundColor: "#e6f1f1", width: "100vw", height: "100vh" }}
    >
      <div className="mt-4 mb-2 align-self-start">
        <span
          className="fs-5 link-dark text-decoration-none"
          onClick={handleexit}
        >
          <i className="fa-solid fa-arrow-left"></i> Go Back To Notes
        </span>
      </div>

      <div
        className=" note rounded-3 fs-5 p-3 my-5 align-self-center "
        contentEditable={false}
        suppressContentEditableWarning
        style={{
          width: "70vw",
          height: "85vh",
          lineHeight: "1.6",
          backgroundColor: "white",
        }}
      >
        <div className="title" style={{ maxheight: "7%" }}>
          <h1
            contentEditable={true}
            suppressContentEditableWarning
            onInput={(e) => {
              setTitle(e.currentTarget.innerText);
            }}
          >
            <b>{note.Title ||<span className="placeholder-text" >Title</span>}</b>
          </h1>
        </div>

        <div className="note-info my-3" hidden={iscreate}>
          <h6>Last Edited :{note.Date}</h6>
        </div>
        <div className=" note-tag conatiner d-flex flex-row align-items-center">
          <p className="my-1 ">Tag:</p>

          <select
            className="form-sm-select  bg-primary text-light rounded-5 mx-2  text-center"
            style={{ width: "auto" }}
            value={Tag}
            onChange={(e) => {
              setTag(e.target.value);
            }}
          >
            <option className="bg-light text-dark" defaultValue="General">
              General
            </option>
            <option className="bg-light text-dark" value="Personal">
              Personal
            </option>
            <option className="bg-light text-dark" value="Work">
              Work
            </option>
            <option className="bg-light text-dark" value="Important">
              Important
            </option>
          </select>
        </div>

        {/* description */}
        <div className="Description mt-4 ">
          <div
            className="text-editing-tools rounded-top"
            style={{
              backgroundColor: "#e6f1f1",
              height: "8vh",
            }}
          ></div>

          <div className="description-body">
            <textarea
              name="note-description"
              className=" form-control rounded-bottom"
              placeholder="Enter descripion here"
              id="note-description"
              value={Desc}
              style={{
                height: "40vh",
                width: "100%",
                borderTopLeftRadius: "0",
                borderTopRightRadius: "0",
              }}
              onChange={(e) => {
                setDesc(e.target.value);
              }}
            >
              {Desc}
            </textarea>
          </div>
          {/* Buttons */}

          <div className="d-flex conatiner justify-content-between">
            <div className="status">
              {saved === true ? (
                <p className="text-success mb-0 fw-semibold">✔ Saved</p>
              ) : (
                <p className="text-danger mb-0 fw-semibold">✘ Not Saved</p>
              )}
            </div>
            <div className=" note-buttons d-flex mt-3 gap-2 ">
              <button
                className="btn btn-primary"
                onClick={handlesave}
                type="button"
              >
                save
              </button>

              <button
                className="btn btn-outline-danger"
                onClick={handledelete}
                hidden={iscreate}
                type="button"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <Alert
        show={showmodal}
        onsave={() => {
          handlesave();
          setshowmodal(false);
          navigate("/");
        }}
        oncancel={() => {
          setshowmodal(false);
          navigate("/");
        }}
        message="Save Changes Made In Note ??"
      />
      <Alert
        show={TriggerDelete}
        onsave={() => {
          deletenote(id);
          SetTriggerDelete(false);
          navigate("/");
        }}
        oncancel={() => {
          SetTriggerDelete(false);
        }}
        message="Are You Sure To Delete the Note ?"
      />
    </div>
  );
}
