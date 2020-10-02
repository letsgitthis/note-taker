const router = require("express").Router();
const store = require("../db/store");

// // GET "/api/notes" responds with all notes from the database
// router.get("/notes", (req, res) => {
//   store
//     .getNotes()
//     .then((notes) => res.json(notes))
//     .catch((err) => res.status(500).json(err));
// });

// router.post("/notes", (req, res) => {
//   store
//     .addNote(req.body)
//     .then((note) => res.json(note))
//     .catch((err) => res.status(500).json(err));
// });

// // DELETE "/api/notes" deletes the note with an id equal to req.params.id
// router.delete("/notes/:id", (req, res) => {
//   store
//     .removeNote(req.params.id)
//     .then(() => res.json({ ok: true }))
//     .catch((err) => res.status(500).json(err));
// });

// note api get
app.get('/api/notes', function (req, res){
  return res.json(notes);
});

// note api post
app.post('/api/notes', function (req, res){
  var note = {'id': Date.now(), ...req.body};
  notes.push(note);

  // write changes to notes
  writeFile();

  return res.send('note has been saved');
})

app.delete('/api/notes/:id', function(req, res){
  var chosen = req.params.id;
  console.log(`Asking to delete note id: ${chosen}`);

  // find index of passed id, and splice it out of the list
  let index = notes.findIndex(note => note.id==chosen);
  notes.splice(index,1);

  // write changes to notes
  writeFile();

  return res.send('note has been deleted');
})


module.exports = router;
