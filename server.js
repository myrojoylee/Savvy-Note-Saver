const express = require("express");
const path = require("path");
const noteData = require("./db/notes.json");
const fs = require("fs");
// const uuid = require("./helpers/uuid");

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  console.log(`i am the best`);
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) => {
  console.log(`Notes file!`);
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  res.json(noteData);
  console.log(noteData);
});

app.post("/api/notes", (req, res) => {
  console.info(`${req.method} request received to add a note`);
  const { title, text } = req.body;
  if (title && text) {
    const newNote = {
      title,
      text,
    };

    const noteString = JSON.stringify(newNote);

    fs.writeFile(`./db/notes.json`, noteString, (err) =>
      err
        ? console.log(err)
        : console.log(`Note for ${newNote.title} has been saved?`)
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

app.listen(PORT, () => {
  console.log(
    `My savvy note saver is now listening at http://localhost:${PORT}`
  );
});
