const express = require('express');
require('dotenv').config()
const twilio = require('twilio');
const ejs = require('ejs');
const morgan = require('morgan');
const validator = require('validator')
const path = require('path');

const accountSid = process.env.TWILIO_ACC_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;


app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use(morgan('combined'))
app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const client = require('twilio')(accountSid, authToken);
const VoiceResponse = require('twilio').twiml.VoiceResponse;

app.get('/', (req, res) => {
    res.render('index');
})

app.post('/sms', (req, res) => {
    try {
        let {message, number} = req.body;
        if (message && validator.isMobilePhone(number)) {
            client.messages
            .create({
                body: message,
                from: process.env.TWILIO_NUMBER,
                to: number
            })
            .then((msg) => {
                console.log(msg)
                res.status(200).redirect('/')
            })
        }
    } catch (e) {
        console.log(e)
        console.log('errr')
    }

});

app.post('/call', (req, res) => {
    try {
        const twiml = new VoiceResponse();
        twiml.say('I havent showered since 1970');
        res.type('text/xml');
        res.send(twiml.toString());
    } catch (e) {
        console.log('errrrr')
        console.error(e)
        res.status(500).end()
    }
});


app.listen(8080, () => {
    console.log('Server Listening')
});
