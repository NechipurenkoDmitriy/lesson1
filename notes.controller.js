const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')

const notesPath = path.join(__dirname, 'db.json')

async function addNote(title){
    // const notes = require('./db.json')
    // const notes = Buffer.from(buffer).toString('utf-8')
    const notes = await getNotes()
    const note = {
        title,
        id: Date.now().toString()
    }
    notes.push(note)
    await fs.writeFile(notesPath, JSON.stringify(notes))
    console.log(chalk.green.inverse(`Note was added`))
 }

 //?
 async function editNote(id, newTitle) {
     const idString = id.toString()
     const notes = await getNotes()
     const filtredNotes = notes.filter((n)=>n.id!==idString)
     // await fs.writeFile(notesPath, JSON.stringify(filtredNotes))
     const note = {
         title: newTitle,
         id: id
     }
     filtredNotes.push(note)
     await fs.writeFile(notesPath, JSON.stringify(filtredNotes))
     console.log(chalk.green.inverse(`Note ${note.id} was changed!`))
 }

 async function getNotes(){
     const notes = await fs.readFile(notesPath, {encoding: "utf-8"})
     return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
 }

 async function printNotes () {
     const notes = await getNotes()

     console.log(chalk.bgBlue('The list of notes:'))
     notes.forEach(note=>{
         console.log(chalk.blue(note.id,note.title))
     })
 }

 async function removeNote(id){
    const idString = id.toString()
    const notes = await getNotes()
    if (notes.find(n=>n.id===idString) === undefined) {
        console.log(chalk.red.inverse('id not found'))
        return
    }   
    const filtredNotes = notes.filter((n)=>n.id!==idString)
    await fs.writeFile(notesPath, JSON.stringify(filtredNotes))
    console.log(chalk.red.inverse(`Note ${id} was removed`))
 }

 module.exports={
    addNote, removeNote, getNotes, editNote
 }