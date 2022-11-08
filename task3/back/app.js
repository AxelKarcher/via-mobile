require('dotenv').config()
const express = require('express')
const cors = require('cors')
const nodemailer = require('nodemailer')

const app = express()

app.use(cors())
app.use(express.json())
app.listen(process.env.PORT, console.log('Listening:', process.env.PORT))

app.post('/jokes/send', (req, res) => {
  const {receiverMail, joke} = req?.body

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {user: 'axtoche.karcher@gmail.com', pass: 'vkngyisjoxkccruu'}
  })

  const mailOptions = {
    from: 'axtoche.karcher@gmail.com',
    to: receiverMail,
    subject: 'Task3 - Jokes',
    text: 'Hey, check this joke: ' + joke
  }

  transporter.sendMail(mailOptions, (error, _info) => {
    if (error) {console.log(error)}
  })

  res.send('OK')
})