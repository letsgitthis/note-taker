//edit all below

var express = require("express");
var path = require("path");
var fs = require("fs");


var app = express();
var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(__dirname + '/public'));

const notes = [];

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


// Error Report
app.get('*', function(req, res){
    res.sendFile(path.join(__dirname , 'public' , 'index.html'));
});

// Below code triggers readFile
readFile();

app.listen(PORT, function (){
    console.log(`App is listening on http://localhost:${PORT}`)
})