import React,{useContext} from 'react'
import NoteContext from '../context/notes/notescontext'
import Noteitem from './Noteitem'

const Notes =()=>{
    const context = useContext(NoteContext);
    const {notes, setNotes}= context;
    return (
        <div className='row-mdi-3'>
            <h2>Notes</h2>
            {notes.map((note)=>{
                return <Noteitem note ={note}/>
            })}
        </div>
    )
}