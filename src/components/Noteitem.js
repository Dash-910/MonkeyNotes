import React from 'react'
 
const Noteitem = (props)=>{
    const {note} = props;

    return (
        <div className='col-md-3'>
            <div class='card my-3'>
                <div class = "card-body">
                    <div className='d-flex align-items-center'>
                    <h5 class ='card-title'>{note.title}</h5>
                    <i class="fa-solid fa-trash"></i>
                    <i class="fa-solid fa-pen-to-square"></i>
                    </div>
                    <p className='card-text'>{note.description}</p>
                </div>
            </div>
        </div>
    )
}
export default Noteitem
