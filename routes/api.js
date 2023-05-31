//===========DEPENDENCIES============//
const apiRouter = require("express").Router();
const fs = require("fs");
const noteDataImport = require("../db/notes.json");
const noteId = require("../helpers/noteid");
//==================================//
let noteData = noteDataImport;

// GET route for retrieving existing notes
apiRouter.get("/notes", (req, res) => res.json(noteData));

// POST route for a new note
apiRouter.post("/notes", (req, res) => {
  const { title, text } = req.body;
  if (title && text) {
    const newNote = {
      title,
      text,
      id: noteId(),
    };

    noteData.push(newNote);
    const noteString = JSON.stringify(noteData);

    fs.writeFile(`../db/notes.json`, noteString, (err) =>
      err
        ? console.log(err)
        : console.log(`Note for ${newNote.title} has been saved!`)
    );

    const response = {
      status: "success",
      body: newNote,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json("Error in posting note");
  }
});

// DELETE route for deleting individual notes
apiRouter.delete("/notes/:id", (req, res) => {
  const idToDelete = req.params.id;
  noteData = noteData.filter((note) => note.id !== idToDelete);

  const noteString = JSON.stringify(noteData);

  fs.writeFile(`../db/notes.json`, noteString, (err) => {
    err ? console.log(err) : console.log(`New note for has been saved!`);
    res.send();
  });
});

module.exports = apiRouter;
