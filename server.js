var express = require("express");
var path = require("path");
var fs = require("fs");


// Express App Code

var app = express();
var PORT = process.env.PORT || 3000;

// Express app data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// serve static files
// this is required for the sendFiles to actually be able to access relative path files like CSS and JS
app.use(express.static(__dirname + '/public'));

// Notes array
const notes = [];

// Functions

function writeFile(){
    fs.writeFile('./db/db.json',JSON.stringify(notes, null, 2),'utf8', function(err){
        if(err){return console.log(err)}
    });
}

function readFile(){
    let tempData = fs.readFile('./db/db.json','utf8', function(err, data){
        if(err){return console.log(err)}
        notes.push ( ...JSON.parse(data) );
        console.log(notes.length + " Notes have been read in");
    });
}

// HTML Routes

// Index
app.get("/", function(req, res){
    res.sendFile(path.join(__dirname , 'public' , 'index.html'));
});

//Notes
app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname , 'public' , 'notes.html'));
});

// API Routes

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


// Error Report
app.get('*', function(req, res){
    res.sendFile(path.join(__dirname , 'public' , 'index.html'));
});

// Below code triggers readFile
readFile();

app.listen(PORT, function (){
    console.log(`App is listening on http://localhost:${PORT}`)
})



// const express = require("express");
// const path = require("path");
// const fs = require("fs");

// // use express
// const app = express();
// const PORT = process.env.PORT || 8080;

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // set static
// app.use(express.static(__dirname + '/public'));

// // HTML Routes
// app.get("/", function(req, res){
//     res.send(path.join(__dirname , 'public' , 'index.html'));
// });

// app.get("/notes", function(req, res){
//     res.send(path.join(__dirname , 'public' , 'notes.html'));
// });

// // handle data

// let notes = [];

// function writeFile(){
//     fs.writeFile('./db/db.json',JSON.stringify(notes, null, 2),'utf8', function(err){
//         if(err){return console.log(err)}
//     });
// }

// function readFile(){
//     fs.readFile('./db/db.json','utf8', function(err, data){
//         if(err){return console.log(err)}
//         notes.push( ...JSON.parse(data) );
//     });
// }

// // API Routes
// app.get('/api/notes', function (req, res){
//     return res.json(notes);
// });

// app.post('/api/notes', function (req, res){
//     const note = {'id': Date.now(), ...req.body};
//     notes.push(note);

//     writeFile();

//     return res.send('This note was saved');
// })

// // DELETE
// app.delete('/api/notes/:id', function(req, res){
//     const chosen = req.params.id;

//     let index = notes.findIndex(note => note.id==chosen);
//     notes.splice(index,1);

//     writeFile();

//     return res.send('This note was deleted');
// })

// // Error
// app.get('*', function(req, res){
//     res.send(path.join(__dirname , 'public' , 'index.html'));
// });


// // start server
// app.listen(PORT, function (){
//     console.log(`App is listening on http://localhost:${PORT}`)
// });