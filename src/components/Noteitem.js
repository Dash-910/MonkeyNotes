import React from 'react'
import { useContext } from 'react';
import noteContext from '../context/notes/notesContext';

const Noteitem = (props)=>{
    const context = useContext(noteContext);
    const {deleteNote}= context;
    const {note,updateNote} = props;

    return (
        <div className='col-md-3'>
            <div class='card my-3'>
                <div class = "card-body">
                    <div className='d-flex align-items-center'>
                    <h5 class ='card-title'>{note.title}</h5>
                    <i class="fa-solid fa-trash" onClick={()=>{deleteNote(note._id)}}></i>
                    <i class="fa-solid fa-pen-to-square" onClick={()=>{updateNote(note)}}></i>
                    </div>
                    <p className='card-text'>{note.description}</p>
                </div>
            </div>
        </div>
    )
}
export default Noteitem
