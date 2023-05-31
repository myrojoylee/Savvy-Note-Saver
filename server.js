//===========DEPENDENCIES============//
const express = require("express");
const path = require("path");
const api = require("./routes/index.js");
//==================================//
const PORT = process.env.PORT || 4008;
const app = express();

// middleware to handle JSON and urls
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// using our router
app.use("/", api);

// GET route for homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// GET route for notes page
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.listen(PORT, () => {
  console.log(
    `My savvy note saver is now listening at http://localhost:${PORT}`
  );
});
