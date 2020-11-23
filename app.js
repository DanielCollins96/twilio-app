const express = require('express');
const twilio = require('twilio');
const ejs = require('ejs');
const path = require('path');

require('dotenv').config()

app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get('/', (req, res) => {
    res.render('index');
})

app.listen(3008, () => {
    console.log('Server Listening')
});
