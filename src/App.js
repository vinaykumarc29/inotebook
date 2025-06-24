import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NoteState from './context/note/NoteState';
import Noteitem from './components/Noteitem';
import NoteEditor from './components/NoteEditor';
import Signup from './components/Signup';
import Alert from './components/Alert';
import Toasts from './components/Toasts';
import { useState } from 'react';


function App() {
    const [Toast , setToast] = useState({show:false,message:""});

    const triggertoast = (message)=>{
      setToast({show:true,message:message});
      setTimeout(()=>{setToast({show:false,message:""})},5000);
    }
  return (
    <>
      <NoteState>
        <Toasts show={Toast.show} message={Toast.message}/>
        <Router>
          <Navbar />
          <Routes>
             <Route path='/' element={<Home />} /> 
             <Route path='/login' element={<Login />} /> 
             <Route path='/signup' element={<Signup/>}/>
             <Route path='/note/:id' element={<NoteEditor triggertoast={triggertoast}/>}/>
             <Route path='/note/newnote' element={<NoteEditor  iscreate={true}/>}/>
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
