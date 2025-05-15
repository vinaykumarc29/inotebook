import React from 'react';
import { useContext } from 'react';
import NoteContext from '../context/note/NoteContext';
import Notes from './Notes';

export default function Home() {

  return (
    <div>
     <Notes/>
    </div>
  )
}

