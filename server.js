const express = require("express");
const path = require("path");
const fs = require("fs");

// use express
const app = express();
const PORT = process.env.PORT || 8080;

// parse data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// set static
app.use(express.static(__dirname + '/public'));

// HTML Routes
app.get("/", function(req, res){
    res.sendFile(path.join(__dirname , 'public' , 'index.html'));
});

app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname , 'public' , 'notes.html'));
});

// handle data

const notes = [];

function writeFile(){
    fs.writeFile('./db/db.json',JSON.stringify(notes, null, 2),'utf8', function(err){
        if(err){return console.log(err)}
    });
}

function readFile(){
    fs.readFile('./db/db.json','utf8', function(err, data){
        if(err){return console.log(err)}
        notes.push( ...JSON.parse(data) );
    });
}

readFile();

// API Routes
app.get('/api/notes', function (req, res){
    return res.json(notes);
});

app.post('/api/notes', function (req, res){
    const note = {'id': Date.now(), ...req.body};
    notes.push(note);

    writeFile();

    return res.send('This note was saved');
})

// DELETE
app.delete('/api/notes/:id', function(req, res){
    const chosen = req.params.id;

    let index = notes.findIndex(note => note.id==chosen);
    notes.splice(index,1);

    writeFile();

    return res.send('This note was deleted');
})

// Error
app.get('*', function(req, res){
    res.send(path.join(__dirname , 'public' , 'index.html'));
});

// start server
app.listen(PORT, function (){
    console.log(`App is listening on http://localhost:${PORT}`)
});