import React,{useContext,useEffect,useRef,useState} from 'react'
import noteContext from '../context/notes/notescontext'
import Noteitem from './Noteitem'
import AddNote from './AddNote'

const Notes =()=>{
    const context = useContext(noteContext);
    const {notes, setNotes}= context;
    return (
        <div className='row-mid-3'>
            <h2>Notes</h2>
            {notes.map((note)=>{
                return <Noteitem key={note._id} note={note}/>
            })}
        </div>
    )
}
export default Notes