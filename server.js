const appData = []
const express = require("express");
const app = express()

const cors = require("cors");
// const bodyParser = require("body-parser");
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
const port = 8000;
app.use(express.static("weather"));
app.listen(port, function() {
    console.log("server is running at port " + port);
})

app.get('/all', function(req, res) {
    res.send(appData);
})

app.post('/add', function(req, res) {
    appData.push(req.body);
    console.log(appData)
    res.send(appData);
});