const express = require("express");
const path = require("path");
const noteData = require("./db/db.json");

const PORT = 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
app.get("/", (req, res) => {
  console.log(`i am the best`);
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/api/notes", (req, res) => {
  res.json(noteData);
  console.log(noteData);
});

app.listen(PORT, () => {
  console.log(
    `My savvy note saver is now listening at http://localhost:${PORT}`
  );
});
