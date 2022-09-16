let express = require("express");

let bodyParser = require("body-parser")

let mysql = require("mysql");

let cors = require("cors");
const { json } = require("body-parser");

let app = express();

let db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fsda'    
})

app.use(bodyParser.urlencoded({extended: true}))

app.use(cors())

app.use(json())

app.get("/data", (req, res) => {
    let sqlSelect = "SELECT * from comments;"
    db.query(sqlSelect, (err, result) => {
        if(err) throw(err)

        let data = []
        result.forEach(item => {
            let deNormalized = {id: item.id, body: item.body, postId: item.postId, user:{id: item.userid, username: item.username}}
            data.push(deNormalized)
        })

        // console.log(result)

        // res.send(result)
        res.send(data)
    })

    // res.send("api here!!")
})

app.post("/data/insert", (req, res) => {
    // console.log(req.body, "!!")
    
    let sqlInsert = `INSERT INTO comments (id, body, postId, userid, username) VALUES (?, ?, ?, ?, ?)`;
    
    req.body?.normalizedJson.forEach(item => {
        let {id, body, postId, userid, username} = {...item}
        db.query(sqlInsert, [id, body, postId, userid, username], (err, result) => {
            if(err) throw (err)
            console.log("insert successfull")
        })
    })

})

app.get("/", (req, res) => {
    res.send("hallo hallo")
})

app.listen(3001, () => console.log('running on port 3001'))



/**
 * 
 * 
 // to create entries in database table
 let db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fsda'    
})

app.get("/", (req, res) => {
    let sqlInsert = "INSERT INTO comments (id, body, postId, userid, username) VALUES (1, 'what what', 99, 98, 'ab');"
    db.query(sqlInsert, (err, result) => {
        if(err) throw(err);
        console.log(result, "<<resuly>>")
        res.send("hallo hallo")
    })
})
 * 
 *
 // to create a table and schema in it
 let db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fsda'
})

 db.connect(err => {
    if(err) throw(err)
    
    console.log("db connected")
    // creating table
    // let userObject = "CREATE TYPE user AS OBJECT(id INT, username VARCHAR(44))"
    // let sqlStatement = "create table comments(id INT, body VARCHAR(255), postId INT, "+ userObject + ");"
    // let userObject = "insert into comemnts values({'id': INT, username VARCHAR(44)})"
    // let sqlStatement = "create table comments(id INT, body VARCHAR(255), postId INT, "+ userObject + ");"

    // let userJson = "create table user(jdoc JSON)"
    // let sqlStatement = "create table comments(id INT, body VARCHAR(255), postId INT, "+ userJson +")"

    let sqlStatement = "create table comments(id INT, body VARCHAR(255), postId INT, userid INT, username VARCHAR(44));"

    db.query(sqlStatement, (err, result) => {
        if(err) throw(err)
        console.log(result, "<<result>>")
    })

    // creating database
    // db.query("create database "+"fsda", (err, result, fields) => {
    //     if(err) throw(err)
    //     console.log(result, "<<result>>")
    // })

    // db.end();
    // console.log("database created")
})
 */