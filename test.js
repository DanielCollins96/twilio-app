require('dotenv').config()
const twilio = require('twilio');

const client = require('twilio')(accountSid, authToken);
client.messages
.create({
    body: message,
    from: '+15873155909',
    to: number
})

