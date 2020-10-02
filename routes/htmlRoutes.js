const path = require("path");
const router = require("express").Router();

// // "/notes" responds with the notes.html file
// router.get("/notes", (req, res) => {
//   res.sendFile(path.join(__dirname, "../public/notes.html"));
// });

// // All other routes respond with the index.html file
// router.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../public/index.html"));
// });

app.get("/", function(req, res){
  res.sendFile(path.join(__dirname , 'public' , 'index.html'));
});

//Notes
app.get("/notes", function(req, res){
  res.sendFile(path.join(__dirname , 'public' , 'notes.html'));
});

module.exports = router;
