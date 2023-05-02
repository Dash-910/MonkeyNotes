const express = require('express')
const router = express.Router();
const fetchuser = require('../middleware/fecthuser')
const Note = require('../models/Notes')
const {body,validationResult}=require('express-validator')

//Get all the notes using , GET "/api/auth/notes/fetchallnotes"
router.get('/fetchallnotes',fetchuser,async(req,res)=>{
    try{
        const notes=await Note.find({
            user:req.user.id
        })
        res.json(notes)
    }catch(error)
    {
        console.error(error.message);
        res.status(500).send("Internal Sever Error")
    }
})

// Add a new Note using : POST "/api/auth/addnote". Here login will required

router.post('/addnote',fetchuser,[
    body('title','Enter a valid title').isLength({min:3}),
    body('description','Description must be atleast 5 characters').isLength({min:5}),
],async(req,res)=>{
    try{
        const {title,description,tag}=req.body;
        const error = validationResult(req);
        if(!error.isEmpty())
        {
            return res.status(400).json({errors:error.array()});
        }
        const note = new Note({
            title,description,tag,user:req.user.id
        })
        const saveNote = await note.save();

        res.json(saveNote)
    }catch(error)
    {
        console.error(error.message);
        res.status(500).send(
            "Internal Sever Error"
        )
    }
})
// To update an existing note 
router.put('/updatenote/:id',fetchuser,async(req,res)=>{
    const {title,description,tag} = req.body;
    try{
     const newNote={};
     if(title)(newNote.title = title);
     if(description){newNote.description=description};
     if(tag){newNote.tag = tag};
     //We will find the note to be updated and update it
     let note = await Note.findById(req.params.id);
     if(!note){
        return res.status(404).send("Not found")
     }
     if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");
     }
     note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
     res.json({note});
    }catch(error)
    {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})
//Delete an existing Note using: DELETE"/api/notes/deletenote".
 router.delete('/deletenote/:id',fetchuser,async(req,res)=>{
    try{
        //Find the note and delete it
        let note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not Found")
        }
        //Check the owner of the note
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({"Scucces":"Note has been deleted",note:note});

    }catch(error)
    {
        console.error(error.message);
        res.status(500).send(
            "Internal Server Error"
        );
    }
 })

module.exports = router