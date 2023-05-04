import NoteContext from "./notesContext"
import {useState} from "react"
 

const NoteState = (props)=>{
    const host = "http://localhost:5000"
    const noteInitial =[]
    const [notes,setNotes]= useState(noteInitial)

    //Get all notes
    const getNotes = async()=>{
        //API call
        const response = await fetch(`${host}/api/notes/fetchallnotes`,{
            method :'GET',
            headers:{
                "Content-Type":'application/json',
                "auth-token":""
            }
        });
        const json = await response.json()
        setNotes(json)
    }

    //Add a note
    const addNote = async (title,description,tag)=>{
        //API call 
        const response = await fetch(`${host}/api/notes/addnote`,{
            method :'POST',
            headers:{
                'content-Type':'application/json',
                'auth-token':''
            },
            body : JSON.stringify({title,description,tag})
        });
        const note = await response.json();
        setNotes(notes.concat(note))
    }

    //Delete a note
    const deleteNote = async(id)=>{
        //Backend call
        const response = await fetch(`${host}/api/notes/deletenote/$(id)`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                'auth-token':''
            }
        });
        response.json();
        const newNotes = notes.fillter((note)=>{
            return note._id !== id
        })
        setNotes(newNotes);
    }

    //Edit a note
    const editNote = async(id,title,description,tag)=>{
        //Backend api call function
        const response = await fetch(`${host}/api/notes/updatenote/${id}`,
        {
            method:'PUT',
            headers:{
                'content-Type':'application/json',
                'auth-token':""
            },
            body:JSON.stringify({title,description,tag})
        });
       const json = await response.json();
        
        let newNotes = JSON.parse(JSON.stringify(notes))

        for(let index=0;index < notes.length;index++)
        {
            const element = notes[index];
            if(element._id === id)
            {
                element.title = title;
                element.description = description;
                element.tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }

    return(
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>{props.children}</NoteContext.Provider>
    )
}
export default NoteState;
