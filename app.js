const express = require('express');
const cors = require('cors')
const logger = require('morgan')

const contactsRouter = require("./routes/api/contacts")

const app = express(); // Сервер

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(cors())// Корс запросы

app.use(express.json())

app.use(logger(formatsLogger))

app.use("/api/contacts",contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
const {status = 500,message = "Server error"} = err
  res.status(status).json({ message })
})

module.exports = app;
