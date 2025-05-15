import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NoteState from './context/note/NoteState';
import Noteitem from './components/Noteitem';
import NoteView from './components/NoteView';


function App() {
  return (
    <>
      <NoteState>
        <div className="" style={{backgroundColor:"#e6f1f1",height:"100vh"}}>
        <Router>
          <Navbar />
          <Routes>
             <Route path='/' element={<Home />} /> 
             <Route path='/login' element={<Login />} /> 
          </Routes>
     {/* <NoteView/> */}
        </Router>
        </div>
      </NoteState>
    </>
  );
}

export default App;
