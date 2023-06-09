import './App.css';
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Navbar from "./components/Navbar";
import {Home} from './components/Home';
import About from './components/About'
import { Alert } from './components/Alert';
import NoteState from './context/notes/Notestate';

function App() {
  return (
    <>
    <NoteState>
    <Router>
      <Navbar/>
      <Alert message="This is demo alert"/>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/about" element={<About/>}/>
      </Routes>
    </Router>
    </NoteState>
   
    </>
  );
}

export default App;
