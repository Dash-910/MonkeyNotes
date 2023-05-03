import NoteContext from "./notescontext"
import {useState} from "react"
 

const NoteState = (props)=>{
    //Add a note
    

    //Delete a note


    //Edit a note


    return(
        <NoteContext.Provider value={{}}>{props.children}</NoteContext.Provider>
    )
}
export default NoteState;
