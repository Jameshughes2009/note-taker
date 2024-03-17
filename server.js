const fs = require("fs")
const path = require("path")
//These are required

const express = require("express")
const app = express();

app.use(express.static("public"));

const { v4: uuidv4 } =require("uuid")
// used for incoming requests
app.use(express.json());

app.use(express.urlencoded({ extended: true}));

// Now Setting The Server port 
const PORT = process.env.PORT || 3001;
// json route
app.get("/api/notes", (req, res) => 
    res.sendFile("./db/db.json", { root: __dirname})
);

// anding the route for the notes.hmtl file
app.get("/notes", (req, res) => 
    res.sendFile("./public/notes.html", { root: __dirname})
);
// ability to add a new note
app.post("/api/notes",(req, res) =>{
    fs.readFile("./db/db.json", "utf8", (err, data) =>{
        if(err) {
            console.error(err);
        } else {
            req.body.id = uuidv4();
            const parsedData = JSON.parse(data);
            parsedData.push(req.body);
            console.log(parsedData);
            fs.writeFile("./db/db.json", JSON.stringify(parsedData), (err) =>
                err ? console.error(err) : res.json(parsedData)
            );
        }
    });
});

