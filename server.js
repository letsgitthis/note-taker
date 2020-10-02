const express = require("express");
const path = require("path");
const fs = require("fs");

// use express
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// set static
app.use(express.static(__dirname + '/public'));

// handle data

let notes = [];

function write(){
    fs.write('./db/db.json',JSON.stringify(notes, null, 2),'utf8', function(err){
        if(err){return console.log(err)}
    });
}

function write(){
    fs.write('./db/db.json',JSON.stringify(notes, null, 2),'utf8', function(err){
        if(err){return console.log(err)}
    });
}

function read(){
    let tempData = fs.read('./db/db.json','utf8', function(err, data){
        if(err){return console.log(err)}
        notes.push ( ...JSON.parse(data) );
    });
}

// HTML Routes
app.get("/", function(req, res){
    res.send(path.join(__dirname , 'public' , 'index.html'));
});

app.get("/notes", function(req, res){
    res.send(path.join(__dirname , 'public' , 'notes.html'));
});


// API Routes
app.get('/api/notes', function (req, res){
    return res.json(notes);
});

app.post('/api/notes', function (req, res){
    const note = {'id': Date.now(), ...req.body};
    notes.push(note);

    write();

    return res.send('This note was saved');
})

// DELETE
app.delete('/api/notes/:id', function(req, res){
    const chosen = req.params.id;

    let index = notes.findIndex(note => note.id==chosen);
    notes.splice(index,1);

    write();

    return res.send('This note was deleted');
})

// Error
app.get('*', function(req, res){
    res.send(path.join(__dirname , 'public' , 'index.html'));
});

// read();

// start server
app.listen(PORT, function (){
    console.log(`App is listening on http://localhost:${PORT}`)
});