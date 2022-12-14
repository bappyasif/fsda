let express = require("express");

let bodyParser = require("body-parser")

let mysql = require("mysql");

let cors = require("cors");

const { json } = require("body-parser");

let app = express();

// creating databsePool
let db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fsda'    
})

// makign use of middlewares
app.use(bodyParser.urlencoded({extended: true}))

app.use(cors())

app.use(json())

// this will send back data to our api calls from client side
app.get("/data", (req, res) => {
    let sqlSelect = "SELECT * from comments;"

    db.query(sqlSelect, (err, result) => {
        if(err) throw(err)

        let data = []
        result.forEach(item => {
            // just making our data as it was in it's initial json structured form for our client side processing
            let deNormalized = {id: item.id, body: item.body, postId: item.postId, user:{id: item.userid, username: item.username}}
            data.push(deNormalized)
        })
        res.send(data)
    })
})

// inserts data recieved from form upload into database
app.post("/data/insert", (req, res) => {
    // making sure already existing entries are omited
    let sqlInsert = `INSERT IGNORE INTO comments (id, body, postId, userid, username) VALUES (?, ?, ?, ?, ?)`;
    
    req.body?.normalizedJson.forEach(item => {
        let {id, body, postId, userid, username} = {...item}
        
        db.query(sqlInsert, [id, body, postId, userid, username], (err, result) => {
            if(err) throw (err)
            console.log("insert successfull", result)
        })
    })

})

app.get("/", (req, res) => {
    res.send("hallo hallo")
})

app.listen(3001, () => console.log('running on port 3001'))

// codes that i used to create database and table for this assignment
// im sure there are better ways to do this more elegantly but i didnt know any better
/**
 * 
 * 
 let db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fsda'
 })
 // run this after "fsda" database is available, to create table schema
 db.connect(err => {
    if(err) throw(err)

    console.log("db connected")
    // creating table schema
    let sqlStatement = "create table comments(id INT PRIMARY KEY, body VARCHAR(255), postId INT, userid INT, username VARCHAR(44));"
    db.query(sqlStatement, (err, result) => {
        if(err) throw(err)
    })
})
 * 
 * 
let db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: ''
})
// run this to create a database named "fsda"
// creating database
db.query("create database "+"fsda", (err, result, fields) => {
    if(err) throw(err)
    console.log(result, "successfull")
})
 */