const express = require("express");
const path = require("path");
const noteDataImport = require("./db/notes.json");
const noteId = require("./helpers/noteid");
const fs = require("fs");
let noteData = noteDataImport;

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  res.json(noteData);
});

app.post("/api/notes", (req, res) => {
  const { title, text } = req.body;
  if (title && text) {
    const newNote = {
      title,
      text,
      id: noteId(),
    };

    noteData.push(newNote);
    const noteString = JSON.stringify(noteData);

    fs.writeFile(`./db/notes.json`, noteString, (err) =>
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

app.delete("/api/notes/:id", (req, res) => {
  const idToDelete = req.params.id;
  noteData = noteData.filter((note) => note.id !== idToDelete);

  const noteString = JSON.stringify(noteData);
  console.log(`After the filter, we get: ${noteString}`);
  fs.writeFile(`./db/notes.json`, noteString, (err) => {
    err ? console.log(err) : console.log(`New note for has been saved!`);
    res.send();
  });
});

app.listen(PORT, () => {
  console.log(
    `My savvy note saver is now listening at http://localhost:${PORT}`
  );
});
