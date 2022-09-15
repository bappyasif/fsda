let express = require("express");

let app = express();

app.get("/", (req, res) => {
    res.send("hallo hallo")
})

app.listen(3001, () => console.log('running on port 3001'))