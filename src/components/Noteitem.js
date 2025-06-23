import React from 'react'
import NoteView from './NoteEditor';

export default function Noteitem(props) {
    const { Title, Description} = props.note;

    
    return (

        <div className='container col-md-3 my-2'>
            <div className="card"  onClick={()=>{props.onCardClick(props.note)}}>

                <div className="card-body">
                    <h5 className="card-title">{Title}</h5>
                    <p className="card-text">{Description}</p>

                </div>
            </div>

        </div>


    )
}
